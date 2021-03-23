var loadData; //json파일의 정보를 담기위한 전역 변수

$(function(){
    
    //첫 인트로 버튼 영역 실행
    introfn();

    //인트로 버튼 클릭 이벤트 정의
    $(".btn_setting").click(function(){
        $(".section.box_intro").removeClass("on");
        ajaxfn();
    });

    //자리선택 섹션의 완료 버튼 클릭 이벤트 정의
    $(".btn_submit").click(function(){
        $(".section.reservation").removeClass("on");
        $(".section.complete").addClass("on");
        //개발자가 서버에 내용 전달하는 과정을 담는 부분
        
    });
})

//첫 인트로 버튼 영역 함수 정의
function introfn(){
    
    $(".section.box_intro").addClass("on");
}

//ajax를 통해 json파일 불러온 후 append로 자리 셋팅하기 함수 정의
function ajaxfn(){
    $.ajax({
        url:"js/data.json",
        dataType:"json",
        success:function(result){
            //변수 저장
            loadData = result.seatInfo;

            //자리 셋팅(index(순번) : i - 0~11)
            for(var i=0; i<loadData.length; i++){
                var _n = loadData[i].name;
                var _p = loadData[i].price;
                var _r = loadData[i].reserve;

                $(".section.reservation > ol").append('<li class="unit"><button data-price="'+_p+'" '+_r+'>'+_n+'</button></li>')

            }
            //자리 선택 섹션 노출
            $(".section.reservation").addClass("on");

            //배열 선언 or 초기화
            var selected = [];

            //동적으로 셋팅된 버튼에 클릭 이벤트 선언
            $(".section.reservation > ol > li > button").click(function(){
                //배열 초기화
                selected = [];

                //자신에게 select유무에 따라 select클래스를 추가/삭제
                $(this).toggleClass("select");


                //자리 길이 만큼 for문 반복
                for(var i=0; i<loadData.length; i++){
                    //각각 자리별 버튼에 select 클래스가 있는지 확인 후 있으면 true, 없으면 false
                    var _has = $(".section.reservation > ol > li").eq(i).find("button").hasClass("select");
                    
                    //select클래스를 갖고 있다면 배열에 index값 저장
                    if(_has == true){
                        selected.push(i);
                    }
                }

                var selectedSeat = ""; //선택자리명 저장용 변수 선언과 초기화
                var selectedCost = 0; //선택값 총합 저장용 변수 선언과 초기화
                
                //저장된 인덱스를 활용한 하단 결과값 업데이트
                for(var i=0; i<selected.length; i++){
                    var _si = selected[i]; //선택된 index값만 저장
                    
                    //선택자리 누적(자기 자신에게 이전값과 새로운 값을 더함)
                    //selectedSeat = selectedSeat + loadData[_si].name + " ";
                    selectedSeat += loadData[_si].name + " ";

                    //총합 누적(자기 자신에게 이전값과 새로운 값을 더함)
                    //selectedCost = selectedCost + Number(loadData[_si].price);
                    selectedCost += Number(loadData[_si].price);
                }

                //선택정보를 html상 각 영역에 업데이트(text)
                $(".txt_info_number").text(selectedSeat);
                $(".txt_info_total").text(selectedCost);

                //최종 결과창의 선택정보를 html상 각 영역에 업데이트(text)
                $(".section.complete .txt_number").text(selectedSeat);
                $(".section.complete .txt_price > strong").text(selectedCost);
            });
        }
    })
}