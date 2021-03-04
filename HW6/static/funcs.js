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

    document.getElementById('search-button').onclick = function(event) {
        //alert("Click Search Submit Now!")
        event.preventDefault();  // prevent the page from refreshing
        load_search_results();
    };
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


function load_search_results() {
    let my_select = document.getElementById("category");
    let select_idx = my_select.selectedIndex;

    let my_input = document.getElementById("keyword");
    if(select_idx == 0 || my_input.value.length == 0) {
        alert("Please enter valid values.")
    }
    else {
        let options = my_select.options;
        var cat_type = options[select_idx].value;
        let keyword = encodeURIComponent(my_input.value);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                var res_ls = JSON.parse(this.responseText);
                
            }
        };
        let request_url = '/app/search/cards' +  '?key=' + keyword + '&cat=' + cat_type;
        xhttp.open('GET', request_url, true);
        xhttp.send();
    }
}