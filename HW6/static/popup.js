function load_details(info, modal_content, media_type) {
    // 1. img
    var img = document.createElement('img');
    if(info['backdrop_path'] == null) {
        img.src = 'https://cinemaone.net/images/movie_placeholder.png';
    }
    else {
        img.src = 'https://image.tmdb.org/t/p/w780' + info['backdrop_path'];
    }
    modal_content.appendChild(img);

    // 2. title line
    var title = document.createElement('div');
    //title.className = ;
    title.classList.add('common-pop', 'pop-title');
    title.innerHTML = info['title'] + '  ';
    var icon = document.createElement('a');
    icon.className = 'pop-icon';
    if(media_type == 'movie') {
        icon.href = 'https://www.themoviedb.org/movie/' + info['id'];
    }
    else {
        icon.href = 'https://www.themoviedb.org/tv/' + info['id'];
    }
    icon.innerHTML = '&#9432;';
    icon.target = '_blank';
    title.appendChild(icon);
    modal_content.appendChild(title);

    // 3. date genres
    var date_genres = document.createElement('div');
    date_genres.className = 'common-pop';
    date_genres.innerHTML = info['date'] + ' | ' + info['genres'];
    modal_content.appendChild(date_genres);

    // 4. rating
    var rating = document.createElement("div");
    rating.className = "common-pop";
    var rating_ave = document.createElement("span");
    rating_ave.style = "color: #a22319;";
    rating_ave.textContent = '\u2605' + " " + info['vote_average'] / 2 + "/" + "5 ";
    rating.appendChild(rating_ave);

    var rating_votes = document.createElement("sup");
    rating_votes.textContent = info['vote_count'] / 1 + " votes";
    rating.appendChild(rating_votes);
    modal_content.appendChild(rating);

    // 5.overview
    var overview = document.createElement('div');
    overview.classList.add('overlines', 'common-pop')
    content_overview = info['overview'];
    if(content_overview == '') {
        content_overview = 'N/A';
    }
    overview.innerHTML = content_overview;
    modal_content.appendChild(overview);

    // 6. spoken languages
    var spoken = document.createElement('div');
    //spoken.className = 'common-pop';
    spoken.classList.add('pop-spoken', 'common-pop');
    spoken.innerHTML = 'Spoken languages: ' + info['spoken'];
    modal_content.appendChild(spoken);
}

function load_credits(info, modal_content) {
    var cast_header = document.createElement('div');
    cast_header.classList.add('pop-title', 'common-pop');
    cast_header.innerHTML = 'Cast';
    modal_content.appendChild(cast_header);

    var casts = info['credits'];
    var i;
    var cast_line1 = document.createElement('div');
    cast_line1.className = 'casts-line';
    for(i = 0; i < casts.length && i < 4; ++i) {
        var cast_box = document.createElement('div');
        cast_box.className = 'cast-box';
        var img = document.createElement('img');
        if(casts[i]['profile_path'] == null) {
            img.src = 'https://cinemaone.net/images/movie_placeholder.png';
        }
        else {
            img.src = 'https://image.tmdb.org/t/p/w185' + casts[i]['profile_path'];
        }
        cast_box.appendChild(img);

        var cast_name = document.createElement('div');
        cast_name.innerHTML = '<b>' + casts[i]['name'] + '</b>';
        cast_box.appendChild(cast_name);

        var cast_character = document.createElement('div');
        cast_character.innerHTML = 'AS' + '<br>' + casts[i]['character'];
        cast_box.appendChild(cast_character);
        cast_line1.appendChild(cast_box);
    }
    modal_content.appendChild(cast_line1);

    var cast_line2 = document.createElement('div');
    cast_line2.className = 'casts-line';
    for(; i < casts.length && i < 8; ++i) {
        var cast_box = document.createElement('div');
        cast_box.className = 'cast-box';
        var img = document.createElement('img');
        if(casts[i]['profile_path'] == null) {
            img.src = 'https://cinemaone.net/images/movie_placeholder.png';
        }
        else {
            img.src = 'https://image.tmdb.org/t/p/w185' + casts[i]['profile_path'];
        }
        cast_box.appendChild(img);

        var cast_name = document.createElement('div');
        cast_name.innerHTML = '<b>' + casts[i]['name'] + '</b>';
        cast_box.appendChild(cast_name);

        var cast_character = document.createElement('div');
        cast_character.innerHTML = 'AS' + '<br>' + casts[i]['character'];
        cast_box.appendChild(cast_character);
        cast_line2.appendChild(cast_box);
    }
    //alert('i:' + i);
    modal_content.appendChild(cast_line2);
    

}

function load_reviews(info, modal_content) {
    var review_header = document.createElement('div');
    review_header.innerHTML = 'Reviews';
    review_header.classList.add('common-pop', 'pop-title');
    modal_content.appendChild(review_header);

    var reviews = info['reviews'];
    for(var i in reviews) {
        var one_review = document.createElement('div');
        one_review.className = 'common-pop';

        // 1. username and date
        var name_date = document.createElement('div');
        var user_name = document.createElement('span');
        user_name.innerHTML = reviews[i]['username'];
        user_name.style = "font-family: 'Raleway', sans-serif;font-weight:bold;";
        var comment_date = document.createElement('span');
        comment_date.style = "font-family: 'Raleway', sans-serif";
        comment_date.innerHTML = ' on ' + reviews[i]['created_at'];
        name_date.appendChild(user_name);
        name_date.appendChild(comment_date);
        one_review.appendChild(name_date);

        var rate_review = document.createElement('div');
        rate_review.style = "margin-top: 15px; margin-bottom: 15px;";
        // 2. rating
        if(reviews[i]['rating'] != null) {
            var rating = document.createElement("div");
            rating.style = "color: #a22319";
            rating.textContent = '\u2605' + " " + reviews[i]['rating'] / 2 + "/" + "5 ";
            rate_review.append(rating);
        }
        // 3. review content
        var review_content = document.createElement('div');
        review_content.className = 'overlines';
        review_content.innerHTML = reviews[i]['content'];
        rate_review.appendChild(review_content);
        one_review.append(rate_review);

        // 4. end line
        var end_line = document.createElement('hr');
        end_line.className = 'end-line';
        
        one_review.appendChild(end_line);

        modal_content.appendChild(one_review);
    }
}

function show_more(media_id, media_type) {
    //alert(media_id);
    //alert('click success!');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            if(document.getElementById(media_id + '-' + media_type) == null) {
                var info = JSON.parse(this.responseText);
                var search_results = document.getElementById('search-results');
                var modal = document.createElement("div");
                modal.id = media_id + '-' + media_type;
                modal.className = 'modal';
                modal.style.display = 'block';
                var modal_content = document.createElement('div');
                modal_content.className = 'modal-content';
                var close_btn = document.createElement('span');
                close_btn.className = 'close';
                close_btn.innerHTML = "&times";
                close_btn.addEventListener('click', function(){
                    modal.style.display = 'none';
                });
                modal_content.appendChild(close_btn);
                // load details, credits, reviews
                load_details(info, modal_content, media_type);
                load_credits(info, modal_content);
                load_reviews(info, modal_content);

                modal.appendChild(modal_content);
                search_results.appendChild(modal);
            }
            else {
                document.getElementById(media_id + '-' + media_type).style.display = 'block';
            }
        }
    };
    let request_url = '/app/search/popup' +  '?media_id=' + media_id + '&media_type=' + media_type;
    xhttp.open('GET', request_url, true);
    xhttp.send();
}