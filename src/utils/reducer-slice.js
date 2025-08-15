import { createSlice } from "@reduxjs/toolkit";

/**
 * @file reducer-slice.js
 * @description Redux Toolkit 的 createSlice 函数的封装工具
 * 用于简化创建 Redux slice 的过程，并提供统一的返回格式
 */

/**
 * 创建 Redux slice 的封装函数
 * @param {string} name - slice 的名称，必填
 * @param {object} [option={}] - 可选配置对象，传递给 createSlice
 * @param {object} [option.initialState] - 初始状态对象
 * @param {object} [option.reducers] - 包含 reducer 函数的对象
 * @param {function|object} [option.extraReducers] - 处理额外 action 的 reducer 函数
 * @param {object} [option.selectors] - 选择器函数
 * @returns {object} 包含 actions 和 reducer 的对象
 * @throws {Error} 当 name 参数不存在时抛出错误
 */
export function createReducerSlice(name, option = {}) {
  // 验证 name 参数是否存在
  if (!name) {
    throw new Error("name is required");
  }

  // 使用 Redux Toolkit 的 createSlice 创建 slice
  const slice = createSlice({ name, ...option });

  // 返回包含 actions 和 reducer 的对象
  return {
    actions: slice.actions,
    reducer: slice.reducer,
  };
}
