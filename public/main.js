const usergoalDiv = document.querySelector('.usergoals');

const firstname = document.querySelector('#first_name');
const lastname = document.querySelector('#last_name');
const goaldescr = document.querySelector('#goal_descr');
const goalpostbtn = document.querySelector('.goalpostbtn')

createPost()

//CREATE POST
async function createPost(){
goalpostbtn.addEventListener('click', async () => {

    if(!firstname.value || !lastname.value || !goaldescr.value === ""){
        alert('Please type in all fields');
            return;
        }

    let newPost = {
        first_name: firstname.value,
        last_name: lastname.value,
        goal_descr: goaldescr.value
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

    //if resonse.ok is true then continue to fetch
    if(Response.ok = true){
        $('.nameContainer').hide();
        goaldescr.value = "";
        $('.goalItem').remove()
        fetchPosts();
        console.log(postResponse);
    }
});
}

//USE GET METHOD
async function fetchPosts(){
    // const usergoalDiv = document.querySelector('.usergoals')
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

        $('.updatebtn').hide();
        editBtn(goallist,editbtn,id);
        deleteBtn(deletebtn,id);
        //call update
        updateBtn(updatebtn,id,editbtn);
       
    }
}

//USE DELETE METHOD
async function deleteBtn(deletebtn,id) {
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

function editBtn(goallist,editbtn,id){
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

            goaltextvalue.textContent = ""
    });
}

//PUT METHOD
async function updateBtn(updatebtn,id,editbtn){
    updatebtn.addEventListener('click', async ()=>{
        $(`#updatebtn${id}`).hide();
        const newValue = document.querySelector(`#editInput${id}`);
        const newGoal = document.querySelector(`#goaltext${id}`);

        newGoal.textContent = newValue.value;

        $(newGoal).show();
        $(editbtn).show();
        $(newValue).hide();

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