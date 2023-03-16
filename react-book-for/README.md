## react icons 사용

`npm install react-icons --save`

## fs

- fs 모듈은 file system으로 node.js환경에서 파일시스템에 접근, 사용할 수 있게 해 주는 npm 이다.

## path

- Path 모듈은 파일과 Directory 경로 작업을 위한 Utility를 제공한다.

### FormData

https://2ham-s.tistory.com/307

- ajax로 폼 전송을 가능하게 해주는 FormData 객체입니다.
- form을 제출하면 action 속성에 의해 지정한 페이지로 이동하면서 데이터를 전송합니다.
  ajax는 반대로 제출 버튼을 누르면 기본 폼 동작은 e.preventDefault() 로 멈추고, 페이지 전환 없이 데이터를 전송

## 개선이 필요한 사항

- 뒤로가면 데이터가 사라지는 현상 수정 필요
- 수정한 후에 새로고침하면 전에 location.state 값이 setMyBook 되면서 전에 데이터가 표현됨
  수정된 데이터로 나타나게 만들기

- 유효성 검사(등록 및 수정)
- 시간남으면 카카오 fetch로 책정보 가져오도록 변경하기

## 오류

### 3/12 페이지네이션 오류

- 맨앞으로 가기 버튼을 1~5 사이 아무 번호나 클릭 후에 클릭하면 데이터는 불러오지만
  css 변경이 안되는 오류 발생
  : 1~5번과 같이 숫자의 경우(div태그) css 변경 이벤트가 맨앞으로 가기에도 실행이 되는줄 알았지만
  알고보니 svg 태그라 따로 코드를 적어줘야 한다.

### 3/15

- pageNav 에서 앞,뒤 클릭시 reqDefault 필요없나?
- 읽는 중을 클릭한 후에 다른 카테고리를 클릭하면 페이지 만드는 부분에서 빈배열값만 나온다..
  다른 부분을 클릭했을때는 문제 없음
  => setReqDefault 를 다른 값들 없애고 state: ... 이것만 추가해서 문제가 생김
