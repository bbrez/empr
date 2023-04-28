import 'package:empreendedorismo_app/pages/new_trip.dart';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

void main() => runApp(const HomeScreen());

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: HomePage(),
    );
  }
}


class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  HomeScreenState createState() => HomeScreenState();
}


class HomeScreenState extends State<HomePage> {
  late GoogleMapController mapController;

  void _onMapCreated(GoogleMapController controller) {
    mapController = controller;
  }

  final LatLng _center = const LatLng(-25.4363211, -54.5954052);
  int _index = 0;
  @override
  Widget build(BuildContext context) {
    switch (_index ) {
      case 0:
        //widget = FirstPage();
        break;

      case 1:
        Future.delayed(Duration.zero, () {
          Navigator.push(
              context, MaterialPageRoute(builder: (_) => const NewTripPage()));
        });

        break;

      case 2:
       // widget = ThirdPage();
        break;
    }

    return Scaffold(
      appBar: AppBar(),
      body: GoogleMap(
        onMapCreated: _onMapCreated,
        initialCameraPosition: CameraPosition(
          target: _center,
          zoom: 16.0,
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _index,
        onTap: (int index) => setState(() => _index = index),
        backgroundColor: const Color(0xFF084A76),
        fixedColor: Colors.white,
        unselectedItemColor: Colors.white, //<-- add this
        items:  <BottomNavigationBarItem>[
           BottomNavigationBarItem(
             icon: InkWell(
               child: Container(
                 height: 47,
                 width: 50,
                 decoration: const BoxDecoration(
                     shape: BoxShape.circle, color: Colors.black38
                 ),
                 child: const Icon(
                   Icons.person,
                   size: 32,
                   color: Colors.white,
                 ),
               ),
             ),
            label: 'Minha Conta',
          ),
           BottomNavigationBarItem(
            icon: InkWell(
              child: Container(
                height: 47,
                width: 50,
                decoration: const BoxDecoration(
                    shape: BoxShape.circle, color: Colors.black38
                ),
                child: const Icon(
                  Icons.add,
                  size: 32,
                  color: Colors.white,
                ),
              ),
            ),
            label: 'Criar novo Passeio',
          ),

          BottomNavigationBarItem(
            icon: InkWell(
              child: Container(
                height: 47,
                width: 50,
                decoration: const BoxDecoration(
                    shape: BoxShape.circle, color: Colors.black38
                ),
                child: const Icon(
                  Icons.add,
                  size: 32,
                  color: Colors.white,
                ),
              ),
            ),
            label: 'Adicionar Turista',
          ),

        ],
      ),

    );
  }
}