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

### 개선이 필요한 사항

- 뒤로가면 데이터가 사라지는 현상 수정 필요
- 수정한 후에 새로고침하면 전에 location.state 값이 setMyBook 되면서 전에 데이터가 표현됨
  수정된 데이터로 나타나게 만들기
- 최신등록순과 제목별로 나오게 설정
- 페이지 네이션
- 디자인 수정

- 카카오 api 로 추가한 도서는 책 데이터 수정하지 못하게 만들기
- 유효성 검사(등록 및 수정)
- 상태에 따라 책 다르게 나오게 설정
