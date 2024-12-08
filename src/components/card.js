import { deleteLike, addLike, removeCard } from './api';

const cardTemplate = document.querySelector('#card-template').content;

const createCard = (item, setLike, deleteCard, handleImageZoom, userId) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const cardId = item._id;

  cardImage.setAttribute('src', item.link);
  cardImage.setAttribute('alt', item.name);
  cardTitle.textContent = item.name;
  likeCounter.textContent = item.likes.length;

  if (item.likes.some((like) => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active')
  }

  if (item.owner._id === userId) {
    deleteButton.addEventListener('click', () => {
      removeCard(item._id)
      .then(() => {
        deleteCard(cardElement)
      })
      .catch((err) => {
        console.log(err);
      })
    })
  } else {
    deleteButton.style.display = "none";
  };

  likeButton.addEventListener('click', () => {
    setLike(likeButton, cardId, likeCounter);
  });

  cardImage.addEventListener('click', () => 
    handleImageZoom(item));
  
  return cardElement;
};

const setLike = (likeButton, cardId, likeCounter) => {
  const likes = likeButton.classList.contains('card__like-button_is-active') 
  ? deleteLike 
  : addLike;
  likes(cardId)
  .then((res) => {
    likeButton.classList.toggle('card__like-button_is-active');
    likeCounter.textContent = res.likes.length;
  })
  .catch((err) => {
    console.log(err);
  })
};

const deleteCard = (cardElement) => {
  cardElement.remove();
}

export { createCard, setLike, deleteCard };