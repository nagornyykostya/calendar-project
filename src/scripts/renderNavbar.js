import { initCalendar } from './storage.js'

export const renderNavbar = () => {
  const navBar = document.querySelector(".navigation__grid");
  let arrNavBarElements = [];
  for (let i = 0; i < initCalendar.weekDays.length; i++) {
    let datesPerWeek = initCalendar.selectedWeek + (i * initCalendar.miliSecondsPerDay);
    arrNavBarElements.push(`
        <div class="navigation__day">
          <span class="navigation__day-of-week">${initCalendar.weekDays[i]}</span>
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