class Book {
  Book({
    required this.title,
    required this.contents,
    required this.url,
    required this.isbn,
    required this.datetime,
    required this.authors,
    required this.publisher,
    required this.translators,
    required this.price,
    required this.sale_price,
    required this.thumbnail,
    required this.status,
  });

  final String title; // 도서 제목
  final String contents; // 도서 소개
  final String url; // 도서 상세 URL
  final String isbn; // ISBN10(10자리) 또는 ISBN13(13자리) 형식의 국제 표준 도서번호
  final DateTime
      datetime; // 도서 출판날짜, ISO 8601 형식 [YYYY]-[MM]-[DD]T[hh]:[mm]:[ss].000+[tz]
  final List<String> authors; // 도서 저자 리스트
  final String publisher; // 도서 출판사
  final List<String> translators; // 도서 번역자 리스트
  final int price; // 도서 정가
  final int sale_price; // 도서 판매가
  final String thumbnail; // 도서 표지 미리보기 URL
  final String status; // 도서 판매 상태 정보 (정상, 품절, 절판 등)

  factory Book.fromJson(Map<String, dynamic> json) {
    return Book(
      title: json['title'] ?? "null",
      contents: json['contents'] ?? "null",
      url: json['url'] ?? "null",
      isbn: json['isbn'] ?? "null",
      datetime:
          DateTime.parse(json['datetime'] ?? "2017-09-07T17:30:00.000+09:00"),
      authors: (json['authors'] as List<dynamic>?)
              ?.map((author) => author as String)
              .toList() ??
          [],
      publisher: json['publisher'] ?? "null",
      translators: (json['translators'] as List<dynamic>?)
              ?.map((translator) => translator as String)
              .toList() ??
          [],
      price: json['price'] as int? ?? 0,
      sale_price: json['sale_price'] as int? ?? 0,
      thumbnail: json['thumbnail'] ?? "null",
      status: json['status'] ?? "null",
    );
  }
}
