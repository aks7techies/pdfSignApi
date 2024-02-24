const express = require('express');
const userRouter = require('./routers/users');
const { connectDB } = require('./db_connection/config');
const { logReqRes } = require('./middleware');
require('dotenv').config();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('log.txt'));

// Connect to the database
connectDB(process.env.DB).then(() => {
    console.log('Database connected successfully');
}).catch(err => {
    console.error('Failed to connect to database:', err);
    process.exit(1); // Exit the process if unable to connect to database
});

// Routers
app.use('/api/users', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
