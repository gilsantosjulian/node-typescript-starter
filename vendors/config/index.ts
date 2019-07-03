import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
// process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * Your secret sauce
   */
  jwtSecretKey: process.env.JWT_SECRET,
  jwtPublicKey: process.env.JWT_PUBLIC,
  urlBase: process.env.URLBASE
};
