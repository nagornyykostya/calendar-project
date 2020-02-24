const loaderElement = document.querySelector('.lds-ring');

export const renderLoader = () => {
    loaderElement.classList.add("lds-ring_visible");
};

export const hideLoader = () => {
    loaderElement.classList.remove("lds-ring_visible");
};