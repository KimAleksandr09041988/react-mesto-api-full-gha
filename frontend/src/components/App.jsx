import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import { FormValueContext } from './contexts/FormVaueContext';
import ProtectedRouteElement from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import server from '../utils/Api';
import auth from '../utils/Auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isAddTooltipOpen, setIsAddTooltipOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cardList, setCardList] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [email, setEmail] = React.useState('');
  const [errorReg, setErrorReg] = React.useState(false)
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      auth.checkAuthorization()
        .then(res => {
          setEmail(res.data.email);
          setLoggedIn(true);
          navigate('/', { replace: true })
        })
        .catch(err => console.log(err))
    }
  }, [navigate])


  React.useEffect(() => {
    loggedIn &&
      server.getUserInfo()
        .then(res => {
          setCurrentUser(res)
        })
        .catch(err => {
          console.log(err);
        })
    server.getCardInfo()
      .then(result => {
        setCardList(result);
      })
      .catch(err => {
        console.log(err);
      })
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLike = card.likes.some(i => i._id === currentUser._id);
    server.changeLikeCardStatus(card._id, !isLike)
      .then((newCard) => {
        setCardList((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    server.deleteCardInfo(card._id)
      .then(() => setCardList(state => state.filter(item => item._id !== card._id)))
      .catch(err => console.log(err))
  }

  function handleUpdateUser(obj) {
    server.patchUserInfo(obj)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar(obj) {
    server.changeAvatarUrl(obj)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit(obj) {
    server.addCardInfo(obj)
      .then(newCard => {
        setCardList([newCard, ...cardList]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleIsEditProfilePopup() {
    setIsEditProfilePopupOpen(true)
  }

  function handleIsAddPlacePopup() {
    setIsAddPlacePopupOpen(true)
  }

  function handleIsEditAvatarPopup() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(data) {
    setSelectedCard({ name: data.name, link: data.link })
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({ name: '', link: '' })
    setIsAddTooltipOpen(false)
  }

  const handleSignOut = () => {
    setEmail("");
    localStorage.removeItem("token");
  };

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  })

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  function handleSubmitRegister(e) {
    e.preventDefault()
    const { email, password } = formValue;
    auth.registration(email, password)
      .then((res) => {
        console.log(res.status);
        setFormValue({
          email: '',
          password: ''
        })
        setIsAddTooltipOpen(true)
        setErrorReg(true)
        navigate('/', { replace: true })
      })
      .catch((err) => {
        setIsAddTooltipOpen(true)
        setErrorReg(false)
        console.log(err);
      })
  }

  function handleSubmitLogin(e) {
    e.preventDefault()
    const { email, password } = formValue;
    auth.avtorization(email, password)
      .then(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setFormValue({
            email: '',
            password: ''
          })
          setLoggedIn(true)
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        console.log(err)
        setErrorReg(false)
        setIsAddTooltipOpen(true)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <FormValueContext.Provider value={formValue}>

        <Header email={email} onSignOut={handleSignOut} />
        <Routes>
          <Route path="/"
            element={<ProtectedRouteElement element={Main}
              onEditProfile={handleIsEditProfilePopup}
              onAddPlace={handleIsAddPlacePopup}
              onEditAvatar={handleIsEditAvatarPopup}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cardList={cardList}
              loggedIn={loggedIn}
            />} />
          <Route
            path='/sign-in'
            element={<Login
              onChange={handleChangeInput}
              onSubmit={handleSubmitLogin}
            />}
          />
          <Route
            path='/sign-up'
            element={<Register
              onSubmit={handleSubmitRegister}
              onChange={handleChangeInput}
            />}
          />
        </Routes>
        <Footer />

        {/* popup */}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} isClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} isClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} isClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <PopupWithForm name='delete' title='Вы уверены?' textButton='Да' isClose={closeAllPopups}>
          <input id="avatarUrl-input" className="form__input" name="avatar" type="url" placeholder="Ссылка на аватар"
            required />
          <span className="form__input-error avatarUrl-input-error"></span>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          errorReg={errorReg}
          isOpen={isAddTooltipOpen}
          isClose={closeAllPopups}
        />

      </FormValueContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
