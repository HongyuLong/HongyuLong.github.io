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
                var items = JSON.parse(this.responseText);
                var search_results = document.getElementById('search-results');
                if(Object.keys(items).length == 0) {
                    search_results.innerHTML = 'No results found.'
                }
                else {
                    var show_results = document.createElement('div');
                    show_results.innerHTML = 'Showing results...';
                    search_results.appendChild(show_results);
                    var i;
                    for(i = 0; i < items.length; ++i) {
                        var item = items[i];
                        search_results.appendChild(display_card(item));
                    }
                }
            }
        };
        let request_url = '/app/search/cards' +  '?key=' + keyword + '&cat=' + cat_type;
        xhttp.open('GET', request_url, true);
        xhttp.send();
    }
}

function display_card(item) {
    var media_type = item['media_type']

    var card = document.createElement('div');
    card.className = 'card';

    // poster
    var card_left = document.createElement('div');
    card_left.className = 'card-left';
    var img = document.createElement('img');
    if(item['poster_path'] == null) {
        img.src = 'https://cinemaone.net/images/movie_placeholder.png';
    }
    else {
        img.src = "https://image.tmdb.org/t/p/w185" + item['poster_path'];
    }
    card_left.appendChild(img);
    card.appendChild(card_left);

    // description
    // 1. title
    var card_right = document.createElement('div');
    card_right.className = 'card-right';
    var h = document.createElement('H2');
    if(media_type == 'movie') {
        h.innerHTML = item['title'];
    }
    else {
        h.innerHTML = item['name'];
    }
    card_right.appendChild(h);
    // 2. date and genre
    var date_genre = document.createElement('div');
    date_genre.className = 'card-date-genre';

    var card_date = 'N/A';
    if(media_type == 'movie') {
        if(item['release_date'].length > 0) {
            card_date = item['release_date'];
        }
    }
    else {
        if(item['first_air_date'].length > 0) {
            card_date = item['first_air_date'];
        }
    }
    var genre = item['genre_ids'].length > 0 ? item['genre_ids'] : 'N/A';
    date_genre.innerHTML = card_date + ' | ' + genre;
    card_right.appendChild(date_genre);
    // 3. rates
    var rate = document.createElement('div');
    rate.className = 'card-rate';
    var vote_average = document.createElement('span');
    vote_average.textContent = '\u2605' + " " + item['vote_average'] / 2 + "/" + "5 ";
    rate.appendChild(vote_average);

    var vote_count = document.createElement('sup');
    vote_count.textContent = item['vote_count'] / 1 + ' votes';
    rate.appendChild(vote_count);
    card_right.appendChild(rate);

    // 4. overview
    var p = document.createElement('p');
    p.innerHTML = item['overview'] == "" ? 'N/A' : item['overview'];
    card_right.appendChild(p);

    // 5. show-more button
    var show_more_btn = document.createElement('button');
    show_more_btn.innerHTML = 'Show more';
    show_more_btn.addEventListener('click', function() {
        // pop up details
    });
    card_right.appendChild(show_more_btn);

    card.appendChild(card_right);
    return card;
}