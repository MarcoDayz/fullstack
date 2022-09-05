
const goallist = document.createElement('il');

// to get input from submit
const first_name = document.querySelector('.first_name');
const last_name = document.querySelector('.last_name');
const goal_descr = document.querySelector('.goal_descr');

const goalpostbtn = document.querySelector('.goalpostbtn')


goalpostbtn.addEventListener('click', async () => {
    
    let newPost = {
        first_name: first_name.value,
        last_name: last_name.value,
        goal_descr: goal_descr.value
    };
        let sendPost = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(newPost)
    }
    const data = await fetch('http://localhost:4000/goals', sendPost);
    const json = await data.json();

    if(Response.ok = true){
        goal_descr.value = "";
        $('il').remove()
        fetchPosts();
    }else if(!first_name.value || !last_name.value || !goal_descr.value === Number){
        first_name.value,last_name.value, goal_descr.value = String;
    } else if(!first_name.value || !last_name.value || !goal_descr.value === ""){
        alert('You need all fields filled')
    }

});

async function fetchPosts(){
    const usergoalDiv = document.querySelector('.usergoals')
    const data = await fetch(`http://localhost:4000/goals`)
    const goalData = await data.json();

    for(let i = 0; i < goalData.length; i++){
        let data = goalData[i].goal_descr;
        let id = goalData[i].id;
            const goallist = document.createElement('il');
            goallist.id = id;
            goallist.textContent = data;
            const deletebtn = document.createElement('button');
            deletebtn.innerText = "delete"
        
        goallist.appendChild(deletebtn)
        usergoalDiv.appendChild(goallist)
        deleteGoal(goallist,deletebtn,id)
    }
}


async function deleteGoal (goallist,deletebtn,id) {

    deletebtn.addEventListener('click', async () => {

        goallist.remove();
        let sendPost = {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json'
            }
        }
        await fetch(`http://localhost:4000/goals/${id}`, sendPost);
//    await data.json();

        fetchPosts()
    });
}