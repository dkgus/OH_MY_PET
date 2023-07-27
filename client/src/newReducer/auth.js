const initialState = {
  isLogin: false,
  userInfo: [],
};

export default function modal(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_STATUS":
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
