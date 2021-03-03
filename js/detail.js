$(function () {
    function getData(page) {
    let getDatas =[];
    $.ajax({
      url: 'https://yts.mx/api/v2/movie_details.json?movie_id=',
      success: function (data) {
        console.log(data);
        // for(let i = 0; i < data.data.movies.length; i++){
        //   if(data.data.movies[i].title == ''){
        //     data.data.movies[i].title = 'No Title';
        //   }
        //   let recentHTML = `<div class="recent-movie-wrap">
        //                       <a href="https://yts.mx/api/v2/movie_details.json?movie_id=${data.data.movies[i].id}"  target="_blank">                         
        //                         <div class="recent-movies">
        //                           <div class="movie-img">
        //                           <img src="${data.data.movies[i].medium_cover_image}" alt="" />
        //                           </div>
        //                           <h3 class="movie-title">${data.data.movies[i].title}</h3>
        //                           </div>
        //                       </a> 
        //                     </div>`;
        //   getDatas += recentHTML;
        // }
        // $(".container").append(getDatas);
      }
    });
    currentPage = page;
  }
});