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

app.get('/', async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
});

app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`)
})