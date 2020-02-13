export const initCalendar = {
    monthes: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekDays: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
    miliSecondsPerDay: 1000 * 60 * 60 * 24,
    selectedWeek: null,
    editMode: false,
    tempId: null,
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

export const remindersStorage = [
    {
        title: "",
        date: "",
        startTime: "",
        finishTime: "",
        description: "",
        id: Math.random(),
    },
    {
        title: "Do lesson",
        date: "2020-04-12",
        startTime: "",
        finishTime: "",
        description: "sadsaddsa",
        id: 0.12112313
    },
    {
        title: "Buy products",
        date: "2020-02-11",
        startTime: "00:45",
        finishTime: "01:15",
        description: "dsasddsa",
        id: 0.3918664045401694
    },
    {
        title: "Training",
        date: "2020-02-10",
        startTime: "00:15",
        finishTime: "01:45",
        description: "sadsaddsa",
        id: 0.1689814212133232
    },
    {
        title: "Shopping",
        date: "2020-02-13",
        startTime: "13:45",
        finishTime: "15:45",
        description: "dsasddsa",
        id: 0.32131324213
    },
    {
        title: "ddddddd",
        date: "2020-02-15",
        startTime: "12:30",
        finishTime: "13:15",
        description: "dsasddsa",
        id: 0.3247123123
    },
    {
        title: "adsdd",
        date: "2020-03-11",
        startTime: "00:45",
        finishTime: "01:30",
        description: "sadsaddsa",
        id: 0.123123454312312
    }
]