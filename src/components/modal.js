const escKeyUp = (evt) => {
    if (evt.key === "Escape") {
        const popupIsOpened = documen.querySelector('.popup_is-opened');
        closeModal(popupIsOpened);
    }
}

const openModal = (popup) => {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keyup', escKeyUp);
};

const closeModal = (popup) => {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keyup', escKeyUp);
};

const addCloseEventListeners = (popup) => {
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => {
        closeModal(popup);
    });

    popup.addEventListener('mousedown', (evt) => {
        if(evt.target.classList.contains('popup'))
            closeModal(popup);
    });
};

export { openModal, closeModal, addCloseEventListeners };