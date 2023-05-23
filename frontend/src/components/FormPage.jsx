import React from "react";

export default function FormPage({
  title,
  btnDescription,
  onChange,
  email,
  password,
  onSubmit
}) {
  return (
    <section className="page-form">
      <h2 className="page-form__title">{title}</h2>
      <form className="page-form__form" onSubmit={onSubmit}>
        <fieldset className="page-form__fieldset">
          <input
            className="page-form__input"
            name="email"
            type="email"
            placeholder="Email"
            value={email || ''}
            onChange={onChange}
            required
          />
          <input
            className="page-form__input"
            name="password"
            type="password"
            placeholder="Пароль"
            value={password || ''}
            onChange={onChange}
            required
          />
          <button className="page-form__btn" type="submit" onSubmit={onSubmit}>{btnDescription}</button>
        </fieldset>
      </form>
    </section>
  )
}
