import React from "react";
import { CurrentUserContext } from "./contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLike = card.likes.some(i => i._id === currentUser._id)
  const cardLikeButtonClassName = `gallery__like ${isLike && 'gallery__like_condition_active'}`;

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleClick() {
    onCardClick(card)
  }

  function deleteCard() {
    onCardDelete(card)
  }

  return (
    <li className="gallery__card">
      <img className="gallery__img"
        src={card.link}
        alt={card.name}
        onClick={handleClick} />
      <div className="gallery__info">
        <h2 className="gallery__title">{card.name}</h2>
        <div className="gallery__wrapper">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <span className="gallery__quantity-like">{card.likes.length}</span>
        </div>
      </div>
      {isOwn && <button
        className="gallery__btn-remove"
        onClick={deleteCard}
      ></button>}
    </li>
  )
}
