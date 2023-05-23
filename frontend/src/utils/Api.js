
class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject((`Ошибка: ${res.status}`));
    }
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  patchUserInfo(obj) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: obj.name,
        about: obj.about
      })
    })
      .then(res => this._getResponseData(res));
  }

  getCardInfo() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  addCardInfo(obj) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: obj.name,
        link: obj.link
      })
    })
      .then(res => this._getResponseData(res));
  }

  deleteCardInfo(elem) {
    return fetch(`${this._url}/cards/${elem}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  changeLikeCardStatus(elem, isLiked) {
    return fetch(`${this._url}/cards/${elem}/likes`, {
      method: `${!isLiked ? "DELETE" : "PUT"}`,
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  changeAvatarUrl(obj) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: obj.avatar
      })
    })
      .then(res => this._getResponseData(res));
  }
}

const server = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '55d9c654-87a0-44f5-b6c8-0fdd71644143',
    'Content-Type': 'application/json'
  }
});

export default server;
