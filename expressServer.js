import express from "express";
const app = express();
import pkg from "pg";
const {Pool} = pkg;

const port = 4000;

const pool = new Pool({
    user:'markdays',
    password:'',
    host:'localhost',
    port: 5432,
    database:'goals_db'
});

app.use(express.static('public'));

app.use(express.json())

//read all goals
app.get('/goals', async (req,res)=>{
    try {
        const { rows } = await pool.query(`SELECT * FROM goals`);
            res.status(200);
            res.contentType('application/json');
            res.send(rows);
    } catch (error) {
            res.status(404);
            res.contentType('text/plain');
            res.send('page not found');
    }
});

//read one goal
app.get('/goals/:id', async (req,res)=>{
    try {
  
        const { id } = req.params;
        const { rows } = await pool.query(`SELECT * FROM goals WHERE id = $1`,[id]);
        if(rows.length === 0){
            res.status(404);
            res.contentType('text/plain');
            res.send('page not found');
        }else{
            res.status(200);
            res.contentType('application/json');
            res.send(rows);
        }
    } catch (error) {
            res.status(404);
            res.contentType('text/plain');
            res.send('page not found');
    }
});

//create new goal
app.post('/goals', async (req,res)=>{
    try {
        const { first_name, last_name,goal_descr,complete } = req.body;

        if(first_name && last_name && goal_descr && complete){
            await pool.query(`INSERT INTO goals(first_name,last_name,goal_descr,complete) VALUES($1,$2,$3,$4)`,[first_name,last_name,goal_descr,complete]);
        const {rows} = await pool.query(`SELECT * FROM goals`);
            res.status(200);
            res.contentType('application/json');
            res.send(rows);
        }else{
            res.status(404);
            res.contentType('text/plain');
            res.send('page not found');
        }
    } catch (error) {
            res.status(404);
            res.contentType('text/plain');
            res.send('page not found');
    }
});

//update 1 goal
app.put('/goals/:id', async (req,res)=>{
    try {
        const { id } = req.params;
        const { first_name,last_name,goal_descr,complete } = req.body;

        if(rows.leng === 0){
            res.status(404);
                res.contentType('text/plain');
                res.send('page not found');
        }else{
        const { rows } = await pool.query(`UPDATE goals SET first_name = $1, last_name = $2, goal_descr = $3, complete = $4 WHERE id = $5`, [first_name,last_name,goal_descr,complete,id]);
            res.status(200);
            res.contentType('application/json');
            res.send(rows);
        }
    } catch (error) {
            res.status(404);
            res.contentType('text/plain');
            res.send('page not found');
    }


});

//get delete 1
app.delete('/goals/:id', async (req,res)=>{
    try {
        const { id } = req.params;
         await pool.query(`DELETE FROM goals WHERE id = $1`,[id]);
        const {rows} = await pool.query(`SELECT * ALL goals`);
            res.status(200);
            res.contentType('application/json');
            res.send(rows);
    } catch (error) {
            res.status(404);
            res.contentType('text/plain');
            res.send('page not found');
    }
});

//delete all
app.delete('/goals', async (req,res)=>{
    try{
        await pool.query(`DELETE FROM goals`);
        // const {rows} = await pool.query(`select * from users`);
            res.status(200);
            res.contentType('application/json');
            res.send('Table has been deleted');
    }catch(error){
            res.status(404);
            res.contentType('text/plain');
            res.send('page not found');
    }
});

app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`)
})