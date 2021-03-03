$(function () {
  let currentPage = 0;
  const pageNumLength = $(".numBtns button.pageNum").length;
  function getData(page) {
    let getDatas =[];
    $.ajax({
      url: 'https://yts.mx/api/v2/list_movies.json?sort_by=year&order_by=desc&genre=sci-fi&limit=10&page=' + page,
      success: function (data) {
        console.log(data);
        for(let i = 0; i < data.data.movies.length; i++){
          if(data.data.movies[i].title == ''){
            data.data.movies[i].title = 'No Title';
          }
          let recentHTML = `<div class="recent-movie-wrap">
                              <a href="${data.data.movies[i].url}" target="_blank">                         
                                <div class="recent-movies">
                                  <div class="movie-img">
                                  <img src="${data.data.movies[i].medium_cover_image}" alt="" />
                                  </div>
                                  <h3 class="movie-title">${data.data.movies[i].title}</h3>
                                  </div>
                              </a> 
                            </div>`;
          getDatas += recentHTML;
        }
        $(".container").append(getDatas);
      }
    });
    currentPage = page;
  }
  $(".numBtns button.pageNum").click(function () {
    let btnValue = Number($(this).attr("value"));
    $(".recent-movie-wrap").remove();
    $(".loading").show();
    getData(btnValue);

    let btnIdx = $(this).index();
    $(".numBtns button").removeClass("active");
    $(".numBtns button").eq(btnIdx).addClass("active");
  });

  function goToPrevNext(a, b) {
    if (currentPage == a) {
      return false
    } else {
      $(".recent-movie-wrap").remove();
      getData(b);
      $(".loading").show();
      $(".numBtns button").removeClass("active");
      $(".numBtns button").eq(currentPage).addClass("active");
    }
  }

  $(".numBtns button.prev").click(function () {
    goToPrevNext(1, currentPage - 1)
  });

  $(".numBtns button.next").click(function () {
    goToPrevNext(pageNumLength, currentPage + 1)
  });

  $(".numBtns button").eq(1).trigger("click");
  
  // getData(1);

  $(document).ajaxComplete(function () {
    $(".loading").hide();
  });
});