import { initCalendar, setStorage } from './storage.js'
import { renderNavbar } from './renderNavbar.js';
import { renderCalendar } from './renderCalendar.js';
import { renderHeaderText } from './renderHeader.js';

export const changeWeek = event => {
    if (event.target.parentElement.dataset.direction === "true") {
        initCalendar.switchWeek(true);
        renderNavbar();
        renderCalendar();
        renderHeaderText();
        setStorage();

    } else {
        initCalendar.switchWeek(false);
        renderNavbar();
        renderCalendar();
        renderHeaderText();
        setStorage();
    }
}