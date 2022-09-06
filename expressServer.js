import express, { response } from "express";
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
        const {first_name, goal_descr, last_name} = req.body;

        if(first_name && last_name && goal_descr){
            const result = await pool.query(`insert into goals (first_name,goal_descr,last_name) values($1,$2,$3)`,[first_name,goal_descr,last_name]);
            // const {rows} = await pool.query(`select * from goals`);
            res.status(200);
            res.contentType('application/json');
            res.send(result);
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
    try{
        const {id} = req.params;
        const {first_name, last_name, goal_descr} = req.body;

            if(!first_name || !last_name || !goal_descr){
                if(first_name){
                await pool.query(`Update goals SET first_name = $1 WHERE id = $2`, [first_name,id]);
                }
                if(last_name){
                await pool.query(`Update goals SET last_name = $1 WHERE id = $2`, [last_name,id]);
                }
                if(goal_descr){
                await pool.query(`Update goals SET goal_descr = $1 WHERE id = $2`, [goal_descr,id]);
                }
            }else if(first_name,last_name,goal_descr){
                    await pool.query(`Update goals SET first_name = $1, last_name = $2, goal_descr = $3 WHERE id = $4`, [first_name,last_name,goal_descr,id]);
            }else{
                res.status(404);
                res.contentType('text/plain');
                res.send('page not found');
                }
            const {rows} = await pool.query(`select * from goals`);
            res.status(200);
            res.contentType('application/json');
            res.send(rows);
        }catch(error){
            console.error(error.message);
        }
});

//get delete 1
app.delete('/goals/:id', async (req,res)=>{
    try {
        const { id } = req.params;
         await pool.query(`DELETE FROM goals WHERE id = $1`,[id]);
            // res.status(200);
            // res.contentType('application/json');
            // res.send(`${id} was deleted`)
    } catch (error) {
            res.status(404);
            res.contentType('text/plain');
            res.send('page not found');
    }
});

//delete all
app.delete('/goals', async (req,res)=>{
    try{
        const {rows} = await pool.query(`DELETE FROM goals`);
        // const {rows} = await pool.query(`select * from users`);
            res.status(200);
            res.contentType('application/json');
            res.send(rows);
    }catch(error){
            res.status(404);
            res.contentType('text/plain');
            res.send('page not found');
    }
});

app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`)
})