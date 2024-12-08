// открытие модального окна
const openModal = (popup) => {
    popup.classList.add('popup_is-animated');
    setTimeout(() => {
        popup.classList.add('popup_is-opened');
      }, 0);
    document.addEventListener('keyup', escKeyUp);
};

// закрытие модального окна
const closeModal = (popup) => {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keyup', escKeyUp);
};

// закрытие кликом на оверлей
const addCloseEventListeners = (popup) => {
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => {
        closeModal(popup);
    });

    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup'))
            closeModal(popup);
    });
};

// закрытие кнопкой esc
const escKeyUp = (evt) => {
    if (evt.key === "Escape") {
        const popupIsOpened = document.querySelector('.popup_is-opened');
        closeModal(popupIsOpened);
    }
}

export { openModal, closeModal, addCloseEventListeners };