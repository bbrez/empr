import 'package:empreendedorismo_app/data/user.dart';

class Body {
  String message;
  String token;
  User user;


  Body({required this.message, required this.token, required this.user});

  factory Body.fromJson(Map<String, dynamic> json) {
    return Body(
        message: json['message'],
        token: json['token'],
        user: User.fromJson(json['user']),
    );

  }
}