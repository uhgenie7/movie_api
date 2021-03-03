$(function () {
  function getgenre(gen, box, slideID) {
  let getGenres = [];
  $.ajax({
    url: 'https://yts.mx/api/v2/list_movies.json?genre='+gen+'&page=1&limit=15',
    success: function (data) {
      console.log(data);
      for (let i = 0; i < data.data.movies.length; i++){
        let genreHTML = `
                                  <div class="slide-box">
                                    <div>
                                      <img src="${data.data.movies[i].medium_cover_image}" alt="" />
                                      <div class="slider-tit">
                                        <h3>${data.data.movies[i].title}</h3>
                                        <p class="rating">Rating : 8.0${data.data.movies[i].rating}</p>
                                      </div>
                                      <a href="/movie_api/genre/detail.html?id=${data.data.movies[i].id}">Details</a>
                                    </div>
                                  </div>
        
                        `;
                        getGenres += genreHTML;
          }
          $(box).append(getGenres);
        
        // slide
          $(slideID).lightSlider({
            item: 5,
            slideMove: 1,
            auto: true,
            loop: true,
            speed: 400,
          });  
        }
    });
  }

  getgenre('action', '.action-contents', '#actionSlide');
  getgenre('romance', '.romance-contents', '#romanceSlide');
  getgenre('drama', '.drama-contents', '#dramaSlide');

     
});