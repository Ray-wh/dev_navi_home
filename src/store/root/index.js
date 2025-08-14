import { createStoreProvider } from "@/utils/store-provider";
import { TYPE_STORE } from "@/utils/store-provider";
import authReducer, { authSliceName } from "./slice/auth";

export const rootKey = "root";

export default createStoreProvider({
  type: TYPE_STORE.LOCAL,
  reducers: {
    [authSliceName]: authReducer,
  },
  persistConfig: {
    key: rootKey,
  },
});
