import { createReducerSlice } from "@/utils/reducer-slice";

export const authSliceName = "auth";

// 创建 slice
const { actions, reducer } = createReducerSlice(authSliceName, {
  initialState: {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    // 登录请求开始
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // 登录成功
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    // 登录失败
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // 注销
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    // 更新用户信息
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

// 导出 action 创建器
export const { loginStart, loginSuccess, loginFailure, logout, updateUser } =
  actions;

// 导出 reducer
export default reducer;
