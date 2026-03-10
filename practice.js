let inputTask = document.getElementById('input-task');
let addBtn = document.getElementById('add-btn');
let tbody = document.getElementById('tbody');

let tasks = [];

function saveTask() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach(task => renderTask(task));
    }
}

// ✅ fixes serial numbers after delete
function updateSerialNumbers() {
    let rows = tbody.querySelectorAll('tr');
    rows.forEach((row, index) => {
        row.cells[0].textContent = index + 1;
    });
}

function renderTask(task) {
    let tr = document.createElement('tr');
    tr.dataset.id = task.id;

    let tdSr = document.createElement('td');
    tdSr.textContent = tbody.rows.length + 1;

    let tdTask = document.createElement('td');
    tdTask.textContent = task.title;

    if (task.completed) {
        tdTask.style.textDecoration = 'line-through';
    }

    let tdStatus = document.createElement('td');
    let input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = task.completed;
    input.addEventListener('change', () => {
        task.completed = input.checked;
        saveTask();
        if (input.checked) {
            tdTask.style.textDecoration = 'line-through';
        } else {
            tdTask.style.textDecoration = '';
        }
    });
    tdStatus.appendChild(input);

    let tdEdit = document.createElement('td');
    let editBtn = document.createElement('button');
    editBtn.textContent = 'EDIT';
    editBtn.className = 'btn btn-primary';
    editBtn.addEventListener('click', () => {
        if (editBtn.textContent === 'EDIT') {
            inputTask.value = task.title;
            inputTask.focus();
            editBtn.textContent = 'SAVE';
            editBtn.className = 'btn btn-success';
        } else {
            let updatedValue = inputTask.value.trim();
            if (updatedValue === '') {
                alert('Task cannot be empty');
                inputTask.focus();
                return;
            }
            task.title = updatedValue;
            tdTask.textContent = updatedValue;
            saveTask();
            editBtn.textContent = 'EDIT';
            editBtn.className = 'btn btn-primary';
            inputTask.value = '';
            inputTask.focus();
        }
    });
    tdEdit.appendChild(editBtn);

    let tdDelete = document.createElement('td');
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'DELETE';
    deleteBtn.className = 'btn btn-danger';

    // ✅ DELETE logic
    deleteBtn.addEventListener('click', () => {
        tasks = tasks.filter(t => t.id !== task.id); // remove from array
        saveTask();                                   // update localStorage
        tr.remove();                                  // remove from DOM
        updateSerialNumbers();                        // fix serial numbers
    });
    tdDelete.appendChild(deleteBtn);

    tr.append(tdSr, tdTask, tdStatus, tdEdit, tdDelete);
    tbody.appendChild(tr);

    inputTask.value = '';
    inputTask.focus();
}

addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let taskValue = inputTask.value.trim();
    if (taskValue === '') {
        alert('Must write your task first');
        inputTask.focus();
        return;
    }

    let task = { id: Date.now(), title: taskValue, completed: false };
    tasks.push(task);
    saveTask();
    renderTask(task);
});

loadTasks();