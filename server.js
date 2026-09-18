const app = require("./src/server/app");
require("dotenv").config();
const PORT = process.env.DB_PORT;

app.listen(PORT, () => {
  console.log(`
    ___    _____ ___     ____  
   /   |  / ___//   |   / __ \\ 
  / /| |  \\__ \\/ /| |  / /_/ / 
 / ___ | ___/ / ___ | / _  _/  
/_/  |_|/____/_/  |_|/_/ |_|
`);
});
