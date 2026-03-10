let inputTask = document.getElementById('input-task');
let addBtn = document.getElementById('add-btn');
let tbody = document.getElementById('tbody');



function renderTask (taskValue) {
    let tr = document.createElement('tr');

    let tdSr = document.createElement('td');
    tdSr.textContent = '#';
    
    let tdTask = document.createElement('td');
    tdTask.textContent = taskValue;

    let tdStatus = document.createElement('td');
    let input = document.createElement('input');
    input.type = 'checkbox';
    tdStatus.appendChild(input);

    let tdEdit = document.createElement('td');
    let editBtn = document.createElement('button');
    editBtn.textContent = 'EDIT';
    editBtn.className = 'btn btn-primary';
    tdEdit.appendChild(editBtn) 

    let tdDelete = document.createElement('td');
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'DELETE';
    deleteBtn.className = 'btn btn-danger';
    tdDelete.appendChild(deleteBtn);




    tr.append(tdSr, tdTask, tdStatus, tdEdit, tdDelete);
    tbody.appendChild(tr);

};


addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let taskValue = inputTask.value.trim();
    if(taskValue === ''){
        Swal.fire({
  title: "Enter Task",
//   text: "That thing is still around?",
//   icon: "question"
     theme: 'dark'
});
        inputTask.focus();
        return;
    };

    

        
    renderTask(taskValue);    
    inputTask.value = '';
    inputTask.focus();
    
})