const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-27",
  headers: {
    authorization: "a5f3019c-4d2b-4abf-9c96-6355a3ede9da",
    "Content-Type": "application/json",
  } 
};

const handleResponse = (res) => {
  if(res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
};

function getInitialCards() {
  return fetch (`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(handleResponse)
}

const getUserData = () => {
  return fetch (`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(handleResponse)
}

const editUserProfile = (data) => {
  return fetch (`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about,
    })
  })
  .then(handleResponse)
}

const addNewCard = (card) => {
  return fetch (`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
  .then(handleResponse)
}

const removeCard = (cardId) => {
  return fetch (`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse)
}

const addLike = (cardId) => {
  return fetch (`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(handleResponse)
}

const deleteLike = (cardId) => {
  return fetch (`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => {
    return res.json()
  })
}

const updateAvatar = (data) => {
  return fetch (`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: data,
    })
  })
    .then(handleResponse)
}

export { getInitialCards, getUserData, editUserProfile, addNewCard, removeCard, addLike, deleteLike, updateAvatar };