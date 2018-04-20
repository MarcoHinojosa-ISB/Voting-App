const initialState = {
  username: localStorage.getItem("username"),
  firstname: localStorage.getItem("firstname"),
  lastname: localStorage.getItem("lastname")
}

const userReducer = function(state = initialState, action){
  switch(action.type){
    case "LOGGED_IN":
      state.username = action.username;
      state.firstname = action.firstname;
      state.lastname = action.lastname;
      localStorage.setItem('username', state.username);
      localStorage.setItem('firstname', state.firstname);
      localStorage.setItem('lastname', state.lastname);
      break;
    case "LOGGED_OUT":
      state.username = null;
      state.firstname = null;
      state.lastname = null;
      localStorage.removeItem('username');
      localStorage.removeItem('firstname');
      localStorage.removeItem('lastname');
      break;
  }
  return state;
}

export default userReducer;
