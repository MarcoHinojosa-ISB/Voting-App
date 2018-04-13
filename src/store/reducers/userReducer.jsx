const initialState = {
  username: null,
  firstname: null,
  lastname: null
}

const userReducer = function(state = initialState, action){
  switch(action.type){
    case "LOGGED_IN":
      state.username = action.username;
      state.firstname = action.firstname;
      state.lastname = action.lastname;
      break;
    case "LOGGED_OUT":
      state.username = null;
      state.firstname = null;
      state.lastname = null;
      break;
  }
  return state;
}

export default userReducer;
