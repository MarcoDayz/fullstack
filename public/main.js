










// const getbtn = document.querySelector('.getbtn');
// const deletebtn = document.querySelector('.deletebtn');
// const postbtn = document.querySelector('.postbtn');


// getbtn.addEventListener('click', async (e)=>{
//     const data = await fetch('http://localhost:4000/goals');
//     const json = await data.json();
//     console.log(json)
// });

// deletebtn.addEventListener('click', async (e)=>{
//     let deletePost = {
//         method: 'DELETE'
//     }
//     const data = await fetch('http://localhost:4000/goals', deletePost);
//     const json = await data.json();
//     console.log(json)
// });


// postbtn.addEventListener('click', async (e)=>{
//     const newGoal = {
//         "first_name": "justin",
//         "last_name": "alvarez",
//         "goal_descr": "graduate MCSP-14",
//         "complete": "false"
//     }
//     let createPost = {
//         method: 'POST',
//         headers: {
//             'Content-Type':
//                 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify(newGoal)
//     }
//     const data = await fetch('http://localhost:4000/goals', createPost);
//     const json = await data.json();
//     console.log(json)
// });