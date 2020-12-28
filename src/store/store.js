import {createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "../reducers/index";
import data from "../js/cards";
import {CardsActionCreator} from "../actions/cards/action-creator";

const store = createStore(
  rootReducer,
  composeWithDevTools()
);

// delay
window.setTimeout(() => {
  store.dispatch(CardsActionCreator.getCards(data.cards));
}, 3000)

export default store;
