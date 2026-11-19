import { type Socket, io } from "socket.io-client";
import type { SuperDm, Swap } from "~/types";

interface PaymentSocketOptions<T> {
  onTipEvent?: (...args: [T]) => any;
  onPaymentEvent?: (...args: [T]) => any;
  onPageTipEvent?: (...args: [T]) => any;
  onSwapStatusChangeEvent?: (...args: [Swap]) => any;
  onSuperDmPaymentEvent?: (...args: [T]) => any;
  onPatronMembershipPaymentEvent?: (...args: [T]) => any;
}

interface TipPaymentInitParams {
  query: any;
  path: string;
}

export const useSocketBase = () => {
  const socket = shallowRef<Socket | undefined>();
  const config = useRuntimeConfig();
  const connectionStatus = ref<
    "CONNECTED" | "DISCONNECTED" | "RECONNECTING" | undefined
  >(undefined);

  const runConnectEvents = () => {
    if (!socket.value) return;
    socket.value.on("connect", handleConnect);
    socket.value.on("disconnect", handleDisconnect);
  };

  const handleConnect = () => {
    console.log("Socket Connected");
    connectionStatus.value = "CONNECTED";
  };
  const handleDisconnect = () => {
    console.log("Socket Disconnected");
    connectionStatus.value = "DISCONNECTED";
  };

  const disconnect = () => {
    socket.value?.close();
    socket.value = undefined;
  };

  const reconnect = () => {
    socket.value?.connect();
  };

  return {
    socket,
    connectionStatus,
    disconnect,
    reconnect,
    runConnectEvents,
  };
};

export const usePaymentSocket = <T>(options?: PaymentSocketOptions<T>) => {
  const socket = shallowRef<Socket | undefined>();
  const config = useRuntimeConfig();
  const connectionStatus = ref<
    "CONNECTED" | "DISCONNECTED" | "RECONNECTING" | undefined
  >(undefined);

  const init = (params?: TipPaymentInitParams) => {
    const url = `${config.public.apiBaseUrl}/${params?.path}`;

    console.log("creating socket-io with url", url);
    console.log(params);

    socket.value = io(url, {
      auth: params?.query,
      query: params?.query,
    });
    runEvents();
  };

  const runEvents = () => {
    if (!socket.value) return;
    socket.value.on("connect", handleConnect);
    socket.value.on("disconnect", handleDisconnect);

    socket.value.on("payment", handlePaymentEvent);

    socket.value.on("tip", handleTipEvent);

    socket.value.on("newTip", handlePageTipEvent);

    socket.value.on("swap-status-change", handleSwapStatusChange);

    socket.value.on("super-dm-payment", handleSuperDmPaymentEvent);

    socket.value.on(
      "patron-membership-payment",
      handlePatronMembershipPaymentEvent,
    );
  };

  const handleConnect = () => {
    console.log("Socket Connected");
    connectionStatus.value = "CONNECTED";
  };
  const handleDisconnect = () => {
    console.log("Socket Disconnected");
    connectionStatus.value = "DISCONNECTED";
  };

  const handlePaymentEvent = (v: any) => {
    options?.onPaymentEvent?.(v);
  };

  const handleTipEvent = (v: any) => {
    options?.onTipEvent?.(v);
  };

  const handlePageTipEvent = (v: any) => {
    options?.onPageTipEvent?.(v);
  };

  const handleSwapStatusChange = (v: any) => {
    options?.onSwapStatusChangeEvent?.(v);
  };

  const handleSuperDmPaymentEvent = (v: any) => {
    options?.onSuperDmPaymentEvent?.(v);
  };

  const handlePatronMembershipPaymentEvent = (v: any) => {
    options?.onPatronMembershipPaymentEvent?.(v);
  };

  const disconnect = () => {
    socket.value?.close();
    socket.value = undefined;
  };

  const reconnect = () => {
    socket.value?.connect();
  };

  return {
    init,
    disconnect,
    connectionStatus,
    reconnect,
    socket,
  };
};
