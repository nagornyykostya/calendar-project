export const initCalendar = {
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