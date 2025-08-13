// 不使用 slice 的传统 Redux reducer 示例

// 1. 定义 action type 常量
const INCREMENT = 'counterTraditional/INCREMENT';
const DECREMENT = 'counterTraditional/DECREMENT';
const INCREMENT_BY_AMOUNT = 'counterTraditional/INCREMENT_BY_AMOUNT';

// 2. 定义 action creator 函数
export const incrementTraditional = () => ({ type: INCREMENT });
export const decrementTraditional = () => ({ type: DECREMENT });
export const incrementByAmountTraditional = (amount) => ({
  type: INCREMENT_BY_AMOUNT,
  payload: amount
});

// 3. 定义 reducer 函数
const initialState = { value: 0 };

export default function counterTraditionalReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, value: state.value + 1 };
    case DECREMENT:
      return { ...state, value: state.value - 1 };
    case INCREMENT_BY_AMOUNT:
      return { ...state, value: state.value + action.payload };
    default:
      return state;
  }
}