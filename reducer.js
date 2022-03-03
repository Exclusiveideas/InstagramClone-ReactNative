// State
export const initialState = {
  user: null,
}


// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        user: action.user,
      };
    case "SIGN_OUT":
      return {
        user: null,
      };

    default:
      return state;
  }
};

export default reducer