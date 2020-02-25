import { initCalendar } from './inititalCalendarData.js';

const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const miliSecondsPerDay = 86400000;

export const renderNavbar = () => {

  let arrOfNavBarElements = weekDays.map(item => {
    const i = weekDays.indexOf(item);
    const datesPerWeek = initCalendar.selectedWeek + (i * miliSecondsPerDay);

    return `<div class="navigation__day">
    <span class="navigation__day-of-week">${item}</span>
    <span class="navigation__date-of-month 
    ${new Date().getDate() ===
        new Date(datesPerWeek).getDate() &&
        new Date().getMonth() === new Date(datesPerWeek).getMonth() ?
        `navigation__date-of-month_selected` :
        ``}">${new Date(datesPerWeek).getDate()}</span>
  </div>`})

  const navBar = document.querySelector(".navigation__grid");
  navBar.innerHTML = arrOfNavBarElements.join('')
}
