import '../pages/index.css';
import { initialCards } from './cards';
import { createCard, setLike, deleteCard } from './card';
import { openModal, closeModal, addCloseEventListeners } from './modal';
import { enableValidation, clearValidation } from './validation';
import { addNewCard, editUserProfile, getInitialCards, getUserData, updateAvatar } from './api';


// список карточек
const cardsContainer = document.querySelector('.places__list');

// профиль
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

// кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// аватарка
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const avatarForm = document.forms["change-avatar"];
const avatarLink = document.querySelector('.popup__input_type_avatar');
const avatarButton = popupTypeAvatar.querySelector('.popup__button');

// редактирование профиля
const popupTypeEdit = document.querySelector('.popup_type_edit');
const editProfileForm = document.forms["edit-profile"];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileButton = popupTypeEdit.querySelector('.popup__button');

// добавление новой карточки
const popupTypeCard = document.querySelector('.popup_type_new-card');
const newCardForm = document.forms["new-place"];
const popupInputCardName = newCardForm.querySelector('.popup__input_type_card-name');
const popupInputUrl = newCardForm.querySelector('.popup__input_type_url');
const newCardButton = popupTypeCard.querySelector('.popup__button');

// карточка
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

// валидация
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

let userId = "";


enableValidation(validationConfig);

/*
const addCard = (renderCard) => {
    cardsContainer.prepend(renderCard);
};

const renderInitialCards = (initialCards) => {
    initialCards.forEach((item) => {
        addCard(createCard(item, setLike, deleteCard, handleImageZoom));
    });
};
renderInitialCards(initialCards);
*/

// функция открытия карточки
const handleImageZoom = (item) => {
    popupImage.src = item.link;
    popupImage.alt = item.name;
    popupCaption.textContent = item.name;
    openModal(popupTypeImage);
}

// функция редактирования профиля
function handleEditFormSubmit(evt) {
    evt.preventDefault();
    evt.submitter.textContent = 'Сохранение...'
    editUserProfile({ 
        name: nameInput.value,
        about: jobInput.value
    })
    .then((data) => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
        closeModal(popupTypeEdit);
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        evt.submitter.textContent = 'Сохранить'
    })
};
editProfileForm.addEventListener('submit', handleEditFormSubmit);

// кнопка редактирования профиля
editButton.addEventListener('click', () => {
    openModal(popupTypeEdit);
    clearValidation(editProfileForm, validationConfig);
});


// функция создания новой карточки
function handleNewCardFormSubmit(evt) {
    evt.preventDefault();
    evt.submitter.textContent = 'Создание...'
    const card = {
        name: popupInputCardName.value, 
        link: popupInputUrl.value
    };
    addNewCard(card)
    .then((element) => {
        const newCard = createCard(element, setLike, deleteCard, handleImageZoom, userId);
    cardsContainer.prepend(newCard);
    closeModal(popupTypeCard);
    newCardForm.reset();
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        evt.submitter.textContent = 'Создать'
    })
};
newCardForm.addEventListener('submit', handleNewCardFormSubmit);

// кнопка добавления карточки
addButton.addEventListener('click', () => {
    openModal(popupTypeCard);
    clearValidation(newCardForm, validationConfig);
})

// изменение аватарки
function handleAvatarSubmit(evt) {
    evt.preventDefault();
    evt.submitter.textContent = 'Сохранение...'
    updateAvatar(avatarLink.value)
    .then((data) => {
        profileImage.style.backgroundImage = `url('${data.avatar}')`;
        closeModal(popupTypeAvatar);
        avatarForm.reset();
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        evt.submitter.textContent = 'Сохранить'
    })
}
profileImage.addEventListener('submit', handleAvatarSubmit);

profileImage.addEventListener('click', () => {
    openModal(popupTypeAvatar);
    clearValidation(popupTypeAvatar, validationConfig);
    avatarForm.reset();
})

addCloseEventListeners(popupTypeEdit);
addCloseEventListeners(popupTypeCard);
addCloseEventListeners(popupTypeImage);
addCloseEventListeners(popupTypeAvatar);

Promise.all([getInitialCards(), getUserData()])
    .then((data) => {
        userId = data[1]._id
        profileTitle.textContent = data[1].name;
        profileDescription.textContent = data[1].about;
        profileImage.style = `background-image: url('${data.avatar}')`;

        data[0].forEach((item) => {
            cardsContainer.append(createCard(item, setLike, deleteCard, handleImageZoom, userId))
        })
    })
    .catch((err) => {
        console.log(err);
});