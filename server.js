const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const app = require("./src/server/app");
const { connect } = require("./src/config/db");
const PORT = process.env.PORT || 3000;

connect()
  .then(() => app.listen(PORT, () => {
  console.log(`
    ___    _____ ___     ____  
   /   |  / ___//   |   / __ \\ 
  / /| |  \\__ \\/ /| |  / /_/ / 
 / ___ | ___/ / ___ | / _  _/  
/_/  |_|/____/_/  |_|/_/ |_|
`);
  }))
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
    process.exitCode = 1;
  });
