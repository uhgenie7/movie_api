      $(function () {
        let searchValue = document.location.href.split("=")[1];
        let decodeValue = decodeURI(searchValue);
        // decodeURI 함수: 인코드를 디코드 해줌 ex 깨지는 한글을 처리.
        console.log(decodeValue);
        $.ajax({
          type: "POST",
          url: "/movie_api/data/api.php",
          data: {
            // key 값은 꼭 data여야 함
            search_value: decodeValue,
          },
          success: function (data) {
            let obj = JSON.parse(data);
            console.log(obj);
            if (obj.items.length == 0) {
              alert("데이터가 없습니다");
              location.href = "/movie_api/index.html";
            }
            // 데이터가 적을 때 예외처리
            if (obj.items.length > 4) {
              $('.bg').remove();
            }
            let itemContents = [];
            $.each(obj.items, function (i, item) {
              // console.log(i, item.title);
              
              let itemHTML = `<div class="movie_box">
                                <div class="movie_img">
                                  <img src="${item.image}" alt="" />
                                </div>
                                <div class="movie_content">
                                  <h2 class="main_title">${item.title} (${item.pubDate})</h2>
                                  <h3 class="sub_title">${item.subtitle}</h3>
                                  <p>감독: ${item.director.replace(/\|/gi, " ")}</p>
                                  <p>출연 배우: ${item.actor.replace(/\|/gi, " ")}</p>
                                  <p class="rate">평점: ${item.userRating}</p>
                                  <button type="button" class="linkBtn" onClick="location.href='${item.link}'">바로가기</button>
                                </div>
                                
                              </div>`;
              itemContents.push($(itemHTML).get(0));
              // console.log(itemContents);
            });
            $(".searchWrap").append(itemContents);
          },
        });
      });