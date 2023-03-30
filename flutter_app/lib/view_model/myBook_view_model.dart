import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';

class MyBookViewModel with ChangeNotifier {
  late DatabaseReference bookRef;
  bool initDB = false;

  Future<void> init() async {
    bookRef = FirebaseDatabase.instance.ref("myBook");
    print("파이어베이스");
    initDB = true;
  }

  Future<void> bookInsert() async {
    await bookRef
        .child("user1")
        .child("book2")
        .set(<String, String>{"name": "홍길동", "age": "22"});
  }
}
