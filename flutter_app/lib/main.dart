import 'package:flutter/material.dart';
import 'package:flutter_app/view/kakao_book_search.dart';
import 'package:flutter_app/view_model/icon_view_model.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(
    MaterialApp(
      home: MultiProvider(
        providers: [ChangeNotifierProvider(create: (_) => IconViewModel())],
        child: const MainPage(),
      ),
    ),
  );
}

class MainPage extends StatelessWidget {
  const MainPage({super.key});

  @override
  Widget build(BuildContext context) {
    // var iconViewModel = context.watch<IconViewModel>();
    return Scaffold(
      body: Column(children: [
        Container(
          padding: const EdgeInsets.fromLTRB(30, 50, 20, 0),
          child: Row(
            children: [
              const Text(
                "내 서재",
                style: TextStyle(fontSize: 28),
              ),
              const Spacer(),
              IconButton(
                  onPressed: () {
                    Navigator.of(context, rootNavigator: true).push(
                        MaterialPageRoute(
                            builder: (context) => const BookSearchPage()));
                  },
                  icon: const Icon(Icons.search, size: 32)),
              IconButton(
                  onPressed: () {},
                  icon: const Icon(Icons.more_horiz, size: 32)),
            ],
          ),
        ),
      ]),
      floatingActionButton:
          FloatingActionButton(onPressed: () {}, child: const Icon(Icons.add)),
      bottomNavigationBar: BottomNavigationBar(items: const [
        BottomNavigationBarItem(
          label: "내 서재",
          icon: Icon(Icons.menu_book_outlined),
        ),
        BottomNavigationBarItem(
          label: "컬렉션",
          icon: Icon(Icons.collections_bookmark),
        ),
        BottomNavigationBarItem(
          label: "내정보",
          icon: Icon(Icons.person),
        ),
      ]),
    );
  }
}
