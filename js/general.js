$(function () {
  function getgenre(gen, box, slideID) {
    let getGenres = [];
    $.ajax({
      url: 'https://yts.mx/api/v2/list_movies.json?genre=' + gen + '&page=1&limit=15',
      success: function (data) {
        // console.log(data);
        for (let i = 0; i < data.data.movies.length; i++) {
          let genreHTML = `
                                  <div class="slide-box">
                                    <a href="/movie_api/genre/detail.html?id=${data.data.movies[i].id}">
                                      <div>
                                        <img src="${data.data.movies[i].medium_cover_image}" alt="" onError="this.src='/movie_api/img/replace.jpg';"/>
                                        <div class="slider-tit">
                                          <h3 class="movie_title">${data.data.movies[i].title}</h3>
                                          <p class="rating">Rating : 8.0${data.data.movies[i].rating}</p>
                                        </div>
                                      </div>
                                      </a>
                                  </div>
        
                        `;
          getGenres += genreHTML;
        }
        $(box).append(getGenres);
        
        // lightslide
          $(slideID).lightSlider({
            item: 5,
            slideMove: 1,
            auto: true,
            loop: true,
            speed: 400,
            responsive : [
            {
                breakpoint:800,
                settings: {
                    item:4,
                    slideMove:1,
                    slideMargin:6,
                  }
            },
            {
                breakpoint:480,
                settings: {
                    item:2,
                    slideMove:1
                  }
            }
        ]
          });
      
        // success function end
      }
    });
  }

  let getGenres = ['all', 'comedy', 'sci-fi', 'horror', 'romance', 'action', 'thriller', 'drama', 'mystery', 'crime', 'animation', 'adventure', 'fantasy'];

  for (let i = 0; i < getGenres.length; i++){
    getgenre(getGenres[i], '.' + getGenres[i] + '-contents', '#'+getGenres[i] + 'Slide');
  }

  // click event
  $(".category ul li").click(function (e) {
    $(".category ul li").removeClass("action");
    $(this).toggleClass("action");

    if (this.innerText == "ALL") {
      $('.genre_cate').show();
    } else {
      let index = $(this).index();
      $('.genre_cate').hide();
      $('.genre_cate').eq(index).show();
    }
  });

  // loading...
    $(document).ajaxComplete(function () {
    $(".loading").hide();
  });
});