require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser=require("body-parser");
const connectWithDB=require('./config/db');
const userRouter=require('./Routes/userRoutes')


connectWithDB();
const app = express();
app.use(bodyParser.json());

app.use(cors());

app.use('/api',userRouter)

app.listen(process.env.PORT, (error) => {
    if (error) {
      console.log('Error in connecting to server: ', error);
    }
    console.log(`Server is running on port ${process.env.PORT}`);
  });
