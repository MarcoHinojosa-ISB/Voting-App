export function loggedIn(token){
  return {
    type: "LOGGED_IN",
    authToken: token
  };
};

export function loggedOut(){
  return {type: "LOGGED_OUT"};
};
