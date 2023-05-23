import React from "react";
import PopupWithForm from "./PopupWithForm";


export default function EditAvatarPopup({ isOpen, isClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm name='avatar' title='Обновить аватар' textButton='Сохранить' isOpen={isOpen} isClose={isClose} onSubmit={handleSubmit}>
      <input id="avatarUrl-input" className="form__input" name="avatar" type="url" placeholder="Ссылка на аватар" ref={avatarRef} required />
      <span className="form__input-error avatarUrl-input-error"></span>
    </PopupWithForm>
  )
}
