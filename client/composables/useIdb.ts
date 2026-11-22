import { del, get, set } from "idb-keyval";

export const useIdb = () => {
  return {
    set,
    get,
    del,
  };
};
