const express = require('express');
const dotenv = require('dotenv')
const dbConnect = require('./config/dbConnect');
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')   
dotenv.config();

dbConnect();

const app =express();

//middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

// Start server
const PORT = process.env.PORT || 4001;

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})