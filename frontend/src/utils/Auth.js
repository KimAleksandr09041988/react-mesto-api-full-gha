class Auth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject((`Ошибка: ${res.status}`));
    }
  }

  registration(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password,
        email
      })
    })
      .then(res => this._getResponseData(res))
  };

  avtorization(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({ password, email })
    })
      .then(res => this._getResponseData(res))
  }

  checkAuthorization() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._getResponseData);
  }
}


const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co'
});

export default auth
