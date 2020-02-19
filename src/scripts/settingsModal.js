import { initCalendar } from './inititalCalendarData.js';
import { setStorage } from './storage.js';

const colorBaseInput = document.getElementById("base-color");
const settingsModal = document.querySelector('.header__settings-modal');
const settingsButton = document.querySelector('.header__settings-actions');
const closeSettingsBtn = document.querySelector('.header__close-modal-btn');
const saveSettingsBtn = document.querySelector('.header__submit-btn');

const onSettingsClick = (e) => {
    settingsModal.setAttribute("style", "visibility: visible;");
    colorBaseInput.value = initCalendar.itemColor;
    setStorage()
}

const onCloseModalBtn = (e) => {
    if (e.target.id = "close-modal-btn") {
        settingsModal.setAttribute("style", "visibility: hidden;");
    }
}

const onSaveSettingsClick = (e) => {
    e.preventDefault();
    initCalendar.itemColor = colorBaseInput.value;
    settingsModal.setAttribute("style", "visibility: hidden;");
    setStorage();
}

export const initSettingsModalListeners = () => {
    closeSettingsBtn.addEventListener('click', onCloseModalBtn);
    settingsButton.addEventListener('click', onSettingsClick);
    saveSettingsBtn.addEventListener('click', onSaveSettingsClick);
}
