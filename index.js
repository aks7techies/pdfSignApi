const express = require('express');
const { connectDB } = require('./db_connection/config');
const { logReqRes } = require('./middleware');
const cors = require('cors');
const staticRouter = require('./routers/users');
const userRouter = require('./routers/loginSign');
const clientMaster = require('./routers/clientMaster');
const templateMaster = require('./routers/templateMaster');
const verificationDetails = require('./routers/verificationroute');
const unProcess = require('./routers/unProcessRoute');
const historyDetais = require('./routers/historyRoute');
const processDetails = require('./routers/processRoute');
const createImages = require('./routers/createImageRoute');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('log.txt'));

// Connect to the database
connectDB(process.env.DB)
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch(err => {
    console.error('Failed to connect to database:', err);
    process.exit(1); // Exit the process if unable to connect to database
  });

// Routers
app.use('/api/users', staticRouter); // Assuming this is for static content like images, etc.
app.use('/api/user', userRouter); // Corrected path for login routes
app.use('/api/client',clientMaster);
app.use('/api/template',templateMaster);
app.use('/api/verification',verificationDetails);
app.use('/api/history',historyDetais);
app.use('/api/unComplete',unProcess);
app.use('/api/Complete',processDetails);
app.use('/api/CreateImages',createImages);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
