import bcrypt from "bcrypt"

const run = async () => {
  const password = "adminpass123";
  const hashed = await bcrypt.hash(password, 12);
  console.log("Hashed Password:", hashed);
};

run();