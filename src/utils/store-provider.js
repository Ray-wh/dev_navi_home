import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/lib/storage"; // 使用localStorage作为持久化存储
import sessionStorage from "redux-persist/es/storage/session"; // 使用sessionStorage作为持久化存储

/**
 * 存储类型常量
 * @constant
 * @type {Object}
 * @property {string} LOCAL - 使用localStorage存储
 * @property {string} SESSION - 使用sessionStorage存储
 */
export const TYPE_STORE = {
  LOCAL: "local",
  SESSION: "session",
};

/**
 * 根据存储类型获取对应的存储对象
 * @param {TYPE_STORE} type - 存储类型
 * @returns {Object} 存储对象
 * @private
 */
const getStorage = (type) => {
  if (type === TYPE_STORE.SESSION) {
    return sessionStorage;
  } else if (type === TYPE_STORE.LOCAL) {
    return localStorage;
  }
  return new Error("type must be TYPE_STORE");
};

/**
 * 创建一个预配置的Redux Provider组件
 * 该函数整合了创建store和provider的功能
 * @param {Object} options - 配置选项
 * @param {Object} [options.reducers={}] - 要组合的reducers对象
 * @param {Object} [options.persistConfig={}] - 持久化配置
 * @param {Function} [options.middlewareConfig] - 中间件配置函数
 * @param {React.ReactNode} [options.loading=null] - 持久化加载时显示的组件
 * @param {String} [options.type=TYPE_STORE.LOCAL] - 持久化存储类型
 * @returns {React.ComponentType} 预配置的Redux Provider组件
 */
export function createStoreProvider(options = {}) {
  // 提取配置项
  const {
    reducers = {},
    persistConfig = {},
    middlewareConfig,
    loading = null,
    type = TYPE_STORE.LOCAL,
  } = options;

  // 默认持久化配置
  const defaultPersistConfig = {
    key: "root",
    storage: getStorage(type),
  };

  // 合并持久化配置
  const mergedPersistConfig = {
    ...defaultPersistConfig,
    ...persistConfig,
  };

  // 处理空reducers情况
  const rootReducer =
    Object.keys(reducers).length > 0
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
