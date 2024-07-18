import app from "./app.js";
import sequelize from "./conexion.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`The back is running on port: ${port}`)
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: \n', error);
});
