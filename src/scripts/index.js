import { initCalendar } from './storage'
import { changeWeek } from './weekSelector';
import { renderCalendar } from './renderCalendar';
import { renderSideBar } from './renderSideBar';
import { renderNavbar } from './renderNavbar';

// getMonday //

initCalendar.getMonday()

// navbar render 

renderNavbar();

// sidebar render ///

renderSideBar();

// calendar days render //

renderCalendar();

// Switch week with navigation;


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