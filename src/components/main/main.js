import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getCards} from "../../selectors/cards/selectors";
import {CardsActionCreator} from "../../actions/cards/action-creator";
import CardsItems from "../cards-items/cards-items";
import {APARTMENT_BASE_PART as basePart} from "../../js/const";
import setWordEnding from "../../js/ending";

const Main = ({cards, updateCard}) => {
  const setApartmentsAmount = () => {
    const ending = setWordEnding(cards.length, [`${basePart}а`, `${basePart}ы`, `${basePart}`]);

    return ending;
  };

  return (
    <section className="apartments">
      <div className="site-wrapper">
        { cards &&
          cards.length > 0 &&
          <React.Fragment>
            <h1 className="apartments__title">Найдено {cards.length} {setApartmentsAmount()}</h1>

            <div className="apartments__list-wrapper">
              {/* apartments list */}
              <CardsItems
                // properties
                cards={cards}
                // handlers
                updateCard={updateCard}
              />
            </div>
          </React.Fragment>
        }
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  cards: getCards(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateCard: (data) => {
    dispatch(CardsActionCreator.updateCard(data));
  },
});

Main.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      filename: PropTypes.string,
      liked: PropTypes.bool,
    })
  ),
  updateCard: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
