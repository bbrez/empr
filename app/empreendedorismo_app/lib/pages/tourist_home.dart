import 'dart:async';
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';

void main() => runApp(const TouristHomePage());


class TouristHomePage extends StatefulWidget {
  const TouristHomePage({Key? key}) : super(key: key);@override
  State<TouristHomePage> createState() => TouristHomePageState();
}

class TouristHomePageState extends State<TouristHomePage> {
  final Completer<GoogleMapController> _controller = Completer();

  //static const LatLng sourceLocation = LatLng(-25.4363211, -54.5954052);
  static const LatLng destination = LatLng(-25.4363211, -54.5954052);

  LocationData? currentLocation;

  void getCurrentLocation() async {
    Location location = Location();

    location.getLocation().then((location) {
      currentLocation = location;
      setState(() {});
      },
    );

  }

  @override
  void initState() {
    getCurrentLocation();
    super.initState();
  }


  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorSchemeSeed: Colors.green[700],
      ),
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Área Atual'),
          elevation: 2,
        ),
        body: currentLocation == null? const Center(child: Text("Carregando")):
        GoogleMap(
          initialCameraPosition: CameraPosition(
            target:LatLng(currentLocation!.latitude!, currentLocation!.longitude!),
            zoom: 13.5,
          ),
          markers: {
            Marker(
              markerId: const MarkerId("currentLocation"),
              position: LatLng(currentLocation!.latitude!, currentLocation!.longitude!),
            ),

          },
          circles: {Circle( circleId: const CircleId('currentCircle'),
            center: LatLng(destination.latitude,destination.longitude),
            radius: 1000,
            fillColor: Colors.blue.withOpacity(0.5),
            strokeColor:  Colors.blue.shade100.withOpacity(0.1),
          ),},
          onMapCreated: (mapController) {
            _controller.complete(mapController);
          },
        ),
      ),
    );

  }
}