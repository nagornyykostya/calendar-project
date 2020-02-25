export const renderSideBar = () => {
    const sideBar = document.querySelector(".hours-column");
    let arrSideBarHours = [];

    for (let i = 0; i < 24; i++) {
        arrSideBarHours.push(`<div class="hours-column__hour-cell">${i < 10 ? "0" + i : i}:00</div>`)
    }
    sideBar.innerHTML = arrSideBarHours.join("")
}
