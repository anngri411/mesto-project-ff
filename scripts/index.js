// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, callBackDeleteCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        callBackDeleteCard(cardElement);
    });

    return cardElement;
};

// @todo: Функция удаления карточки
function deleteCard(cardData) {
    cardData.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(function(cardData) {
    const readyElement = createCard(cardData, deleteCard);
    cardsContainer.append(readyElement);
});
