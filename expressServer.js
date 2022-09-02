import express from "express";
const app = express();
// import pkg from "pg";
// const {Pool} = pkg;

const port = 4000;

// const pool = new Pool({
//     user:'markdays',
//     password:'',
//     host:'localhost',
//     port: 5432,
//     database:'goals'
// });

//read all
app.get('/', async (req,res)=>{
    try {
        res.send('server is connected')
    } catch (error) {
        console.error(error.message);
    }
});

//read one
app.get('/:id', async (req,res)=>{
    try {
        res.send('server is connected')
    } catch (error) {
        console.error(error.message);
    }
});

//create
app.post('/', async (req,res)=>{
    try {
        res.send('server is connected')
    } catch (error) {
        console.error(error.message);
    }
});

//update 1
app.put('/:id', async (req,res)=>{
    try {
        res.send('server is connected')
    } catch (error) {
        console.error(error.message);
    }
});

//get delete 1
app.delete('/:id', async (req,res)=>{
    try {
        res.send('server is connected')
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`)
})