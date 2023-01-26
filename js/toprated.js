// TOP RATED DISPLAY
const baseURL = "https://api.themoviedb.org/3/";
const key = "api_key=";
const API_KEY = "49862386b331dabcc0cd47526a47f3dc";
const ID = `Client-ID ${API_KEY}`;
// const popularURL = baseURL + popular + key + API_KEY + '&language=en-US';
// https://api.themoviedb.org/3/movie/popular?api_key=49862386b331dabcc0cd47526a47f3dc

const posterBaseURL = "https://image.tmdb.org/t/p/w500"

const topRated = "movie/top_rated?"
const topRatedURL = baseURL + topRated + key + API_KEY + '&language=en-US';

const topRatedHeader = new Headers();
topRatedHeader.append("Authorization", ID);

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
        const Datas = result.results
        Datas.forEach(
            Data => {
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
                rating.classList = 'rating' + ' ' + getColor(Data.vote_average);
                overview.classList.add('overview');
                overviewTitle.classList.add('overview-title');

                image.src = posterBaseURL + Data.poster_path;
                rating.innerText = ifNotDecimal(Data.vote_average);
                overviewTitle.innerText = Data.title;
                overviewDesc.innerText = Data.overview;

                link.href = `details.html?id=${Data.id}`

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

const pageButtons = document.querySelectorAll('.page-buttons');
let lastClicked;

pageButtons.forEach(
    pageButton => {
        pageButton.style.background = '';
        pageButton.addEventListener(
            'click',
            (e) => {
                const page = '&page=' + e.target.value;
                const pagesURL = topRatedURL + page;
                // // https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2023-01-20&primary_release_date.lte=2023-01-20&api_key=49862386b331dabcc0cd47526a47f3dc&page=1 or any value
                const scrollUp = document.querySelector('#latest');
                window.location = '#latest';
                if ( lastClicked ) {
                    lastClicked.style.backgroundColor = '';
                }
                e.target.style.backgroundColor = '#a82f43';
                lastClicked = e.target;

                fetch( pagesURL, topRatedRequestOption )
                    .then(res => {
                        return res.json();
                    })
                    .then(result => {
                        console.log(result);
                        const Datas = result.results
                        latestGrid.replaceChildren();
                        setTimeout(
                            Datas.forEach(
                                Data => {
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
                                    rating.classList = 'rating' + ' ' + getColor(Data.vote_average);
                                    overview.classList.add('overview');
                                    overviewTitle.classList.add('overview-title');
    
                                    image.src = posterBaseURL + Data.poster_path
                                    rating.innerText = ifNotDecimal(Data.vote_average);
                                    overviewTitle.innerText = Data.title;
                                    overviewDesc.innerText = Data.overview

                                    link.href = `details.html?id=${Data.id}`

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

const form = document.querySelector('#search-form');
const input = document.querySelector('.search');
const searchButton = document.querySelector('#submit-btn');
const searchResults = document.querySelector('#searchResults');
const searchGrid = document.querySelector('#searchGrid');
const resultTitle = document.querySelector('#resultTitle');

// to be empty after search
const empty = document.querySelector('#latest');
const pagesEmpty = document.querySelector('#pages');

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
                    resultTitle.innerText = `Results for "${term}" is not found please search with the correct word`;
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
                empty.innerText = '';
                pagesEmpty.innerText = '';
            })
            .then(err => {
                console.log(err);
            })
        input.value = '';  
    }
);