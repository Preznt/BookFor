import 'package:flutter/material.dart';

void main() {
  runApp(const MainPage());
}

class MainPage extends StatelessWidget {
  const MainPage({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Column(children: [
          Row(
            children: const [
              Text("내 서재"),
              Icon(Icons.search),
              Icon(Icons.more_horiz)
            ],
          ),
        ]),
      ),
    );
  }
}
