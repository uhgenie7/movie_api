     $(function () {
        function searchMovie() {
          let searchResult = $(".searchInput").val();
          if (!searchResult) {
            alert("검색어를 입력해주세요");
            return false;
          }
          location.href = "/movie_api/search.html?key=" + searchResult;
        }
        $(".sendBtn").click(function () {
          searchMovie();
        });

        // press enter
        document.addEventListener("keydown", function (e) {
          const keyCode = e.keyCode;
          if (keyCode == 13) {
            searchMovie();
          }
        });
      });