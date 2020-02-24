const miliSecondsPerDay = 86400000;

export let initCalendar = {
    selectedWeek: null,
    editMode: false,
    tempId: null,
    itemColor: "#d7dbef",
    getMonday() {
        let getDayOfWeek = new Date().getDay();
        if (getDayOfWeek === 1) {
            this.selectedWeek = new Date().getTime();
        } else if (getDayOfWeek === 0) {
            this.selectedWeek = (new Date().getTime() - (6 * miliSecondsPerDay));
        } else {
            this.selectedWeek = new Date().getTime() - ((getDayOfWeek - 1) * miliSecondsPerDay);
        }
    },
    switchWeek(direction) {
        if (direction) {
            this.selectedWeek += 7 * miliSecondsPerDay;
        } else {
            this.selectedWeek -= 7 * miliSecondsPerDay;
        }
    }
} 