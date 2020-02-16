export let initCalendar = {
    monthes: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekDays: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
    miliSecondsPerDay: 86400000,
    selectedWeek: null,
    editMode: false,
    tempId: null,
    itemColor: "#d7dbef",
    getMonday() {
        let getDayOfWeek = new Date().getDay();
        if (getDayOfWeek === 1) {
            this.selectedWeek = new Date().getTime();
        } else if (getDayOfWeek === 0) {
            this.selectedWeek = (new Date().getTime() - (6 * this.miliSecondsPerDay));
        } else {
            this.selectedWeek = new Date().getTime() - ((getDayOfWeek - 1) * this.miliSecondsPerDay);
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

export let remindersStorage = [];

export const getStorage = () => {
    let itemColor = localStorage.getItem("itemColor");
    if (itemColor) {
        initCalendar.itemColor = JSON.parse(itemColor);
    }
    let newArr = localStorage.getItem("remindersStorage");
    if (newArr) {
        remindersStorage = JSON.parse(newArr);
    }
};

export const setStorage = () => {
    localStorage.setItem("itemColor", JSON.stringify(`${initCalendar.itemColor}`));
    localStorage.setItem("remindersStorage", JSON.stringify(remindersStorage));
};