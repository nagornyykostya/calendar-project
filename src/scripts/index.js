import { initCalendar } from './inititalCalendarData.js';
import { getReminders, getDefaultColor } from './gateWay.js';
import { getStorage, setStorage, remindersStorage } from './storage.js';
import { renderPopUpForm } from './renderPopUp.js';
import { renderNavbar } from './renderNavbar.js';
import { renderCalendar, initCalendarEditListeners } from './renderCalendar.js';
import { renderSideBar } from './renderSideBar.js';
import { renderHeaderText, initHeaderEventListeners } from './renderHeader.js';
import { initSettingsModalListeners } from './settingsModal.js';
import { renderLoader, hideLoader } from './renderLoader.js';


document.addEventListener('DOMContentLoaded', () => {
    renderLoader()
    getReminders()
        .then(data => {
            remindersStorage.push(...data);
            setStorage();
            getStorage();
            initCalendar.getMonday();
            renderHeaderText();
            initHeaderEventListeners();
            renderNavbar();
            renderSideBar();
            renderPopUpForm();
            renderCalendar();
            setInterval(renderCalendar, 60000);
            initCalendarEditListeners()
            initSettingsModalListeners();

            (function () {
                const currentTimeLine = document.querySelector('.day-column__current-time-line');
                currentTimeLine.scrollIntoView({ block: "center", behavior: "smooth" });
            })()
        })
    getDefaultColor()
        .then(data => {
            if (data[0].defaultColor) {
                initCalendar.itemColor = data[0].defaultColor;
                hideLoader();
            }
        })
})

const onStorageChange = (e) => {
    getStorage();
    renderCalendar();
}

window.addEventListener('storage', onStorageChange)