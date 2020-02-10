"use strict"

// getMonday //
let initCalendar = {
    weekDays: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
    miliSecondsPerDay: 1000 * 60 * 60 * 24,
    selectedWeek: null,
    getMonday() {
        let getDayOfWeek = new Date().getDay();
        if (getDayOfWeek === 1) {
            this.selectedWeek = new Date().getTime();
        } else if (getDayOfWeek === 0) {
            this.initCalendar = (new Date().getTime() - (6 * this.miliSecondsPerDay));
        } else {
            this.initCalendar = new Date().getTime() - ((getDayOfWeek - 1) * this.miliSecondsPerDay);
        }   
    },
    switchWeek(direction) {
        if (direction) {
            this.selectedWeek += 7 * this.miliSecondsPerDay;
        } else {
            this.selectedWeek -= 7 * this.miliSecondsPerDay;
        }
    }
}

initCalendar.getMonday()

// navbar render 

const renderNavbar = () => {
    const navBar = document.querySelector(".navigation__grid");
    let arrNavBarElements = [];
    for (let i = 0; i < initCalendar.weekDays.length; i++) {
        let datesPerWeek = initCalendar.selectedWeek + (i * initCalendar.miliSecondsPerDay);
        arrNavBarElements.push(`
        <div class="navigation__day">
          <span class="navigation__day-of-week">${initCalendar.weekDays[i]}</span>
          <span class="navigation__date-of-month">${new Date(datesPerWeek).getDate()}</span>
        </div>`);
    }
    navBar.innerHTML = arrNavBarElements.join('')
}
renderNavbar();

// sidebar render ///


const renderSideBar = () => {
    const sideBar = document.querySelector(".hours-column");
    let arrSideBarHours = [];

    for (let i = 0; i < 24; i++) {
        arrSideBarHours.push(`<div class="hours-column__hour-cell">${i}:00</div>`)
    }

    sideBar.innerHTML = arrSideBarHours.join("")
}

renderSideBar();


// calendar days render //

const renderCalendar = () => {
    const dayColumns = document.querySelector(".day-columns");

    let arrDayColumns = [];
    let arrDayCells = [];

    for (let i = 0; i < 24; i++) {
        arrDayCells.push(`<div class="day-column__hour-cell"></div>`);
    }
    const columnCellsElements = arrDayCells.join('');

    for (let i = 0; i < 7; i++) {
        arrDayColumns.push(` <div class="day-column">${columnCellsElements}</div>`)
    }
    dayColumns.innerHTML = arrDayColumns.join('');
}

renderCalendar();

// Switch week with navigation;

const changeWeek = event => {
    if (event.target.parentElement.dataset.direction === "true") {
        initCalendar.switchWeek(true);
        console.log('forward week');
        console.log(initCalendar.selectedWeek)
        renderNavbar();

    } else {
        initCalendar.switchWeek(false);
        console.log('backward week');
        renderNavbar();
    } 
}

const previousWeek = document.querySelector(".weeks-selectors-block__previous-week");
previousWeek.addEventListener('click', changeWeek);
const nextWeek = document.querySelector(".weeks-selectors-block__next-week");
nextWeek.addEventListener('click', changeWeek);

const onTodayClick = () => {
    initCalendar.getMonday()
    renderNavbar();
}

const todayBtn = document.querySelector('.header__today');
todayBtn.addEventListener('click', onTodayClick);