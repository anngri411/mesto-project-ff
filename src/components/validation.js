// показ ошибки
function showInputError(
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
if (errorElement) {
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
  }
};

// скрытие ошибки
function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
if (errorElement) {
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
  }
};


// проверка валидации
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
} else {
    inputElement.setCustomValidity('');
  }
  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);    
  } else {
      hideInputError(formElement, inputElement, validationConfig);  
  }
};

// смена состояния кнопки с вызовом toggleButtonState
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationConfig)

  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function() {
          toggleButtonState(inputList, buttonElement, validationConfig);
          checkInputValidity(formElement, inputElement, validationConfig);
      })
  })
};

export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
      })
      setEventListeners(formElement, validationConfig)
      })
};

// перебор значений массива полей ввода
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid)
};

// переключение кнопки
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
      buttonElement.disabled = true;
  } else {
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
      buttonElement.disabled = false;
  }
};

// очистка
export const clearValidation = (formElement, validationConfig) => {
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));

  inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, validationConfig);
      inputElement.value = '';
  })

  toggleButtonState(inputList, buttonElement, validationConfig)
};