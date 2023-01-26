let scrollPercentage = () => {
    let scrollProgress = document.querySelector('.progress');
    let progressValue = document.querySelector('.progress-value');
    let pos = document.documentElement.scrollTop;
    let catlHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round(pos * 100 / catlHeight);
    scrollProgress.style.background = `conic-gradient(#e70634 ${scrollValue}%, #2b2f38 ${scrollValue}%)`;
}
window.onscroll = scrollPercentage;
window.onload = scrollPercentage;


const arrowUp = document.querySelector('.arrow-up');

const scrollUp = () => {
    if (window.pageYOffset > 90) {
        arrowUp.style.display = 'block';
        // arrowUp.style.transition = 'all 5s ease-in-out'
    } else {
        arrowUp.style.display = 'none';
    }
}

document.addEventListener(
    'scroll',
    scrollUp
);

