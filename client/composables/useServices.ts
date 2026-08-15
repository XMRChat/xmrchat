import type { AxiosRequestConfig } from "axios";
import type {
  ContentLink,
  LoginResponse,
  MeResponse,
  Numberic,
  PageSetting,
  SlugReservationResponse,
  StreamerPage,
  Tip,
  TipCreationResponse,
  UploadedFile,
} from "~/types";
import { UploadSlug } from "~/types/enums";

export const useServices = () => {
  const { axios } = useApp();

  const me = async () => {
    const res = await axios.get<MeResponse>("/auth/me");
    return res.data;
  };

  const login = async (params: any) => {
    const res = await axios.post<LoginResponse>("/auth/login", params);
    return res.data;
  };

  const signup = async (params: any) => {
    const res = await axios.post<{ message: string }>("/auth/signup", params);
    return res.data;
  };

  const updatePassword = async (params: any) => {
    const res = await axios.post<{ message: string; access_token: string }>(
      "/auth/update-password",
      params
    );
    return res.data;
  };

  const checkSlug = async (params: any) => {
    const res = await axios.post<{ available: boolean }>(
      "/pages/check-slug",
      params
    );
    return res.data;
  };

  const reserveSlug = async (params: any) => {
    const res = await axios.post<SlugReservationResponse>(
      "/pages/reserve-slug",
      params
    );
    return res.data;
  };

  // const checkReservation = async (params: any) => {
  //   const res = await axios.get<{ paid: boolean }>(
  //     "/v1/pages/checkreservation",
  //     { params }
  //   );
  //   return res.data;
  // };

  // const checkSendTip = async (slug: string, id: string) => {
  //   const res = await axios.get<{ paid: boolean }>(
  //     `v1/pages/${slug}/tips/${id}`
  //   );
  //   return res.data;
  // };

  const uploadImage = async (
    params: any,
    slug: UploadSlug = UploadSlug.PAGE_LOGO,
    config?: AxiosRequestConfig
  ) => {
    const res = await axios.post<{ files: UploadedFile[] }>(
      `/upload/${slug}`,
      params,
      config
    );
    return res.data;
  };

  const sendTipToStreamer = async (slug: string, params: any) => {
    const res = await axios.post<TipCreationResponse>(`/tips`, {
      ...params,
      path: slug,
    });
    return res.data;
  };

  const getPrice = async () => {
    const { data } = await axios.get("/prices/xmr");
    return data;
    // return res.data.price;
  };

  const getStreamerPage = async (slug: string) => {
    const res = await axios.get<StreamerPage>(`/pages/${slug}`);
    return res.data;
  };

  const getTips = async (slug: string) => {
    const res = await axios.get<Tip[]>(`/tips/page/${slug}`);
    return res.data;
  };

  const getMyPage = async () => {
    const res = await axios.get<{ page: StreamerPage }>("/pages");
    return res.data;
  };

  const updateStreamer = async (slug: string, params: any) => {
    const res = await axios.put(`/pages/${slug}`, params);
    return res.data;
  };

  const logout = async () => {
    const res = await axios.get("/v1/users/logout");
    return res;
  };

  const forgotPassword = async (params: any) => {
    const res = await axios.post("/auth/forgot-password", params);
    return res;
  };

  const resetPassword = async (params: any, token: string) => {
    const res = await axios.post(`/auth/reset-password/${token}`, params);
    return res;
  };

  const confirmEmail = async (token: Numberic) => {
    const res = await axios.post(`/auth/email-verification/${token}`);
    return res;
  };

  const getCreators = async (params?: any) => {
    const res = await axios.get<{ pages: StreamerPage[]; total: number }>(
      `/pages/search`,
      {
        params,
      }
    );
    return res.data;
  };

  const updateTipPrivate = async (id: Numberic, params: any) => {
    const res = await axios.put(`/tips/${id}`, params);
    return res.data;
  };

  const getPageSettings = async () => {
    const { data } = await axios.get<{ settings: PageSetting[] }>(
      `/page-settings/me`
    );
    return data;
  };

  const getPageOBSSettings = async (slug: string) => {
    const { data } = await axios.get<{ settings: PageSetting[] }>(
      `/page-settings/${slug}/obs`
    );
    return data;
  };

  const updatePageSettings = async (id: Numberic, params: any) => {
    await axios.put(`/page-settings/${id}`, params);
  };

  const getMyLinks = async () => {
    const { data } = await axios.get<{
      name: string;
      searchTerms: string;
      links: ContentLink[];
    }>(`/links/me`);
    return data;
  };

  const updateLinks = async (params: any) => {
    const { data } = await axios.put(`/links/me`, params);
    return data;
  };

  return {
    me,
    login,
    signup,
    updatePassword,
    logout,
    checkSlug,
    reserveSlug,
    uploadImage,
    sendTipToStreamer,
    getPrice,
    getStreamerPage,
    getTips,
    getMyPage,
    updateStreamer,
    forgotPassword,
    resetPassword,
    confirmEmail,
    getCreators,
    updateTipPrivate,
    getPageSettings,
    updatePageSettings,
    getPageOBSSettings,
    getMyLinks,
    updateLinks,
  };
};
