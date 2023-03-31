import 'package:firebase_database/firebase_database.dart';

DatabaseReference bookRef = FirebaseDatabase.instance.ref('Book');
bool initDB = false;

Future<void> init() async {
  // myBookRef = FirebaseDatabase.instance.ref("myBook");

  // print("파이어베이스");
  initDB = true;
}
