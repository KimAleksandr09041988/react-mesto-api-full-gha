import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, isClose, onAddPlace }) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleName(e) {
    setName(e.target.value);
  }

  function handleLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link
    })
  }

  return (
    <PopupWithForm name='card' title='Новое место' textButton='Сохранить' isOpen={isOpen} isClose={isClose} onSubmit={handleSubmit}>
      <input id="cardName-input" className="form__input" name="name" type="text" minLength="2" maxLength="30"
        placeholder="Название" value={name || ''} onChange={handleName} required />
      <span className="form__input-error cardName-input-error"></span>
      <input id="cardUrl-input" className="form__input" name="link" type="url" placeholder="Ссылка на картинку" value={link || ''} onChange={handleLink}
        required />
      <span className="form__input-error cardUrl-input-error"></span>
    </PopupWithForm>
  )
}
