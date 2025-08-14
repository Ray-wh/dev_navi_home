// 使用 slice 的 Redux Toolkit reducer 示例
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counterSlice', // slice 名称，用于生成 action type
  initialState: { value: 0 }, // 初始状态
  reducers: {
    increment: (state) => {
      // Redux Toolkit 允许直接修改 state（通过 Immer 库实现不可变更新）
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// 导出自动生成的 action creator
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 导出自动生成的 reducer
export default counterSlice.reducer;