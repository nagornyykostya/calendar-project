import { initCalendar } from './storage.js';
import { renderPopUpForm } from './renderPopUp.js';
import { renderNavbar } from './renderNavbar.js';
import { renderCalendar, initCalendarEditListeners } from './renderCalendar.js';
import { renderSideBar } from './renderSideBar.js';
import { renderHeaderText, initHeaderEventListeners } from './renderHeader.js';
import { initSettingsModalListeners } from './settingsModal.js';

document.addEventListener('DOMContentLoaded', () => {
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
    const currentTimeLine = document.querySelector('.day-column__current-time-line');
    const scrollToCurrentTimeLine = () => {
        currentTimeLine.scrollIntoView({ block: "center", behavior: "smooth" });
    }
    scrollToCurrentTimeLine();
})