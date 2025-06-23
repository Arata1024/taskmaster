import { saveTasks, loadTasks } from './storage.js';

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');

let tasks = loadTasks();
let currentFilter = 'all';

// Инициализация
renderTasks();

// Добавление задачи
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// Фильтрация
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

function addTask() {
  const text = taskInput.value.trim();
  if (text === '') return;

  tasks.push({ id: Date.now(), text, completed: false });
  saveTasks(tasks);
  renderTasks();
  taskInput.value = '';
  taskInput.focus();
}

function renderTasks() {
  taskList.innerHTML = '';

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    taskList.innerHTML = '<p class="empty">Нет задач</p>';
    return;
  }

  filteredTasks.forEach(task => {
    const taskEl = document.createElement('li');
    taskEl.className = `task-item ${task.completed ? 'completed' : ''}`;
    taskEl.innerHTML = `
      <button class="task-btn complete-btn">
        <i class="fas fa-${task.completed ? 'check-circle' : 'circle'}"></i>
      </button>
      <span class="task-content">${task.text}</span>
      <div class="task-actions">
        <button class="task-btn edit-btn">
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button class="task-btn delete-btn">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `;

    const completeBtn = taskEl.querySelector('.complete-btn');
    const editBtn = taskEl.querySelector('.edit-btn');
    const deleteBtn = taskEl.querySelector('.delete-btn');

    completeBtn.addEventListener('click', () => toggleComplete(task.id));
    deleteBtn.addEventListener('click', () => deleteTask(task.id));
    editBtn.addEventListener('click', () => editTask(task.id));

    taskList.appendChild(taskEl);
  });
}

function toggleComplete(id) {
  tasks = tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks(tasks);
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks(tasks);
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(task => task.id === id);
  const newText = prompt('Редактировать задачу:', task.text);
  if (newText !== null && newText.trim() !== '') {
    task.text = newText.trim();
    saveTasks(tasks);
    renderTasks();
  }
}