window.onload = displayHome;
var slide_index = 0;

function displayHome() {
    var home_section = document.getElementById('home-section');
    var search_section = document.getElementById('search-section');
    loadHomeBox('home-movie', '/app/home/movie');
    loadHomeBox('home-tv', '/app/home/tv');
    home_section.style.display = 'block';
    search_section.style.display = 'none';
}

function displaySearch() {
    var home_section = document.getElementById('home-section');
    var search_section = document.getElementById('search-section');
    home_section.style.display = 'none';
    search_section.style.display = 'block';
}

function showSlides(box, jsonObj) {
    var home_box = document.getElementById(box);
    var slides = home_box.getElementsByClassName('mySlides');
    for (let i = 0; i < slides.length; i++) { // hide everything at the beginning
        slides[i].style.display = 'none';
    }
    slide_index++;
    if(slide_index > slides.length) {slide_index = 1}
    if(box == 'home-movie') {
        slides[slide_index - 1].getElementsByTagName('img')[0].setAttribute('src', 'https://image.tmdb.org/t/p/w780' + jsonObj[slide_index - 1]['backdrop_path']);
        slides[slide_index - 1].getElementsByTagName('div')[0].innerText = jsonObj[slide_index - 1]['title'] + '(' + jsonObj[slide_index - 1]['release_date'] + ')';
    }
    else {
        slides[slide_index - 1].getElementsByTagName('img')[0].setAttribute('src', 'https://image.tmdb.org/t/p/w780' + jsonObj[slide_index - 1]['backdrop_path']);
        slides[slide_index - 1].getElementsByTagName('div')[0].innerText = jsonObj[slide_index - 1]['name'] + '(' + jsonObj[slide_index - 1]['first_air_date'] + ')';
    }
    
    slides[slide_index - 1].style.display = 'block';
    setTimeout(function(){showSlides(box, jsonObj)}, 4000);
}

function loadHomeBox(box, route_path) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var res_ls = JSON.parse(this.responseText);
            showSlides(box, res_ls);
        }
    };
    xhttp.open('GET', route_path, true);
    xhttp.send();
}