import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "./contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, isClose, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  function handleEditName(e) {
    setName(e.target.value)
  }

  function handleDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    })
  }

  return (
    <PopupWithForm name='profile' title='Редактировать профиль' textButton='Сохранить' isOpen={isOpen} isClose={isClose} onSubmit={handleSubmit}>
      <input
        id="fullName-input"
        className="form__input"
        name="name"
        type="text"
        minLength="2"
        maxLength="40"
        placeholder="ФИО"
        value={name || ''}
        onChange={handleEditName}
        required />
      <span className="form__input-error fullName-input-error"></span>
      <input
        id="profession-input"
        className="form__input"
        name="about"
        type="text"
        placeholder="Профессия"
        minLength="2"
        maxLength="200"
        value={description || ''}
        onChange={handleDescription}
        required />
      <span className="form__input-error profession-input-error"></span>
    </PopupWithForm>
  )
}
