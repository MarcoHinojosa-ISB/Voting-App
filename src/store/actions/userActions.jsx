export function loggedIn(username, firstname, lastname){
  return {
    type: "LOGGED_IN",
    username,
    firstname,
    lastname
  };
};

export function loggedOut(){
  return {type: "LOGGED_OUT"};
};
