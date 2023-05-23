import React from "react";

export default function PopupWithForm({
  name,
  title,
  children,
  textButton,
  isOpen,
  isClose,
  onSubmit
}) {

  return (
    < section className={`popup popup_type_${name} ${isOpen ? 'popup_active' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{`${title}`}</h2>
        <form className={`form form_type_${name}`}
          name={name} onSubmit={onSubmit}>
          <fieldset className="form__fieldset">
            {children}
            <button className="form__btn"
              type="submit">{textButton}</button>
          </fieldset>
        </form>
        <button className="popup__btn-close"
          type="button"
          onClick={isClose} />
      </div>
    </section >
  )
}
