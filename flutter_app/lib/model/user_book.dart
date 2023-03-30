class UserBook {
  final String state;
  final DateTime regDate;
  final String buyDate;
  final String startDate;
  final String doneDate;
  final int star;

  UserBook({
    this.state = "no",
    required this.regDate,
    this.buyDate = "",
    this.startDate = "",
    this.doneDate = "",
    this.star = 0,
  });
}
