// POPULAR MOVIES

const baseURL = "https://api.themoviedb.org/3/";
const popular = "movie/popular?";
const key = "api_key=";
const API_KEY = "49862386b331dabcc0cd47526a47f3dc";
const popularID = `Client-ID ${API_KEY}`;
const popularURL = baseURL + popular + key + API_KEY + '&language=en-US';
// https://api.themoviedb.org/3/movie/popular?api_key=49862386b331dabcc0cd47526a47f3dc

const posterBaseURL = "https://image.tmdb.org/t/p/w500"

const myFirstHeader = new Headers();
myFirstHeader.append("Authorization", popularID);

const firstRequestOption = {
    method: "GET",
    headers: myFirstHeader
}

fetch( popularURL, firstRequestOption )
    .then(res => {
        return res.json();
    })
    .then(result => {
        console.log(result);
        const popularDatas = result.results  
        popularDatas.forEach(
            popularData => {
                const slides = document.querySelector('#slides');
                const swiper = document.createElement('div');
                const imageContainer = document.createElement('div');
                const image = document.createElement('img');
                const rating = document.createElement('span');
                const overview = document.createElement('div');
                const overviewTitle = document.createElement('h3');
                const overviewDesc = document.createElement('p');
                const link = document.createElement('a');

                swiper.classList.add('swiper-slide');
                swiper.classList.add('popular-swiper');
                imageContainer.classList.add('image-container');
                rating.classList = 'rating' + ' ' + getColor(popularData.vote_average);
                overview.classList.add('overview');
                overviewTitle.classList.add('overview-title');

                image.src = posterBaseURL + popularData.poster_path;
                rating.innerText = ifNotDecimal(popularData.vote_average);
                overviewTitle.innerText = popularData.title;
                overviewDesc.innerText = popularData.overview

                link.href = `details.html?id=${popularData.id}`;

                overview.append(overviewTitle)
                overview.append(overviewDesc);
                imageContainer.append(image);
                imageContainer.append(rating);
                link.append(imageContainer);
                link.append(overview);
                swiper.append(link);

                slides.append(swiper);
        }); 
            
    })
    .then(err => {
        console.log(err);
    })


// TOP RATED MOVIES
const topRated = "movie/top_rated?"
const topRatedURL = baseURL + topRated + key + API_KEY + '&language=en-US';

const topRatedHeader = new Headers();
topRatedHeader.append("Authorization", popularID);

const topRatedRequestOption = {
    method: "GET",
    headers: topRatedHeader
}

fetch( topRatedURL, topRatedRequestOption )
    .then(res => {
        return res.json();
    })
    .then(result => {
        console.log(result);
        const topRatedResults = result.results  
        topRatedResults.forEach(
            topRatedResult => {
                const slides = document.querySelector('#topRatedSlides');
                const swiper = document.createElement('div');
                const imageContainer = document.createElement('div');
                const image = document.createElement('img');
                const rating = document.createElement('span');
                const overview = document.createElement('div');
                const overviewTitle = document.createElement('h3');
                const overviewDesc = document.createElement('p');
                const link = document.createElement('a');

                swiper.classList.add('swiper-slide');
                swiper.classList.add('popular-swiper');
                imageContainer.classList.add('image-container');
                rating.classList = 'rating' + ' ' + getColor(topRatedResult.vote_average);
                overview.classList.add('overview');
                overviewTitle.classList.add('overview-title');

                image.src = posterBaseURL + topRatedResult.poster_path;
                rating.innerText = ifNotDecimal(topRatedResult.vote_average);
                overviewTitle.innerText = topRatedResult.title;
                overviewDesc.innerText = topRatedResult.overview

                link.href = `details.html?id=${topRatedResult.id}`;

                overview.append(overviewTitle)
                overview.append(overviewDesc);
                imageContainer.append(image);
                imageContainer.append(rating);
                link.append(imageContainer);
                link.append(overview);
                swiper.append(link);

                slides.append(swiper);
        }); 
            
    })
    .then(err => {
        console.log(err);
    })


// UPCOMING MOVIES
const upcoming = "movie/upcoming?";
const upcomingURL = baseURL + upcoming + key + API_KEY + '&language=en-US';

const upcomingHeader = new Headers();
upcomingHeader.append("Authorization", popularID);

const upcomingRequestOption = {
    method: "GET",
    headers: upcomingHeader
}

fetch( upcomingURL, upcomingRequestOption )
    .then(res => {
        return res.json();
    })
    .then(result => {
        console.log(result);
        const upcomingResults = result.results  
        upcomingResults.forEach(
            upcomingResult => {
                const slides = document.querySelector('#upcomingSlides');
                const swiper = document.createElement('div');
                const imageContainer = document.createElement('div');
                const image = document.createElement('img');
                const rating = document.createElement('span');
                const overview = document.createElement('div');
                const overviewTitle = document.createElement('h3');
                const overviewDesc = document.createElement('p');
                const link = document.createElement('a');

                swiper.classList.add('swiper-slide');
                swiper.classList.add('popular-swiper');
                imageContainer.classList.add('image-container');
                rating.classList = 'rating' + ' ' + getColor(upcomingResult.vote_average);
                overview.classList.add('overview');
                overviewTitle.classList.add('overview-title');

                image.src = posterBaseURL + upcomingResult.poster_path;
                rating.innerText = ifNotDecimal(upcomingResult.vote_average);
                overviewTitle.innerText = upcomingResult.title;
                overviewDesc.innerText = upcomingResult.overview

                link.href = `details.html?id=${upcomingResult.id}`;

                overview.append(overviewTitle)
                overview.append(overviewDesc);
                imageContainer.append(image);
                imageContainer.append(rating);
                link.append(imageContainer);
                link.append(overview);
                swiper.append(link);

                slides.append(swiper);
        }); 
            
    })
    .then(err => {
        console.log(err);
    })

const getColor = ( vote_average ) => {
    if ( vote_average >= 8 ) {
        return `green`;
    } else if ( vote_average >= 5 ) {
        return 'orange';
    } else {
        return 'red';
    }
}

const ifNotDecimal = ( vote_average ) => {
    const stringRating = vote_average.toString()
    if ( !stringRating.includes('.') ) {
        return vote_average + `.0`;
    } else {
        return parseFloat(vote_average);
    }
}

// lATEST MOVIES

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth() + 1;
let currentDay = currentDate.getDate();

const latestMovies = currentYear + "-" + currentMonth.toString().padStart(2, "0") + "-" + currentDay.toString().padStart(2, "0")

// const latest = `discover/movie?primary_release_date.gte=${latestMovies}&primary_release_date.lte=${latestMovies}&`;
const latest = `discover/movie?primary_release_date.lte=${latestMovies}&sort_by=primary_release_date.desc&`;
const latestURL = baseURL + latest + key + API_KEY + '&language=en-US';
// https://api.themoviedb.org/3/discover/movie?primary_release_date.lte=${latestMovies}&sort_by=primary_release_date.desc&api_key=49862386b331dabcc0cd47526a47f3dc

const mySecondHeader = new Headers();
mySecondHeader.append("Authorization", popularID);

const secondRequestOption = {
    method: "GET",
    headers: mySecondHeader
}

fetch( latestURL, secondRequestOption )
    .then(res => {
        return res.json();
    })
    .then(result => {
        console.log(result);
        const latestDatas = result.results
        latestDatas.forEach(
            latestData => {
                // if ( latestData.poster_path == null ) {
                //     return;
                // };
                const latestGrid = document.querySelector('#latestGrid');
                const postBox = document.createElement('div');
                const postImage = document.createElement('div');
                const image = document.createElement('img');
                const rating = document.createElement('span');
                const overview = document.createElement('div');
                const overviewTitle = document.createElement('h3');
                const overviewDesc = document.createElement('p');
                const link = document.createElement('a');

                postBox.classList.add('post-box');
                postImage.classList.add('post-img');
                rating.classList = 'rating' + ' ' + getColor(latestData.vote_average);
                overview.classList.add('overview');
                overviewTitle.classList.add('overview-title');

                image.src = posterBaseURL + latestData.poster_path;
                rating.innerText = ifNotDecimal(latestData.vote_average);
                overviewTitle.innerText = latestData.title;
                overviewDesc.innerText = latestData.overview;

                link.href = `details.html?id=${latestData.id}`


                overview.append(overviewTitle);
                overview.append(overviewDesc);
                postImage.append(image);
                postImage.append(rating);
                postBox.append(postImage);
                postBox.append(overview);

                link.append(postBox);

                latestGrid.append(link);

        }); 
            
    })
    .then(err => {
        console.log(err);
    })


// BUTTONS FOR LATEST MOVIES

const pageButtons = document.querySelectorAll('.page-buttons');
let lastClicked;

pageButtons.forEach(
    pageButton => {
        pageButton.style.background = '';
        pageButton.addEventListener(
            'click',
            (e) => {
                const page = '&page=' + e.target.value;
                const pagesURL = latestURL + page;
                // // https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2023-01-20&primary_release_date.lte=2023-01-20&api_key=49862386b331dabcc0cd47526a47f3dc&page=1 or any value
                const scrollUp = document.querySelector('#latest');
                window.location = '#latest';
                if ( lastClicked ) {
                    lastClicked.style.backgroundColor = '';
                }
                e.target.style.backgroundColor = '#a82f43';
                lastClicked = e.target;

                fetch( pagesURL, secondRequestOption )
                    .then(res => {
                        return res.json();
                    })
                    .then(result => {
                        console.log(result);
                        const latestDatas = result.results
                        latestGrid.replaceChildren();
                        setTimeout(
                            latestDatas.forEach(
                                latestData => {
                                    // if ( latestData.poster_path == null ) {
                                    //     return;
                                    // };
                                    const latestGrid = document.querySelector('#latestGrid');
                                    const postBox = document.createElement('div');
                                    const postImage = document.createElement('div');
                                    const image = document.createElement('img');
                                    const rating = document.createElement('span');
                                    const overview = document.createElement('div');
                                    const overviewTitle = document.createElement('h3');
                                    const overviewDesc = document.createElement('p');
                                    const link = document.createElement('a');
    
                                    postBox.classList.add('post-box');
                                    postImage.classList.add('post-img');
                                    rating.classList = 'rating' + ' ' + getColor(latestData.vote_average);
                                    overview.classList.add('overview');
                                    overviewTitle.classList.add('overview-title');
    
                                    image.src = posterBaseURL + latestData.poster_path
                                    rating.innerText = ifNotDecimal(latestData.vote_average);
                                    overviewTitle.innerText = latestData.title;
                                    overviewDesc.innerText = latestData.overview;

                                    link.href = `details.html?id=${latestData.id}`
    
                                    overview.append(overviewTitle);
                                    overview.append(overviewDesc);
                                    postImage.append(image);
                                    postImage.append(rating);
                                    postBox.append(postImage);
                                    postBox.append(overview);
    
                                    link.append(postBox);
    
                                    latestGrid.append(link);
    
                            })
                        );
                        2000
                            
                    })
                    .then(err => {
                        console.log(err);
                    })

            }
        );
    }
);

// TRENDING
const playNow = 'trending/movie/week?';
const posterOrginalSize = "https://image.tmdb.org/t/p/original"

const playNowURL = baseURL + playNow + key + API_KEY + '&language=en-US' + '&page=1&limit=5';
// https://api.themoviedb.org/3/trending/movie/week?api_key=49862386b331dabcc0cd47526a47f3dc&language=en-US&&page=1&limit=5


// trending/movie/week?

const myThirdHeader = new Headers();
myThirdHeader.append("Authorization", popularID);

const thirdRequestOption = {
    method: "GET",
    headers: myThirdHeader
}

fetch( playNowURL, thirdRequestOption )
    .then(res => {
        return res.json();
    })
    .then(result => {
        console.log(result);
        const trendingDatas = result.results
        trendingDatas.forEach(
            trendingData => {
                if ( trendingData.poster_path == null ) {
                    return;
                };
                const trendingContainer = document.querySelector('#nowPlaying');
                trendingContainer.classList.add('swiper-wrapper');
                const trendingItem = document.createElement('div');
                trendingItem.classList.add('swiper-slide');
                trendingItem.classList.add('now-playing');
                const trendingImage = document.createElement('img');
                trendingImage.src = posterOrginalSize + trendingData.poster_path;
                const trendingInfo = document.createElement('div');
                trendingInfo.classList.add('now-playing-info');
                const trendingTitle = document.createElement('h1');
                trendingTitle.classList.add('now-playing-title');
                const trendingDesc = document.createElement('p');
                trendingDesc.classList.add('now-playing-desc');
                const playButton = document.createElement('button');
                playButton.classList.add('now-playing-button')
                const overlay = document.createElement('div');
                overlay.classList.add('overlay');
                const detailButton = document.createElement('button');
                detailButton.classList.add('now-playing-button')

                let id = trendingData.id
                // const link = document.createElement('a');
                // link.href = 'https://api.themoviedb.org/3/movie/843794/videos?&api_key=49862386b331dabcc0cd47526a47f3dc'
                detailButton.innerText = 'More Details'
                detailButton.addEventListener(
                    'click',
                    () => {
                        window.location = `details.html?id=${trendingData.id}`
                    }
                );
                playButton.innerText = 'Play Trailer';
                playButton.addEventListener(
                    'click',
                    () => {
                        openNav(id);
                    }
                );
                trendingDesc.innerText = trendingData.overview;
                trendingTitle.innerText = trendingData.title

                trendingInfo.append(trendingTitle);
                trendingInfo.append(trendingDesc);
                trendingInfo.append(detailButton);
                trendingInfo.append(playButton);
                trendingItem.append(trendingImage);
                trendingItem.append(trendingInfo);
                trendingItem.append(overlay);
                
                trendingContainer.append(trendingItem)
        }); 
            
    })
    .then(err => {
        console.log(err);
    })


const overlayContent = document.querySelector('.overlay-content');
const videoContainer = document.createElement('div');

const details = "movie/";

function openNav(id) {
    fetch( baseURL + details + id + '/videos?' + key + API_KEY )
        .then(res => {
            return res.json()
        })
        .then(result => {
            console.log(result);
            const results = result.results
            if ( result ) {
                document.getElementById("myNav").style.width = "100%";
            } if ( results.length > 0 ) {
                results.forEach(
                    result => {
                        const {name, key, site} = result;
                        if (site == 'YouTube') {
                            const iFrame = document.createElement('iframe');

                            iFrame.src = `https://www.youtube.com/embed/${key}`;
                            iFrame.title = name;
                            iFrame.classList.add('embed');
                            iFrame.frameborder = '0';
                            iFrame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                            iFrame.allowfullscreen = true;
                            iFrame.width = '750';
                            iFrame.height = '450';

                            videoContainer.append(iFrame);
                            overlayContent.append(videoContainer);
                        }
                    }

                    
                )
                
                showVideos()
            }
            
        })

}
  
  /* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
    videoContainer.innerText = '';
}

const showVideos = () => {
    const embed = document.querySelectorAll('.embed');
    embed.forEach(
        (el, index) => {
            if ( index == 0) {
                el.classList.add('show');
                el.classList.remove('hide');
            } else {
                el.classList.add('hide');
                el.classList.remove('show');
            }
        }

    );
};


// SEARCH FUNCTION

const search = "search/multi?";
const query = '';
const searchID = `Client-ID ${API_KEY}`;
const searchURL = baseURL + search + key + API_KEY + '&language=en-US';

const searchHeader = new Headers();
searchHeader.append("Authorization", searchID);

const searchRequestOption = {
    method: "GET",
    headers: searchHeader
}

// https://api.themoviedb.org/3/search/multi?api_key=49862386b331dabcc0cd47526a47f3dc&language=en-US&query=batman

const form = document.querySelector('#search-form');
const input = document.querySelector('.search');
const searchButton = document.querySelector('#submit-btn');
const searchResults = document.querySelector('#searchResults');
const searchGrid = document.querySelector('#searchGrid');
const resultTitle = document.querySelector('#resultTitle');

// to be empty after search
const bannerEmpty = document.querySelector('#banner');
const popularEmtpy = document.querySelector('#popular');
const latestEmpty = document.querySelector('#latest');
const slideBtnEmtpy = document.querySelector('#slideBtn');
const paginationEmtpy = document.querySelector('#pages');
const topRatedEmpty = document.querySelector('#topRated')
const upcomingEmepty = document.querySelector('#upcoming')



searchButton.addEventListener(
    'click',
    (e) => {
        e.preventDefault();
        if ( input.value == '' ) {
            return;
        }

        const term = input.value;
        const queryTerm = '&query=' + term;
        const queryURL = searchURL + queryTerm;

        fetch( queryURL, searchRequestOption )
            .then(res => {
                return res.json();
            })
            .then(result => {
                console.log(result);
                const resultDatas = result.results
                searchGrid.replaceChildren();

                const notFound = document.createElement('p');
                notFound.innerText = 'NOT FOUND'
                notFound.classList.add('not-found');

                if ( resultDatas.length === 0) {
                    resultTitle.innerText = `Results for "${term}" is not found please search with the correct movie title`;
                    searchGrid.style.display = 'flex';
                    searchGrid.style.justifyContent = 'center';
                    searchGrid.style.alignItems = 'center';
                    searchGrid.style.minHeight = '650px';
                    searchGrid.append(notFound);
                } else {
                    searchGrid.style.display = 'grid';
                    resultTitle.innerText = `Results for "${term}"`;
                }

                resultDatas.forEach(
                    resultData => {
                        if ( resultData.poster_path == null ) {
                            return;
                        };
                        
                        const searchItems = document.createElement('div');
                        const image = document.createElement('img');

                        searchItems.classList.add('search-items')
                        image.src = posterBaseURL + resultData.poster_path;
                        searchItems.append(image);
                        
                        searchItems.addEventListener(
                            'click',
                            () => {
                                window.location = `details.html?id=${resultData.id}`
                            }
                        );
                        searchGrid.append(searchItems)
                    });
                bannerEmpty.innerText = '';
                topRatedEmpty.innerText = '';
                upcomingEmepty.innerText = '';
                popularEmtpy.innerText = '';
                latestEmpty.innerText = '';
                paginationEmtpy.innerText = '';
                slideBtnEmtpy.innerText = '';
            })
            .then(err => {
                console.log(err);
            })
        
        input.value = '';  
    }
);