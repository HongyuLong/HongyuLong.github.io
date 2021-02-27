//document.innerHTML = displayHome();
// var root = document.createElement('div');
// // top part
// var top_part = document.createElement('div');
// top_part.className = "top-container";
// root.appendChild(top_part);

// // left part
// var left_part = document.createElement('div');
// left_part.className = "left-container";
// var bnt_home = document.createElement('button');
// bnt_home.textContent = "Home";
// bnt_home.onClick = displayHome();

// var bnt_search = document.createElement('button');
// bnt_search.textContent = "Search";
// bnt_search.onClick = displaySearch();
// left_part.appendChild(bnt_home);
// left_part.appendChild(bnt_search);
// root.appendChild(left_part);

// // right part
// var home_section = document.createElement('div');
// home_section.className = "right-container";
// home_section.innerHTML = "HOME";

// var search_section = document.createElement('div');
// search_section.className = 'right-container';
// search_section.innerHTML = "SEARCH";
// root.appendChild(home_section);
// root.appendChild(search_section);
// var home_section = document.getElementById('home-section');
// var search_section = document.getElementById('search-section');
// home_section.style.display = 'block';
// search_section.style.display = 'none';
//displayHome();
//loadHomeBox('home-movie', '/app/home/movie');
window.onload = displayHome;
var slide_index = -1;

function displayHome() {
    var home_section = document.getElementById('home-section');
    var search_section = document.getElementById('search-section');
    loadHomeBox('home-movie', '/app/home/movie');
    home_section.style.display = 'block';
    search_section.style.display = 'none';
}

function displaySearch() {
    var home_section = document.getElementById('home-section');
    var search_section = document.getElementById('search-section');
    home_section.style.display = 'none';
    search_section.style.display = 'block';
}

function display_sliding_window(box, jsonObj) {
    var home_box = document.getElementById(box);
    var slides = home_box.getElementsByClassName('slide');
    for (let i = 0; i < slides.length; i++) { // hide everything at the beginning
        slides[i].style.display = 'none';
    }
    slide_index = (slide_index + 1) % slides.length;
    //if(slide_index == slides.length) { slide_index = 1;}
    slides[slide_index].getElementsByTagName('img')[0].setAttribute('src', 'https://image.tmdb.org/t/p/w780' + jsonObj[slide_index]['backdrop_path']);
    //slides[slide_index].getElementsByTagName('img')[0].src = 'https://image.tmdb.org/t/p/w780' + jsonObj[slide_index]['backdrop_path'];
    //slides[slide_index].getElementsByTagName('p')[0].textContent = jsonObj[slide_index]['title'] + '(' + jsonObj[slide_index]['release_date'];
    slides[slide_index].getElementsByTagName('p')[0].setAttribute('textContent', jsonObj[slide_index]['title'] + '(' + jsonObj[slide_index]['release_date']);
    slides[slide_index].style.display = 'block';
    setTimeout(function(){display_sliding_window(box, jsonObj)}, 4000);
}

function loadHomeBox(box, route_path) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var res_ls = JSON.parse(this.responseText);
            display_sliding_window(box, res_ls);
        }
    };
    xhttp.open('GET', route_path, true);
    xhttp.send();
}