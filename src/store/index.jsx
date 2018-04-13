import {createStore} from "redux";
import mainReducer from "./reducers/index.jsx";

const store = createStore(mainReducer);


// save session
store.subscribe(function(){
  localStorage.setItem('state', JSON.stringify(store.getState().user));
})
export default store;
