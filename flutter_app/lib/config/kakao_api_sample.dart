import 'dart:convert';

import 'package:flutter_app/model/kakao_book.dart';

import 'package:http/http.dart' as http;

String restApiKey = "";

Future<List<Book>?> loadBook([String? search]) async {
  String query = search ??= ".";
  if (search == "") query = ".";

  Map<String, String> headers = {
    "Authorization": "KakaoAK $restApiKey",
  };

  String jsonURL = "https://dapi.kakao.com/v3/search/book?query=$query";

  dynamic response;

  try {
    response = await http.get(
      Uri.parse(jsonURL),
      headers: headers,
    );
  } catch (e) {
    print(e);
  }

  print("Kakao Response ${response.statusCode}");

  if (response.statusCode == 200) {
    Iterable resultItems = await json.decode(response.body)['documents'];
    // print(resultItems);
    // List<Book> books =
    //     resultItems.map((model) => Book.fromJson(model)).toList();
    // print("kakao 응답: ${books[1]}");

    return resultItems.map((model) => Book.fromJson(model)).toList();
  } else {
    print("kakao 연결 문제 발생");
    throw Exception('API 연결문제 발생 ${response.statusCode}');
  }
}
