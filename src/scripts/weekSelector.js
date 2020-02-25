import { initCalendar } from './inititalCalendarData.js';
import { renderNavbar } from './renderNavbar.js';
import { renderCalendar } from './renderCalendar.js';
import { renderHeaderText } from './renderHeader.js';

export const changeWeek = event => {
    const direction = event.target.parentElement.dataset.direction === "true";
        initCalendar.switchWeek(direction);
        renderNavbar();
        renderCalendar();
        renderHeaderText();
}