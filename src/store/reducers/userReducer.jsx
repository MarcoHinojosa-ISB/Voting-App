const initialState = {
  authToken: localStorage.getItem("authToken")
}

const userReducer = function(state = initialState, action){
  switch(action.type){
    case "LOGGED_IN":
      state.authToken = action.authToken;
      localStorage.setItem("authToken", action.authToken);
      break;
    case "LOGGED_OUT":
      state.authToken = null;
      localStorage.removeItem("authToken");
      break;
  }
  return state;
}

export default userReducer;
