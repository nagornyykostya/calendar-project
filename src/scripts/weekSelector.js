export const changeWeek = event => {
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
