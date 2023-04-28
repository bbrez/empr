import 'package:flutter/material.dart';


void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: GuidePage(),
    );
  }
}

void _incrementCounter() {

}
class GuidePage extends StatefulWidget {
  const GuidePage({super.key});

  @override
  GuideDemoState createState() => GuideDemoState();
}

class GuideDemoState extends State<GuidePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text("Passeio"),
      ),
      body: Center(
        child: ListView(
          padding: const EdgeInsets.all(8),
          children: const <Widget>[
            Card(child:ListTile(
                title: Text("José"),
                leading: CircleAvatar(backgroundImage: ExactAssetImage('asset/images/Jose.jpg')),
                trailing: Icon(Icons.star))),
            Card(child:ListTile( title: Text("Paulo"), leading: CircleAvatar(backgroundImage: ExactAssetImage('asset/images/Paulo.jpg')), trailing: Icon(Icons.star))),
            Card(child:ListTile( title: Text("Maria"), leading:  CircleAvatar(backgroundImage: NetworkImage("https://www.shutterstock.com/shutterstock/photos/1865153395/display_1500/stock-photo-portrait-of-young-smiling-woman-looking-at-camera-with-crossed-arms-happy-girl-standing-in-1865153395.jpg")), trailing: Icon(Icons.star))),
            Card(child:ListTile( title: Text("Antônia Antonia"), leading:  CircleAvatar(backgroundImage: ExactAssetImage('asset/images/antonia antonia.jpg')), trailing: Icon(Icons.star)))
          ],
        )
      ),
      floatingActionButton: const FloatingActionButton(
      onPressed: _incrementCounter,
      tooltip: 'Adicionar Turista',
      child: Icon(Icons.add),
    )
    );
  }
}
