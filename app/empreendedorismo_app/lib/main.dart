import 'dart:convert';

import 'package:empreendedorismo_app/pages/guide_home.dart';
import 'package:empreendedorismo_app/pages/new_user.dart';
import 'package:empreendedorismo_app/pages/tourist_home.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

import 'data/user.dart';
import 'data/body.dart';



void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
      home: const LoginPage(),
    );
  }
}

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  LoginDemoState createState() => LoginDemoState();
}

class LoginDemoState extends State<LoginPage> {

  TextEditingController emailController = TextEditingController();
  TextEditingController passwdController = TextEditingController();

  void login() async {
    final response = await http.post(Uri.parse('http://empreendedorismo.dynv6.net/users/login'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, String>{
        'email': emailController.text,
        'password': passwdController.text,
      }),

    );

    print(response.statusCode);
    if (response.statusCode == 200) {
      print(response.body);
      Body body = Body.fromJson(jsonDecode(response.body));
      User user = body.user;
      if (user.role == 'Tourist'){
        Navigator.push(
            context, MaterialPageRoute(builder: (_) => const TouristHomePage()));
      }else {
        Navigator.push(
          context, MaterialPageRoute(builder: (_) => const HomePage()));
      }
    } else {

      const snackBar = SnackBar(
        content: Text('Usuário não encontrado!'),
      );

      ScaffoldMessenger.of(context).showSnackBar(snackBar);
      // If the server did not return a 201 CREATED response,
      // then throw an exception.
      throw Exception('Failed to login.');
    }
  }


  bool validate (){
    return emailController.text.isNotEmpty && passwdController.text.isNotEmpty;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text("Login"),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            const Padding(
                padding: EdgeInsets.only(top: 200.0)
            ),
            Padding(
              //padding: const EdgeInsets.only(left:15.0,right: 15.0,top:0,bottom: 0),
              padding: const EdgeInsets.symmetric(horizontal: 15),
              child: TextField(
                onChanged: (val){
                  setState(() {
                    emailController.text = val;
                  });
                },
                decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Email',
                    hintText: 'Digite um email valido'),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(
                  left: 15.0, right: 15.0, top: 15, bottom: 0),
              //padding: EdgeInsets.symmetric(horizontal: 15),
              child: TextField(
                onChanged: (val){
                  setState(() {
                    passwdController.text = val;
                  });
                },
                obscureText: true,
                decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Senha',
                    hintText: 'Digite sua senha'),
              ),
            ),
            TextButton (
              onPressed: (){
                //TODO FORGOT PASSWORD SCREEN GOES HERE
              },
              child: const Text(
                'Esqueci minha senha',
                style: TextStyle(color: Colors.blue, fontSize: 15),
              ),
            ),
            Container(
              height: 50,
              width: 250,
              decoration: BoxDecoration(
                  color: Colors.blue, borderRadius: BorderRadius.circular(20)),
              child: TextButton (
                onPressed: () {
                  print(validate());
                  if (validate()){
                    login();
                  }else {
                    const snackBar = SnackBar(
                      content: Text('Preencha todos os campos corretamente!'),
                    );

                    ScaffoldMessenger.of(context).showSnackBar(snackBar);

                  }
                },
                child: const Text(
                  'Entrar',
                  style: TextStyle(color: Colors.white, fontSize: 25),
                ),
              ),
            ),
            const SizedBox(
              height: 130,
            ),
            TextButton (
              onPressed: (){
                Navigator.push(
                    context, MaterialPageRoute(builder: (_) => const NewUserPage()));
                },
              child: const Text(
                'Criar nova conta',
                style: TextStyle(color: Colors.blue, fontSize: 15),
              ),
            ),

          ],
        ),
      ),
    );
  }
}