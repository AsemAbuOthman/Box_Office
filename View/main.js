
async function fetchData(){
    try{
        const res = await axios.get('http://localhost:8080/home.json');
        fillPageWithMainSections(res.data);
        
    }catch(err){
        console.log('Axios Error : ', err.res ? err.res.data : err.message);
    }
}

function showHideHeader(){

    console.log('showhide');
    
    let lastScrollTop = 0;

    $(window).on('scroll', function(){

        let currentScroll= $(this).scrollTop();

        if(currentScroll > lastScrollTop) {

            $('header').fadeOut();
        }else {

            $('header').fadeIn();

        }

        lastScrollTop = currentScroll;
    })
}


function currentSection(callback){


    $('#main-section1').on('mouseenter', function(){

        callback("1");
        
    })

    $('#main-section2').on('mouseenter', function(){

        callback("2");

    })

    $('#main-section3').on('mouseenter', function(){

        callback("3");

    })

    $('#main-section4').on('mouseenter', function(){

        callback("4");

    })

}

function slideBtnEffect(){

    console.log('slideBtnEffect');
    

    currentSection(function(section){
        
        let lastScrollLeft = 0;

        $(`#section${section}-right-btn`).on('click', function(){  
            $(`.media-post.s${section}`).animate({right: '101.5%'}, 750);
            $(this).animate({opacity: '0%'}, 750);
            $(`#section${section}-left-btn`).animate({opacity: '100%'}, 500);
        })
    
        $(`#section${section}-left-btn`).on('click', function(){
    
            $(`.media-post.s${section}`).animate({right: '0%'}, 750);
            $(this).animate({opacity: '0%'}, 750);
            $(`#section${section}-right-btn`).animate({opacity: '100%'}, 500);
            
        })

    });

}

function onHoverPost(){

    console.log('onHoverPost');


    $('.media-post').on('mouseenter', function (){

        $(this).css({
            transform: "scale(1.05)",
            transition: "transform 0.4s ease",
            boxShadow: "1px 1px 6px rgba(255, 255, 255, 0.18)",
            borderRadius: "0px"
        });
    })

    $('.media-post').on('mouseleave', function (){

        $(this).css({
            transform: "scale(1)",
            transition: "transform 0.4s ease",
            boxShadow: "",
            borderRadius: "3px"

        });
    })
}

function watchTrailer() {
    
    $(document).on('click', '.media-trailer-btn', function () {
        const trailerUrl = $(this).data('trailer-url');
        if (trailerUrl) {
            window.open(trailerUrl, '_blank');
        }
    });
}



function fillPageWithPostsOfSection(sectionID, sectionPosts){
    
    
    for(let post of sectionPosts){

        $(`#section${sectionID.toString()}`).append(`
                    <div class="media-post s${sectionID.toString()}">
                        <span class="media-poster-container">
                            <img class="media-poster" src="${post.poster_url}" loading="lazy" alt="${post.name}">
                        </span>
                        <span class="media-details">
                            <span class="media-rate">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="yellow" class="bi bi-star-fill" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                <span>${post.imdb_rating}</span>
                            </span>
                            <span class="media-quality">
                                ${post.quality}
                            </span>
                            <span class="media-year">
                                ${post.year}
                            </span>
                        </span>
                        <span class="media-title">
                            <p>
                                ${post.name}
                            </p>
                        </span>
                        <button class="media-watch-btn" id="w_${post.name}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                            </svg>
                            Watch now
                        </button>
                        <button class="media-trailer-btn" data-trailer-url="${post.trailerUrl}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-youtube" viewBox="0 0 20 16">
                                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
                            </svg>
                            Trailer
                        </button>
                    </div>`)

    }
}

function fillPageWithMainSections(sectionsPosts){

console.log('fillPageWithMainSections');


    let mainSections = ['Latest Movies', 'Latest TV Shows', 'Top IMDB', 'Upcoming Releases'];
    let counter = 1;

    for(let section of mainSections){

        
        $('main').append(`
            <div class="media-container" >
                <div class="section-title">
                    ${section}
                </div>
                <div class="main-container-section" id="main-section${counter}">
                    <div class="section-slide-container section-slide-container-left" id="section${counter}-left-btn">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                            </svg>
                        </button>
                    </div>
                    <div class="media-container-section" id="section${counter}">
                    </div>
                    <div class="section-slide-container section-slide-container-right" id="section${counter}-right-btn">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>`);
            fillPageWithPostsOfSection(counter, sectionsPosts[counter - 1]);                      

        counter++;
    }
    

    showHideHeader();
    onHoverPost();
    slideBtnEffect();
}


$(document).ready(function(){

    fetchData();
    watchTrailer();

})
