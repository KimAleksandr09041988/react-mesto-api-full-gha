import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "./contexts/CurrentUserContext";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, cardList, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__wrapper-avatar">
          <img className="profile__img-avatar"
            alt="Аватар"
            src={currentUser.avatar} />
          <button className="profile__edit-avatar"
            type="button"
            onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-btn"
              type="button"
              onClick={onEditProfile}></button>
          </div>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button className="profile__add-btn"
          type="button"
          onClick={onAddPlace}></button>
      </section>
      <section className="gallery">
        <ul className="gallery__cards">
          {cardList.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}
