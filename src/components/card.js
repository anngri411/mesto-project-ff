const cardTemplate = document.querySelector('#card-template').content;

const createCard = ( item, deleteCard, setLike, handleImageZoom) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.setAttribute('src', item.link);
  cardImage.setAttribute('alt', item.name);
  cardTitle.textContent = item.name;

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', setLike);
  cardImage.addEventListener('click', () => 
    handleImageZoom(item));
  
  return cardElement;
};

const deleteCard = (evt) => evt.target.closest('.card').remove()

const setLike = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

export { createCard, deleteCard, setLike };