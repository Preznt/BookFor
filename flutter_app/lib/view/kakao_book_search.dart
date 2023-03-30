import 'package:flutter/material.dart';
import 'package:flutter_app/config/kakao_api.dart';
import 'package:flutter_app/model/kakao_book.dart';
import 'package:flutter_app/view_model/myBook_view_model.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:provider/provider.dart';

class BookSearchPage extends StatefulWidget {
  const BookSearchPage({super.key});

  @override
  State<BookSearchPage> createState() => _BookSearchPageState();
}

class _BookSearchPageState extends State<BookSearchPage> {
  Future<List<Book>?> resultBook = loadBook();

  // late KakaoViewModel kakao;
  final TextEditingController searchController = TextEditingController();

  @override
  void didChangeDependencies() {
    // TODO: implement didChangeDependencies
    super.didChangeDependencies();
    // KakaoViewModel kakao = KakaoViewModel();
    MyBookViewModel myBookViewModel = context.watch<MyBookViewModel>();

    @override
    void initState() {
      myBookViewModel.init();
      super.initState();
    }

    @override
    void dispose() {
      super.dispose();
    }
  }

  void searchHandler(search) {
    // String str = searchController.value.toString();
    Future<List<Book>?> searchBook = loadBook(search);
    print("책 검색 테스트 $searchBook");
    resultBook = searchBook;
    setState(() {});
  }

  TextFormField searchInputBox() {
    return TextFormField(
      controller: searchController,
      onFieldSubmitted: searchHandler,
      onChanged: searchHandler,
      decoration: const InputDecoration(
        hintText: "책이름 또는 ISBN 입력",
      ),
    );
  }

  Card bookListView(Book book) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16.0)),
      child: InkWell(
        splashColor: Colors.cyanAccent.withOpacity(0.5),
        child: ListTile(
          leading: book.thumbnail.isNotEmpty
              ? Image.network(book.thumbnail)
              : Image.asset("images/book_default.png"),
          title: Html(data: book.title, style: {
            "*": Style(
              fontSize: const FontSize(20),
              textOverflow: TextOverflow.ellipsis,
            ),
          }),
          subtitle: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text("저자 : ${book.authors}"),
              ElevatedButton(
                onPressed: myBookViewModel.bookInsert,
                child: const Text("추가"),
              ),
              // ElevatedButton(
              //   onPressed: () {},
              //   child: const Text("자세히 보기"),
              // ),
            ],
          ),
          onTap: () {},
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: searchInputBox(),
        backgroundColor: Colors.white,
      ),
      body: Container(
        padding: const EdgeInsets.only(top: 45),
        child: FutureBuilder(
          future: resultBook,
          builder: (context, snapshot) {
            if (!snapshot.hasData) {
              return const Center(
                child: CircularProgressIndicator(),
              );
            }
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
}
