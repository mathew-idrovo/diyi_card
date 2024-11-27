const bcrypt = require("bcryptjs");

const password = "password123"; // La contraseña que quieres hashear
const salt = bcrypt.genSaltSync(10); // Genera un salt
const hashedPassword = bcrypt.hashSync(password, salt); // Hashea la contraseña

console.log("Hashed password:", hashedPassword);
