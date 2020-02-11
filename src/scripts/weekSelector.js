import { initCalendar } from './storage.js'
import { renderNavbar } from './renderNavbar.js';
import { renderCalendar } from './renderCalendar.js';


export const changeWeek = event => {
    if (event.target.parentElement.dataset.direction === "true") {
        initCalendar.switchWeek(true);
        renderNavbar();
        renderCalendar();

    } else {
        initCalendar.switchWeek(false);
        renderNavbar();
        renderCalendar();
    }
}
