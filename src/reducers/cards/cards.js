import {updateItem} from "../../actions/action-helpers";
import {CardsActionType} from "../../actions/cards/action-creator";

const initialState = {
  cards: null
};

export default function createState(state = initialState, action) {
  switch (action.type) {
    case CardsActionType.GET_CARDS:
      return {
        ...state,
        cards: action.payload,
      };

    case CardsActionType.UPDATE_CARD:
      return {
        ...state,
        cards: updateItem(state.cards, action.payload),
      };

    default:
      return state;
  }
}
