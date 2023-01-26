
const swiper = new Swiper(".popular", {
slidesPerView: 1,
spaceBetween: 10,
pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 5000,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        640: {
        slidesPerView: 2,
        spaceBetween: 20,
        },
        805: {
            slidesPerView: 2,
            spaceBetween: 40,
        },
        1024: {
        slidesPerView: 3,
        spaceBetween: 40,
        },
        1200: {
            slidesPerView: 4,
            spaceBetween: 40,
        }
    },
});


const swiper2 = new Swiper('.banner', {
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    autoplay: {
        delay: 7000,
    },
    speed:800
});


const swiper3 = new Swiper(".top-rated", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 6000,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            640: {
            slidesPerView: 2,
            spaceBetween: 20,
            },
            805: {
                slidesPerView: 2,
                spaceBetween: 40,
            },
            1024: {
            slidesPerView: 3,
            spaceBetween: 40,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 40,
            }
        },
    });

const swiper4 = new Swiper(".upcoming", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 7000,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            640: {
            slidesPerView: 2,
            spaceBetween: 20,
            },
            805: {
                slidesPerView: 2,
                spaceBetween: 40,
            },
            1024: {
            slidesPerView: 3,
            spaceBetween: 40,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 40,
            }
        },
    });