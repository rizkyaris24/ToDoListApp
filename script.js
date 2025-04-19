//Run's LoadTask
document.addEventListener("DOMContentLoaded", loadTasks);

//AddTask Function
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;
    let taskList = document.getElementById("taskList");
    let currentTime = new Date().toLocaleString();
    let li = document.createElement("li");
    li.innerHTML = `<span onclick="toggleTask(this)">${taskText}</span> <span class="time">[${currentTime}]</span> <button class="edit-btn" onclick="editTask(this)">Edit</button> <button onclick="removeTask(this)">X</button>`;
    taskList.appendChild(li);
    taskInput.value = "";
    saveTasks();
}

//State that the task is completed
function toggleTask(element) {
    element.classList.toggle("completed");
    saveTasks();
}

//DeleteTask Function
function removeTask(button) {
    button.parentElement.remove();
    saveTasks();
}

//EditTask Function
function editTask(button) {
    let taskSpan = button.parentElement.querySelector("span");
    let newTaskText = prompt("Edit task:", taskSpan.textContent);
    if (newTaskText !== null && newTaskText.trim() !== "") {
        taskSpan.textContent = newTaskText.trim();
        saveTasks();
    }
}

//SaveTask Function
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        let timeText = li.querySelector(".time").textContent;
        tasks.push({ text: li.querySelector("span").textContent, time: timeText, completed: li.querySelector("span").classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//LoadTask from Local Storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `<span onclick="toggleTask(this)" class="${task.completed ? 'completed' : ''}">${task.text}</span> <span class="time">${task.time}</span> <button class="edit-btn" onclick="editTask(this)">Edit</button> <button onclick="removeTask(this)">X</button>`;
        taskList.appendChild(li);
    });
}