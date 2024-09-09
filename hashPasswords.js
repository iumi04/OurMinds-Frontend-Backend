const bcrypt = require("bcryptjs");

async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);
  } catch (error) {
    console.error("Error hashing password:", error);
  }
}

hashPassword("***");
