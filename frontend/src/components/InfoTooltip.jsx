import React from "react";
import ok from '../image/ok.svg';
import error from '../image/false.svg'

export default function InfoTooltip({ errorReg, isOpen, isClose }) {

  return (
    < section className={`tooltip ${isOpen ? 'tooltip_active' : ''}`}>
      <div className="tooltip__container">
        <img className="tooltip__img" src={`${errorReg ? ok : error}`} alt="" />
        <h2 className="tooltip__title">
          {`${errorReg ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`}
        </h2>
        <button className="tooltip__btn-close"
          type="button" onClick={isClose} />
      </div>
    </section >
  )
}
