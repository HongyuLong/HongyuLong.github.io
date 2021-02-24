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

function displayHome() {
    var home_section = document.getElementById("home-section");
    var search_section = document.getElementById("search-section");
    loadHome();
    home_section.style.display = "block";
    search_section.style.display = "none";
}

function displaySearch() {
    var home_section = document.getElementById("home-section");
    var search_section = document.getElementById("search-section");
    home_section.style.display = "none";
    search_section.style.display = "block";
}

function loadHome() {
    var xhttp = new XMLHttpRequest();
    var home_section = document.getElementById("home-section");
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            home_section.innerHTML = "<p style='color: white;'>" + result.name + "<p>";
        }
    };
    xhttp.open("GET", "http://127.0.0.1:5000/app/home", true);
    xhttp.send();
}