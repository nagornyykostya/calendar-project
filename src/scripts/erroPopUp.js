export const renderError = (error) => {
    const errorPopUp = document.querySelector('.error-popup');
    const errorMessageElement = document.querySelector('.error-popup__message');
    const closeErroBtn = document.querySelector('.error-popup__close-modal-btn');

    errorMessageElement.textContent = error.message;
    errorPopUp.classList.add("error-popup_show");

    const onCloseErrorClick = () => {
        errorPopUp.classList.remove("error-popup_show");
    }

    closeErroBtn.addEventListener('click', onCloseErrorClick);
}