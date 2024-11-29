const express = require('express')
const cors= require('cors')
const bodyparser=require('body-parser');
const taskRoute=require('./routes/taskRoutes');

const app = express();
const PORT=2000;

// middleware
app.use(express.json());

app.use(cors());




//router 
app.use('/api',taskRoute);

app.get('/',(req,res)=>{
    res.send('this is just for checking')
})

// start the server 
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
 })
    // this for the port if the port is working with another process
 //.on('error', (err) => {
//     if (err.code === 'EADDRINUSE') {
//         console.log(`Port ${PORT} is already in use. Trying another port...`);
//         app.listen(0, () => {
//             console.log(`Server started on an available port`);
//         });
//     }
// });


