let inputTask = document.getElementById('input-task');
let addBtn = document.getElementById('add-btn');
let tbody = document.getElementById('tbody');

let arrayToStoreTasks = [];

function saveArrayToLocalStorage () {
    localStorage.setItem('tasksArray', JSON.stringify(arrayToStoreTasks))
};

function toLoadDataFromLocalStorage () {
    let storadData = localStorage.getItem('tasksArray');
    if(storadData){
        arrayToStoreTasks = JSON.parse(storadData);
        arrayToStoreTasks.forEach(eachTask => renderTask(eachTask))
    }
}

toLoadDataFromLocalStorage();

function renderTask(tasksObject) {
    let tr = document.createElement('tr');

    let tdSr = document.createElement('td');
    tdSr.textContent = tbody.rows.length + 1;

    let tdTask = document.createElement('td');
    tdTask.textContent = tasksObject.title;

    let tdStatus = document.createElement('td');
    let input = document.createElement('input');
    input.type = 'checkbox';

    input.addEventListener('change', () => {
        tasksObject.status = input.checked;
        saveArrayToLocalStorage();

        if (input.checked) {
            tdTask.style.textDecoration = 'line-through';
        } else {
            tdTask.style.textDecoration = '';
        }
    })
    tdStatus.appendChild(input);

    let tdEdit = document.createElement('td');
    let editBtn = document.createElement('button');
    editBtn.textContent = 'EDIT';
    editBtn.className = 'btn btn-primary';

    editBtn.addEventListener('click', () => {
        // Will be added
    })

    tdEdit.appendChild(editBtn)

    let tdDelete = document.createElement('td');
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'DELETE';
    deleteBtn.className = 'btn btn-danger';

    deleteBtn.addEventListener('click', () => {
        // Will be add
    })
    tdDelete.appendChild(deleteBtn);

    tr.append(tdSr, tdTask, tdStatus, tdEdit, tdDelete);
    tbody.appendChild(tr);

    inputTask.value = '';
    inputTask.focus();

};


addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let taskValue = inputTask.value.trim();
    if (taskValue === '') {
        Swal.fire({
            title: "Enter Task",
            text: "",
            // icon: "question"
            theme : 'dark'
        });
        inputTask.focus();
        return;         
    };

    const tasksObject = {
        title : taskValue,
        staus : false
    };

    arrayToStoreTasks.push(tasksObject);
    saveArrayToLocalStorage();
    renderTask(tasksObject);
});

// localStorage.clear()
