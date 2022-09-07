
const goallist = document.createElement('div');
const usergoalDiv = document.querySelector('.usergoals')

// to get input from submit
const first_name = document.querySelector('#first_name');
const last_name = document.querySelector('#last_name');
const goal_descr = document.querySelector('#goal_descr');
const goalpostbtn = document.querySelector('.goalpostbtn')

createPost()

//CREATE POST
async function createPost(){
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
    const postResponse = await data.json();
    console.log(postResponse);

    if(Response.ok = true){
        $('.nameContainer').hide();
        goal_descr.value = "";
        // const newPost = document.createElement('div').className = 'newPost'
        // newPost.textContent = postResponse[0].goal_descr;
        // goallist.append(newPost);
        // usergoalDiv.appendChild(goallist);
        $('.goalItem').remove()
        fetchPosts();
    }else if(!first_name.value || !last_name.value || !goal_descr.value === Number){
        first_name.value,last_name.value, goal_descr.value = String;
    } else if(!first_name.value || !last_name.value || !goal_descr.value === ""){
        alert('You need all fields filled')
    }
});
}

//USE GET METHOD
async function fetchPosts(){
    const usergoalDiv = document.querySelector('.usergoals')
    const data = await fetch(`http://localhost:4000/goals`)
    const goalData = await data.json();

    for(let i = 0; i < goalData.length; i++){
        let data = goalData[i].goal_descr;
        let id = goalData[i].id;
            const goallist = document.createElement('div');
            goallist.id = `goal${id}`;
            goallist.className = "goalItem";
            const goaltext = document.createElement('div');
            goaltext.id = `goaltext${id}`;
            goaltext.textContent = data;
            const editbtn = document.createElement('button');
            editbtn.className = "editbtn";
            editbtn.id = `editbtn${id}`;
            editbtn.innerText = "edit";
            const updatebtn = document.createElement('button');
            updatebtn.className = 'updatebtn';
            updatebtn.id = `updatebtn${id}`;
            updatebtn.innerText = "update";

            const deletebtn = document.createElement('button');
            deletebtn.className = "deletebtn";
            deletebtn.id = `deletebtn${id}`;
            deletebtn.innerText = "delete";
        
        goallist.appendChild(goaltext);
        goallist.appendChild(editbtn);
        goallist.appendChild(updatebtn);
        
        goallist.appendChild(deletebtn);
        usergoalDiv.appendChild(goallist);

        
        editBtn(goallist,editbtn,id);
        deleteGoal(deletebtn,id);
        updateButton(updatebtn,id,editbtn)
        $('.updatebtn').hide();
    }
}

//USE DELETE METHOD
async function deleteGoal (deletebtn,id) {
    deletebtn.addEventListener('click', async () => {
    
        $(`#goal${id}`).remove();
        let sendPost = {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json'
            }
        }
       const dataresult =  await fetch(`http://localhost:4000/goals/${id}`, sendPost);
        const  deleteresult = await dataresult.json();
        console.log(deleteresult);
    });
}


 async function editBtn(goallist,editbtn,id){

            editbtn.addEventListener('click', ()=>{
                const editInput = document.createElement('input');
                editInput.id = `editInput${id}`;
                editInput.className = 'editInput';

                $(goallist).prepend(editInput);
                $(`#editbtn${id}`).hide();
                $(`#updatebtn${id}`).show();
                
                
                const goaltextvalue = document.querySelector(`#goaltext${id}`);
                const editInputvalue = document.querySelector(`#editInput${id}`);
                editInputvalue.value = goaltextvalue.textContent;

                // $(goaltextvalue).hide();

                if(goaltextvalue.textContent = ""){
                    alert('Please type in a goal');
                }
                // console.log(editInputvalue.value)
                // console.log(goaltextvalue.textContent)
                    // $(`#editInput${id}`).show();
                    
    });
}

async function updateButton(updatebtn,id,editbtn){

    updatebtn.addEventListener('click', async ()=>{
        $(`#updatebtn${id}`).hide();
        const newValue = document.querySelector(`#editInput${id}`);
        const newGoal = document.querySelector(`#goaltext${id}`);

        newGoal.textContent = newValue.value;

        $(newGoal).show();
        $(editbtn).show();
        $(newValue).hide();

        console.log(newGoal.textContent)

        let updatePost = {
            goal_descr: newGoal.textContent
        };
            let sendUpdatePost = {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(updatePost)
        }
        const data = await fetch(`http://localhost:4000/goals/${id}`, sendUpdatePost);
        const updatepostResponse = await data.json();
        console.log(updatepostResponse);
    });
}