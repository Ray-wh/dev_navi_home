import { createStoreProvider } from "@/utils/store-provider";

export const RootStoreProvider = createStoreProvider({
  loading: null,
  reducers: {},
  persistConfig: {
    key: "root",
  },
  middlewareConfig: (getMiddleware) =>
    getMiddleware({ serializableCheck: false }),
});

export default RootStoreProvider;
