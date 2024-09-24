// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card, callBackDeleteCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        callBackDeleteCard(cardElement);
    });
    return cardElement;
};

// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(function(card) {
    const readyElement = createCard(card, deleteCard);
    placesList.append(readyElement);
});
