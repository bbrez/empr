import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import '../main.dart';
import 'package:flutter_datetime_picker/flutter_datetime_picker.dart';

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
        primarySwatch: Colors.blue,
      ),
      home: const NewTripPage(),
    );
  }
}

class NewTripPage extends StatefulWidget {
  const NewTripPage({super.key});

  @override
  NewTripDemoState createState() => NewTripDemoState();
}

class NewTripDemoState extends State<NewTripPage> {

  TextEditingController nameController = TextEditingController();
  TextEditingController placeController = TextEditingController();
  TextEditingController areaController = TextEditingController();
  TextEditingController startDateController = TextEditingController();
  TextEditingController endDateController = TextEditingController();

  bool validate (){
    return nameController.text.isNotEmpty && placeController.text.isNotEmpty && areaController.text.isNotEmpty
        && startDateController.text.isNotEmpty && endDateController.text.isNotEmpty;
  }

  void createTrip() async {
    final response = await http.post(Uri.parse('http://empreendedorismo.dynv6.net/trips'),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, String>{
        'name': nameController.text,
        'place': placeController.text,
        'startDate': startDateController.text,
        'endDate': endDateController.text,

      }),

    );

    print(response.statusCode);
    if (response.statusCode == 201) {
      const snackBar = SnackBar(
        content: Text('Passeio criado com sucesso!'),
      );

      ScaffoldMessenger.of(context).showSnackBar(snackBar);
      throw Exception('Failed to create user.');
      // If the server did return a 201 CREATED response,
      // then parse the JSON.
    } else {
      // If the server did not return a 201 CREATED response,
      // then throw an exception.
      const snackBar = SnackBar(
        content: Text('Erro ao criar passeio!'),
      );

      ScaffoldMessenger.of(context).showSnackBar(snackBar);
      throw Exception('Failed to create user.');
    }
  }


  @override
  Widget build(BuildContext context) {
    DateTime now = DateTime.now();
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text("Criar novo Passeio"),
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
                    nameController.text = val;
                  });
                },
                decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Nome do passeio',
                    hintText: ''
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
                    placeController.text = val;
                  });
                },
                decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Lugar',
                    hintText: ''),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(
                  left: 15.0, right: 15.0, top: 15, bottom: 0),
              child: TextField(
                onChanged: (val){
                  setState(() {
                    areaController.text = val;
                  });
                },
                decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Área do passeio',
                    hintText: ''),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(
                  left: 15.0, right: 15.0, top: 15, bottom: 0),
              child: TextField(
                controller: startDateController,
                onTap: (){
                  DatePicker.showDateTimePicker(context,
                      showTitleActions: true,
                      minTime: DateTime(now.day, now.month, now.year, now.hour, now.minute),
                      maxTime: DateTime(1, 1, 2024, 0 ,0), onChanged: (dateTime) {
                        setState(() {
                          startDateController.text = DateFormat('d/M/yyyy').add_Hm().format(dateTime);
                        });
                        print('change $dateTime');
                      }, onConfirm: (date) {


                        print('confirm $date');
                      }, currentTime: DateTime.now(), locale: LocaleType.pt);
                },
                decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Data de inicio',
                    hintText: ''),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(
                  left: 15.0, right: 15.0, top: 15, bottom: 30),
              child: TextField(
                controller: endDateController,

                onTap: (){
                  DatePicker.showDateTimePicker(context,
                      showTitleActions: true,
                      minTime: DateTime(now.day, now.month, now.year, now.hour, now.minute),
                      maxTime: DateTime(1, 1, 2024, 0 ,0), onChanged: (dateTime) {
                        setState(() {
                          endDateController.text = DateFormat('d/M/yyyy').add_Hm().format(dateTime);
                        });
                        print('change $dateTime');
                      }, onConfirm: (date) {


                        print('confirm $date');
                      }, currentTime: DateTime.now(), locale: LocaleType.pt);
                },
                decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Data de fim ',
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
                    createTrip();
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