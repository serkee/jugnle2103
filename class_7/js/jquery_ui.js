$(function(){
    //인풋에 키누름(keypress) 이벤트 정의
    $(".input_area > input[type='text']").keypress(function(event){
        //엔터키코드(13)일경우와 인풋에 값이 있을때 실행되는 조건문
        if(event.keyCode == 13 && $(this).val().length != 0){
            var _val = $(this).val();//입력중인 값을 담는 변수
            var _time; //입력되는 순간의 시간을 담는 변수
            var _class = $(this).attr("class");

            //현재 시간 구하기
            var _date = new Date(); //Date객체(pc의 전체시간정보)
            var _hh = _date.getHours(); //Date객체에서 시간을 구함
            var _mm = _date.getMinutes(); //Date객체에서 분을 구함
            var _apm = "오전"; //오전오후 구분하는 변수
            if(_hh > 12){ //만약 시간이 12이상일 경우
                _apm = "오후"; //오후로 변경
                _hh -= 12; //_hh = _hh - 12; //시간은 24 > 12시간 표현으로 변경
            }
            _time = _apm+" "+_hh+":"+_mm;

            //말풍선 태그를 append로 동적 추가
            $(".chat_area").append('<div class="item '+_class+'"><div class="box"><p class="msg">'+_val+'</p><span class="time">'+_time+'</span></div></div>');
            
            setTimeout(function(){//setTimeout으로 0.01초 후 호출 시킴(시간차 발생)
                $(".chat_area .item").addClass("on"); //item에 on클래스 추가(애니메이션 발생시키는 트리거)
            },10)
            //입력후 입력된 인풋의 값을 지워줌(초기화)
            $(this).val("");

            //채팅창 맨 밑으로 갈수 있게하는 스크롤 이벤트
            //var _itemL = $(".chat_area .item").length; //말풍선(item)의 갯수
            var _itemH = 0; //말풍선(item)들의 각 높이를 더해줄 변수
            
            //each라는 또다른 반복문 jquery선택자의 길이만큼 반복시킴
            $(".chat_area .item").each(function(idx){
                //this(말풍선) 길이를 _itemH에 누적 추가 + margin-top값 15px
                _itemH += $(this).height()+15;  //_itemH = _itemH + $(this).height();
            });
            
            //채팅창 영역에 스크롤 애니메이션 이벤트 발생시킴
            $(".chat_area").stop().animate({
                scrollTop:_itemH //위에서 계산한 말풍선 높이 총합만큼
            });
            
        }
    });
});