import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";

class CardItem extends React.PureComponent {
  state = {
    src: null,
    itemHover: false,
  }

  componentDidMount = () => {
    const {elem} = this.props;
    const {filename} = elem;

    this.loadImage(filename);
  }

  loadImage = (filename) => {
    import(`@/assets/images/${filename}`)
      .then(image => {
        this.setState({
          src: image.default,
        })
      })
  }

  handleButtonClick = (evt) => {
    evt.preventDefault();
    const {elem, index, updateCard} = this.props;
    const item = {
      ...elem,
      liked: !elem.liked,
    }

    updateCard({
      index,
      item,
    });
  }

  handleItemMouseEnter = (evt) => {
    const target = evt.target;
    const isItem = target.closest('.apartments__item');

    if (isItem) {
      this.setState((prevState) => ({
        itemHover: !prevState.itemHover,
      }))
    }
  }

  handleItemMouseLeave = () => {
    this.setState((prevState) => ({
      itemHover: !prevState.itemHover,
    }))
  }

  render() {
    const {elem, index} = this.props;
    const {src, itemHover} = this.state;
    const {liked} = elem;

    const buttonClass = classNames({
      'apartments__button': true,
      'active-button': liked,
    });

    const itemClass = classNames({
      'apartments__item': true,
      'hover-item': itemHover,
    });

    return (
      <li className={itemClass} onMouseEnter={this.handleItemMouseEnter} onMouseLeave={this.handleItemMouseLeave}>
        { src &&
          <React.Fragment>
            <img className="apartments__image" src={src} alt={`Апартаменты ${index + 1}`} />

            <button className={buttonClass} type="button" aria-label={(liked) ? "Убрать лайк" : "Поставить лайк"} onClick={this.handleButtonClick}></button>
          </React.Fragment>
        }
      </li>
    );
  }
}

const CardsItems = ({cards, updateCard}) => {
  return (
    <ul className="apartments__list">
      { cards.map((elem, i) =>
        <CardItem
          // properties
          key={elem.id}
          index={i}
          elem={elem}
          // handlers
          updateCard={updateCard}
        />
      )}
    </ul>
  );
};

CardItem.propTypes = {
  elem: PropTypes.shape({
    id: PropTypes.number,
    filename: PropTypes.string,
    liked: PropTypes.bool,
  }),
  index: PropTypes.number,
  updateCard: PropTypes.func,
};


CardsItems.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      filename: PropTypes.string,
      liked: PropTypes.bool,
    })
  ),
  updateCard: PropTypes.func,
};

export default CardsItems;
