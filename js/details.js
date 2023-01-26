// DETAILS 
const link = new URLSearchParams(window.location.search);
const movieID = link.get('id');

const baseURL = "https://api.themoviedb.org/3/";
const details = "movie/";
const key = "api_key=";
const API_KEY = "49862386b331dabcc0cd47526a47f3dc";
const detailsID = `Client-ID ${API_KEY}`;
const detailsURL = baseURL + details + movieID + 'videos?' + key + API_KEY + '&language=en-US';
const posterBaseURL = "https://image.tmdb.org/t/p/w500"

// https://api.themoviedb.org/3/movie/843794/videos?api_key=49862386b331dabcc0cd47526a47f3dc

const detailsHeader = new Headers();
detailsHeader.append("Authorization", detailsID);

const detailsRequestOption = {
    method: "GET",
    headers: detailsHeader
}

fetch( detailsURL, detailsRequestOption )
    .then(res => {
        return res.json();
    })
    .then(result => {
        console.log(result);
        const image = document.querySelector('.image');
        const title = document.querySelector('.title');
        const popularity = document.querySelector('.popularity');
        const overview = document.querySelector('.overview-desc');
        const date = document.querySelector('.date');
        const genre = document.querySelector('.genre');
        const duration = document.querySelector('.duration');

        const releaseDate = result.release_date
        const {wordDate} = formatDate(releaseDate)
        date.innerText = wordDate;
        
        genre.innerText = result.genres
        const genres = result.genres;
        genres.forEach(
            genr => {
                if(genres){
                    const genreNames = genres.map(genre => genre.name);
                    genre.innerText = genreNames.join(', ');
                }
            }
        );
        const durationHr = result.runtime / 60;
        duration.innerText = durationHr.toFixed(2) + runningTime(durationHr);
        overview.innerText = result.overview;
        image.src = posterBaseURL + result.poster_path;
        image.alt = result.title
        title.innerText = result.title;
        const rating = result.vote_average * 10;
        popularity.innerText = rating.toFixed(1) + `%`;
        popularity.classList = 'popularity' + ' ' + getColor(result.vote_average);

        const playButton = document.querySelector('.playButton');
        playButton.innerText = 'Play Trailer'
        playButton.addEventListener(
            'click',
            () => {
                openNav();
            }
        );
        
            
    })
    .then(err => {
        console.log(err);
    })

const formatDate = (releaseDate) => {
    try {
        const date = new Date(releaseDate);
        if(date.toString() === "Invalid Date") throw new Error("Invalid date string")
        const wordDate = date.toDateString();
        const numberDate = date.toLocaleDateString();
        return { wordDate, numberDate };
    } catch (error) {
        console.log(error.message)
    }
}

const runningTime = (durationHr) => {
    if ( durationHr >= 2 ) {
        return 'hrs'
    } else {
        return 'hr'
    }
}

const getColor = (vote_average) => {
    if ( vote_average >= 8 ) {
        return 'green'
    } else if ( vote_average >= 5 ) {
        return 'orange'
    } else {
        return 'red'
    }
}

const overlayContent = document.querySelector('.overlay-content');
const videoContainer = document.createElement('div');

function openNav() {
    fetch( baseURL + details + movieID + '/videos?' + key + API_KEY )
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

// SIMILAR MOVIES

const similar = `movie/${movieID}/similar?`;
const similarURL = baseURL + similar + key + API_KEY + '&language=en-US';
const similarID = `Client-ID ${API_KEY}`;
// https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>>&language=en-US

const similarHeader = new Headers();
similarHeader.append("Authorization", similarID);

const similarRequestOption = {
    method: "GET",
    headers: similarHeader
}


fetch( similarURL, similarRequestOption)
    .then(res => {
        return res.json();
    })
    .then(result => {
        console.log(result);
        const similarDatas = result.results
        similarDatas.forEach(
            similarData => {
                if ( similarData.poster_path == null ) {
                    return;
                };
                const similarGrid = document.querySelector('.similar-grid');
                const image = document.createElement('img');
                const imageBox = document.createElement('div');
                
                imageBox.classList.add('post-box');
                imageBox.append(image)
                image.src = posterBaseURL + similarData.poster_path
                imageBox.addEventListener(
                    'click',
                    () => {
                        window.location = `details.html?id=${similarData.id}`
                    }
                );
                
                similarGrid.append(imageBox)

        }); 
            
    })
    .then(err => {
        console.log(err);
    })


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
const similarMovies = document.querySelector('#similarMovies');
const bannerInfo = document.querySelector('#bannerInfo');


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
                similarMovies.innerText = '';
                bannerInfo.innerText = '';
            })
            .then(err => {
                console.log(err);
            })
        input.value = '';  
    }
);

