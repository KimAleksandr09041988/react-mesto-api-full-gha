const profileProfession = '.profile__profession';
const profileName = '.profile__name';
const avatarImg = '.profile__img-avatar';
const galleryCards = '.gallery__cards';
const popupImage = '.popup_type_image';
const popupCard = '.popup_type_card';
const popupProfile = '.popup_type_profile';
const popupDelete = '.popup_type_delete';
const popupAvatar = '.popup_type_avatar';
const profileEditAvatar = document.querySelector('.profile__edit-avatar');
const btnConditionFormCards = document.querySelector('.profile__add-btn');
const profileEditBtn = document.querySelector('.profile__edit-btn');
const fullNameInput = document.querySelector('#fullName-input');
const professionInput = document.querySelector('#profession-input');
const formProfile = document.querySelector('.form_type_profile');
const formCard = document.querySelector('.form_type_card');
const formAvatar = document.querySelector('.popup_type_avatar');
const identifier = 'https://mesto.nomoreparties.co/v1/cohort-59';
const token = '55d9c654-87a0-44f5-b6c8-0fdd71644143';

const validationConfig = {
  fieldsetSelector: '.form__fieldset',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__btn',
  inactiveButtonClass: 'form__btn_inactive',
  inputErrorClass: 'form__input_type_error',
};

export {
  formProfile,
  formCard,
  profileEditBtn,
  popupProfile,
  profileName,
  profileProfession,
  galleryCards,
  btnConditionFormCards,
  popupCard,
  popupImage,
  validationConfig,
  fullNameInput,
  professionInput,
  identifier,
  token,
  avatarImg,
  popupDelete,
  formAvatar,
  popupAvatar,
  profileEditAvatar
};
