const CardsActionType = {
  GET_CARDS: 'GET_CARDS',
  UPDATE_CARD: 'UPDATE_CARD'
};

const CardsActionCreator = {
  getCards: (data) => ({
    type: CardsActionType.GET_CARDS,
    payload: data,
  }),

  updateCard: (data) => ({
    type: CardsActionType.UPDATE_CARD,
    payload: data,
  }),
};

export {CardsActionType, CardsActionCreator};
