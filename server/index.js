const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const todoRoutes=require('./routes/todoRoutes.js');
const userRoutes=require('./routes/userRoutes.js');


const app=express();
const port=8080;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// Connect to MongoDB
mongoose.connect(`${process.env.MONGO_DB_URL}`, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // writeConcern: {
    //   w: 'majority',
    // }
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Failed to connect to MongoDB', error);
    });
app.get('/',(req,res)=>{
    res.send('Hello World!');
})

app.use('/api/todos',todoRoutes);
app.use('/api/users',userRoutes);
//start server
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})