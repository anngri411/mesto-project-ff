import '../pages/index.css';
import { initialCards } from './cards';
import { createCard, deleteCard, setLike } from './card';
import { openModal, closeModal, addCloseEventListeners } from './modal';


const cardsContainer = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

const editProfileForm = popupTypeCard.querySelector('.popup__form');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');

const newCardForm = popupTypeCard.querySelector('.popup__form');
const popupInputCardName = newCardForm.querySelector('.popup__input_type_card-name');
const popupInputUrl = newCardForm.querySelector('.popup__input_type_url');

const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');


const addCard = (renderCard) => {
    cardsContainer.prepend(renderCard);
};

const renderInitialCards = (initialCards) => {
    initialCards.forEach((item) => {
        addCard(createCard(deleteCard, item, setLike, handleImageZoom));
    });
};
renderInitialCards(initialCards);

const handleImageZoom = (item) => {
    popupImage.src = item.link;
    popupImage.alt = item.name;
    popupCaption.textContent = item.name;
    openModal(popupTypeImage);
}

editButton.addEventListener('click', () => {
    openModal(popupTypeEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});

addButton.addEventListener('click', () => {
    openModal(popupTypeCard);
})

addCloseEventListeners(popupTypeEdit);
addCloseEventListeners(popupTypeCard);
addCloseEventListeners(popupTypeImage);


function handleEditFormSubmit(evt) {
    evt.preventDefault();  
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    closeModal(popupNewCard);
};
editProfileForm.addEventListener('submit', handleEditFormSubmit);


function handleNewCardFormSubmit(evt) {
    evt.preventDefault();
    addCard(
        createCard(
            deleteCard, {
                name: popupInputCardName.value,
                link: popupInputUrl.value,
            },
            setLike,
            handleImageZoom
        )
    );
    closeModal(popupTypeCard);
    newCardForm.reset();
};
newCardForm.addEventListener('submit', handleNewCardFormSubmit);
