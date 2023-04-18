import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_database/ui/firebase_animated_list.dart';
import 'package:flutter/material.dart';
import 'package:flutter_app/config/firebase.dart';
import 'package:flutter_app/firebase_options.dart';
import 'package:flutter_app/view/kakao_book_search.dart';
import 'package:flutter_app/view_model/myBook_view_model.dart';
import 'package:provider/provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  runApp(
    MaterialApp(
      home: MultiProvider(
        providers: [ChangeNotifierProvider(create: (_) => MyBookViewModel())],
        child: const MainPage(),
      ),
    ),
  );
}

class MainPage extends StatelessWidget {
  const MainPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(children: [
        Container(
          padding: const EdgeInsets.fromLTRB(30, 50, 20, 0),
          child: Column(
            children: [
              Row(
                children: [
                  const Text(
                    "내 서재",
                    style: TextStyle(fontSize: 28),
                  ),
                  const Spacer(),
                  IconButton(
                      onPressed: () {
                        Navigator.of(context).push(MaterialPageRoute(
                            builder: (context) => const BookSearchPage()));
                      },
                      icon: const Icon(Icons.search, size: 32)),
                  IconButton(
                      onPressed: () {},
                      icon: const Icon(Icons.more_horiz, size: 32)),
                ],
              ),
              SizedBox(
                width: 200,
                height: 100,
                child: Column(
                  children: [
                    Flexible(
                        child: FirebaseAnimatedList(
                      query: bookRef,
                      itemBuilder: (context, snapshot, animation, index) {
                        return ListView(
                          children: [
                            Container(
                              height: 50,
                              color: Colors.amber,
                              child: Text("테스트 ${snapshot.value}"),
                            )
                          ],
                        );
                        // return GridView.count(
                        //   crossAxisCount: 2,
                        //   mainAxisSpacing: 10,
                        //   crossAxisSpacing: 10,
                        //   children: [
                        //     Container(
                        //       padding: const EdgeInsets.all(6),
                        //       color: Colors.teal,
                        //       child: const Text("테스트 중"),
                        //     )
                        //   ],
                        // );
                      },
                    )),
                  ],
                ),
              )
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
