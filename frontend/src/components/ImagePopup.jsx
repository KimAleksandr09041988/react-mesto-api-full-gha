export default function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup_type_image ${card.link ? 'popup_active' : ''}`} >
      <div className="popup__container popup__container_popup_image">
        <figure className="figure">
          <img className="figure__img" src={card.link} alt={card.name} />
          <figcaption className="figure__subtitle">{card.name}</figcaption>
        </figure>
        <button className="popup__btn-close" type="button" onClick={onClose} />
      </div>
    </section>
  )
}
