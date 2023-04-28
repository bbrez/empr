import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../main.dart';


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
      home: const NewUserPage(),
    );
  }
}

class NewUserPage extends StatefulWidget {
  const NewUserPage({super.key});

  @override
  NewUserDemoState createState() => NewUserDemoState();
}

class NewUserDemoState extends State<NewUserPage> {

   TextEditingController emailController = TextEditingController();
   TextEditingController passwdController = TextEditingController();
   TextEditingController nameController = TextEditingController();
   TextEditingController lastnameController = TextEditingController();

   bool validate (){
     return emailController.text.isNotEmpty && passwdController.text.isNotEmpty
        && nameController.text.isNotEmpty && lastnameController.text.isNotEmpty;
   }

   void createUser() async {
     final response = await http.post(Uri.parse('http://18.230.85.64/users'),
       headers: <String, String>{
         'Content-Type': 'application/json',
       },
       body: jsonEncode(<String, String>{
         'email': emailController.text,
         'password': passwdController.text,
         'firstName': nameController.text,
         'lastName': lastnameController.text,

       }),

     );

      print(response.statusCode);
     if (response.statusCode == 201) {
       Navigator.push(
           context, MaterialPageRoute(builder: (_) => const LoginPage()));
       // If the server did return a 201 CREATED response,
       // then parse the JSON.
     } else {
       // If the server did not return a 201 CREATED response,
       // then throw an exception.
       const snackBar = SnackBar(
         content: Text('Conta não pode ser criada!'),
       );

       ScaffoldMessenger.of(context).showSnackBar(snackBar);
       throw Exception('Failed to create user.');
     }
   }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text("Criar nova conta"),
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
                    hintText: 'Digite um email valido'
                ),
              ),

            ),
            Padding(
              padding: const EdgeInsets.only(
                  left: 15.0, right: 15.0, top: 15, bottom: 0),
              child: TextField(
                obscureText: true,
                onChanged: (val){
                  setState(() {
                    passwdController.text = val;
                  });
                },
                decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Senha',
                    hintText: 'Digite sua senha'),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(
                  left: 15.0, right: 15.0, top: 15, bottom: 0),
              child: TextField(
                onChanged: (val){
                  setState(() {
                    nameController.text = val;
                  });
                },
                decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Nome',
                    hintText: ''),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(
                  left: 15.0, right: 15.0, top: 15, bottom: 30),
              child: TextField(
                onChanged: (val){
                  setState(() {
                    lastnameController.text = val;
                  });
                },
                decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Sobrenome ',
                    hintText: ''),
              ),
            ),
            Container(
              height: 50,
              width: 250,
              decoration: BoxDecoration(
                  color: Colors.blue, borderRadius: BorderRadius.circular(20)),
              child: TextButton (
                onPressed: () {
                  print ('valid ${validate()}');
                  if (validate()) {
                    createUser();
                  }
                },
                child: const Text(
                  'Criar',
                  style: TextStyle(color: Colors.white, fontSize: 25),
                ),
              ),
            ),
            const SizedBox(
              height: 130,
            ),
          ],
        ),
      ),
    );
  }
}