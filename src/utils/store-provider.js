import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/lib/storage"; // 使用localStorage作为持久化存储
import sessionStorage from "redux-persist/es/storage/session"; // 使用sessionStorage作为持久化存储

const TYPE_STORE = {
  SESSION: "session",
  LOCAL: "local",
};

const getCurrentStorage = (loadingType) => {
  if (loadingType === loadingType.local) {
    return localStorage;
  } else if (loadingType === loadingType.session) {
    return sessionStorage;
  } else {
    return localStorage;
  }
};
/**
 * 创建Redux store的工具函数
 * @param {Object} options - 配置选项
 * @param {Object} [options.reducers={}] - 要组合的reducers
 * @param {Object} [options.persistConfig={}] - 持久化配置
 * @param {Function} [options.middlewareConfig] - 中间件配置函数
 * @param {String} [options.typeStore=TYPE_STORE.LOCAL] - 持久化加载类型
 * @returns {Object} 包含store和persistor的对象
 */
const createStore = (options = {}) => {
  // 合并默认配置和用户配置
  const {
    reducers = {},
    persistConfig = {},
    middlewareConfig,
    typeStore = TYPE_STORE.LOCAL,
  } = options;

  // 默认持久化配置
  const defaultPersistConfig = {
    key: "root",
    storage: getCurrentStorage(typeStore),
  };

  // 合并持久化配置
  const mergedPersistConfig = {
    ...defaultPersistConfig,
    ...persistConfig,
  };

  // 处理空reducers情况
  const rootReducer = Object.keys(reducers).length > 0
    ? combineReducers({ ...reducers })
    : (state = {}) => state; // 提供默认reducer

  // 应用持久化配置
  const reducer = persistReducer(mergedPersistConfig, rootReducer);

  // 配置中间件
  // serializableCheck: false,关闭序列化检查，因为persist会引入非序列化值
  const middleware = middlewareConfig
    ? (getMiddleware) => middlewareConfig(getMiddleware)
    : (getMiddleware) => getMiddleware({ serializableCheck: false });

  // 创建store
  const store = configureStore({ reducer, middleware });

  // 创建持久化器
  const persistor = persistStore(store);

  return { store, persistor };
};

/**
 * 创建一个预配置的Redux Provider组件
 * @param {Object} options - 配置选项
 * @param {Object} [options.reducers={}] - 要组合的reducers
 * @param {Object} [options.persistConfig={}] - 持久化配置
 * @param {Function} [options.middlewareConfig] - 中间件配置函数
 * @param {React.ReactNode} [options.loading=null] - 持久化加载时显示的组件
 * @param {String} [options.typeStore=TYPE_STORE.LOCAL] - 持久化加载类型
 * @returns {React.ComponentType} 预配置的Redux Provider组件
 */
function createStoreProvider(options = {}) {
  // 提取配置项
  const { loading = null } = options;

  // 创建store和persistor
  const { store, persistor } = createStore(options);

  // 创建并返回预配置的Provider组件
  const StoreProvider = ({ children }) => (
    <Provider store={store}>
      <PersistGate loading={loading} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );

  return StoreProvider;
}

export { TYPE_STORE };
export { createStoreProvider };