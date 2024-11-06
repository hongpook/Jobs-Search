const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const { sequelize } = require('./models/index'); 
const db = require("./models");
require('dotenv').config();
const app = express();
const port = process.env.DB_PORT || 5000;
const authRoutes = require('./routes/authRoutes');
const allroutes = require('./routes/allRoutes');


app.use(cors());
app.use(bodyParser.json());

app.use('/auth/', authRoutes);
app.use('/api/v1/', allroutes);


app.get("/", (req, res) => {
  res.json({ message: "Hello !!!" });
});



sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${process.env.DB_PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


module.exports = app;
