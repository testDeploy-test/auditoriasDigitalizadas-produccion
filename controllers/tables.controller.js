import sequelize from "../conexion.js"

const tablas = await sequelize.getQueryInterface().showAllTables()

const tablesList = tablas.map((item, index) => {

  const nombreF = item.replace(/_/g, ' ').replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1));
   
    return {
      id: index + 1,
      nombre: item,
      nombreF
    };
 });

const tables = (req, res) => {
    return res.json(tablesList) 
}

export default tables;