document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task-input');
    const prioritySelector = document.getElementById('priority-selector');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    const tasks = [];

    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        const priority = parseInt(prioritySelector.value);
        if (taskText !== '') {
            addTask(taskText, priority);
            newTaskInput.value = '';
        }
    });

    function addTask(taskText, priority) {
        const task = { text: taskText, priority: priority };
        tasks.push(task);
        sortTasks();
        renderTasks();
    }

    function sortTasks() {
        tasks.sort((a, b) => a.priority - b.priority);
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('todo');

            const taskValue = document.createElement('input');
            taskValue.type = 'text';
            taskValue.value = task.text;
            taskValue.disabled = false;
            taskValue.classList.add('todo__value');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('todo__checkbox');
            checkbox.addEventListener('change', () => {
                taskValue.disabled = checkbox.checked;
                if (checkbox.checked) {
                    taskValue.classList.add('completed');
                } else {
                    taskValue.classList.remove('completed');
                }
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                renderTasks();
            });

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-btn');
            editButton.addEventListener('click', () => {
                taskValue.disabled = false;
                taskValue.focus();
                taskValue.select();
            });

            taskDiv.appendChild(checkbox);
            taskDiv.appendChild(taskValue);
            taskDiv.appendChild(editButton);
            taskDiv.appendChild(deleteButton);
            taskList.appendChild(taskDiv);
        });
    }
});
