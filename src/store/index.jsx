import {createStore} from "redux";
import mainReducer from "./reducers/index.jsx";

const store = createStore(mainReducer);

export default store;
