$(function () {
  // detail ajax
  let detailID = document.location.href.split("=")[1];
      $.ajax({
          url: "https://yts.mx/api/v2/movie_details.json?movie_id=" + detailID,
          success: function (detailData) {
            let detailTitle = `${detailData.data.movie.title}`;
            $(".header_title").append(detailTitle);
            let detailMovie = `
                          <div class="movieImg">
                              <img src="${detailData.data.movie.medium_cover_image}" alt="" onError="this.src='/movie_api/img/replace.jpg';" />
                            </div>
                            <div class="movieTxt">
                              <h2 class="movieTitle">${detailData.data.movie.title_long}</h2>
                              <h3 class="movieGenre"><span>장르:</span> ${detailData.data.movie.genres.join(', ')}</h3>
                              <h3><span>시놉시스:</span> </h3>
                              <p class="movieDes">${detailData.data.movie.description_full}</p>
                              <h3 class="movieRate"><span>평점:</span> ${detailData.data.movie.rating}</h3>
                              <h3><span>좋아요:</span> ${detailData.data.movie.like_count}</h3>
                            </div>
                        `;
                        $(".mainTitle").append(detailMovie);
          }
      });
  
  // all genre ajax
    function getgenre(gen, box, slideID) {
    let getGenres = [];
    $.ajax({
    url: 'https://yts.mx/api/v2/list_movies.json?genre='+gen+'&page=1&limit=15',
    success: function (data) {
      // console.log(data);
      for (let i = 0; i < data.data.movies.length; i++){
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
        }
    });
  }
  getgenre('all', '.all-contents', '#allSlide');
  
  // loading
      $(document).ajaxComplete(function () {
      $(".loading").hide();
    });
  });