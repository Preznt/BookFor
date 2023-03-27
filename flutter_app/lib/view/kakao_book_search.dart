import 'package:flutter/material.dart';

class BookSearchPage extends StatelessWidget {
  const BookSearchPage({super.key});

  @override
  Widget build(BuildContext context) {
    
    final TextEditingController searchController = TextEditingController();


    return Scaffold(
      body: Container(
        padding: const EdgeInsets.only(top: 45),
        child: TextFormField(
          controller: searchController,
          decoration: const InputDecoration(
              border: OutlineInputBorder(), hintText: "책이름 또는 ISBN 입력"),
        ),
      ),
    );
  }
}
