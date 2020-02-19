import { initCalendar } from './inititalCalendarData.js';

const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
const miliSecondsPerDay = 86400000;

export const renderNavbar = () => {
  const navBar = document.querySelector(".navigation__grid");
  let arrNavBarElements = [];
  for (let i = 0; i < weekDays.length; i++) {
    let datesPerWeek = initCalendar.selectedWeek + (i * miliSecondsPerDay);
    arrNavBarElements.push(`
        <div class="navigation__day">
          <span class="navigation__day-of-week">${weekDays[i]}</span>
          <span class="navigation__date-of-month 
          ${new Date().getDate() ===
        new Date(datesPerWeek).getDate() &&
        new Date().getMonth() === new Date(datesPerWeek).getMonth() ?
        `navigation__date-of-month_selected` :
        ``}">${new Date(datesPerWeek).getDate()}</span>
        </div>`);
  }

  navBar.innerHTML = arrNavBarElements.join('')
}
