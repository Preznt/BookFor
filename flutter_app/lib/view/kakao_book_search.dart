import 'package:flutter/material.dart';
import 'package:flutter_app/config/kakao_api.dart';
import 'package:flutter_app/model/kakao_book.dart';
import 'package:flutter_html/flutter_html.dart';

class BookSearchPage extends StatelessWidget {
  const BookSearchPage({super.key});

  @override
  Widget build(BuildContext context) {
    Future<List<Book>?> resultBook = loadBook();

    final TextEditingController searchController = TextEditingController();

    return Scaffold(
      appBar: AppBar(
        title: searchInputBox(searchController),
        backgroundColor: Colors.white,
      ),
      body: Container(
        padding: const EdgeInsets.only(top: 45),
        child: FutureBuilder(
          future: resultBook,
          builder: (context, snapshot) {
            print("테스트${snapshot.data}");
            return ListView.builder(
              itemCount: snapshot.data!.length,
              itemBuilder: (context, index) {
                Book book = snapshot.data![index];
                return bookListView(book);
              },
            );
          },
        ),
      ),
    );
  }

  Card bookListView(Book book) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16.0)),
      child: InkWell(
        splashColor: Colors.cyanAccent.withOpacity(0.5),
        child: ListTile(
          title: Html(data: book.title, style: {
            "*": Style(
              fontSize: const FontSize(20),
              textOverflow: TextOverflow.ellipsis,
            ),
            "b": Style(
              fontWeight: FontWeight.w600,
              color: Colors.blue,
            )
          }),
        ),
      ),
    );
  }

  TextFormField searchInputBox(TextEditingController searchController) {
    return TextFormField(
      controller: searchController,
      decoration: const InputDecoration(
        hintText: "책이름 또는 ISBN 입력",
      ),
    );
  }
}
