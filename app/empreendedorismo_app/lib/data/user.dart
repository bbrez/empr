class User {
  final int id;
  final String email;
  final String firstname;
  final String lastname;
  final String role;


  User({required this.id, required this.email, required this.firstname, required this.lastname,
    required this.role});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      email: json['email'],
      firstname: json['firstName'],
      lastname: json['lastName'],
      role: json['role']
    );
  }
}