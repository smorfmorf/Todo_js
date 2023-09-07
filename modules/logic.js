import createElements from "./createElements.js";
const { createRow } = createElements;

// const username = prompt("Введите ваше имя:");
const username = "max";
let userTasks = JSON.parse(localStorage.getItem(username)) || [];

function completeTask(event, taskId) {
  const target = event.target;
  const tr = target.closest("tr");
  const td = tr.querySelector(".st");
  const text = tr.querySelector(".text");
  console.log("text: ", text);
  text.classList.add("text-decoration-line-through");
  td.textContent = "Выполнена";

  const task = userTasks.find((t) => t.id == taskId);
  console.log("task: ", task);
  if (task) {
    task.status = "Выполнена";
    task.type = true;
    localStorage.setItem(username, JSON.stringify(userTasks));
  }
}

function deleteTask(event, taskId) {
  const target = event.target;
  const tr = target.closest("tr");
  console.log("tr: ", tr);
  tr.remove();
  const tableBody = document.querySelector("tbody");
  const rows = tableBody.querySelectorAll("tr");
  rows.forEach((row, index) => {
    const cells = row.querySelectorAll("td");
    cells[0].textContent = index + 1; // Обновляем индексы в первой ячейке (нумерация с 1)
  });

  //* filter для массива userTasks
  userTasks = userTasks.filter((task) => task.id !== taskId);
  // Обновляем индексы в массиве userTasks
  userTasks = userTasks.map((task, index) => ({ ...task, id: index + 1 }));
  localStorage.setItem(username, JSON.stringify(userTasks));
}

function renderTasks() {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";
  userTasks.forEach((task, index) => {
    const row = createRow({
      id: index + 1,
      text: task.text,
      status: task.status,
      type: task.type,
    });

    tableBody.append(row);
  });

  return tableBody;
}

function initTodoApp() {
  const tableBody = renderTasks();

  const taskInput = document.querySelector(".form-control");

  const saveButton = document.querySelector(".btn-primary");
  const clearButton = document.querySelector(".btn-warning");

  clearButton.addEventListener("click", () => {
    saveButton.disabled = true;
  });

  saveButton.disabled = true;

  taskInput.addEventListener("input", () => {
    if (taskInput.value.trim() === "") {
      saveButton.disabled = true;
    } else {
      saveButton.disabled = false;
    }
  });

  saveButton.addEventListener("click", addTask);
  function addTask(e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();

    const task = {
      id: userTasks.length + 1,
      text: taskText,
      status: "В процессе",
      type: false,
    };

    userTasks.push(task);
    console.log("userTasks: ", userTasks);
    taskInput.value = "";
    localStorage.setItem(username, JSON.stringify(userTasks));

    const rowHTML = createRow(task);
    tableBody.append(rowHTML);

    const id = task.id;

    //!удаляем задачу
    const actionsCell = rowHTML.querySelector(".actions");
    console.log("actionsCell: ", actionsCell);
    const deleteButton = actionsCell.querySelector(".btn-danger");
    deleteButton.addEventListener("click", (event) => {
      deleteTask(event, id);
    });
    //!выполняем задачу
    const completeButton = actionsCell.querySelector(".btn-warning");
    completeButton.addEventListener("click", (event) => {
      completeTask(event, id);
    });
  }

  const rows = tableBody.querySelectorAll("tr");
  rows.forEach((task) => {
    const id = +task.querySelector(".id").textContent;
    //!удаляем задачу
    const actionsCell = task.querySelector(".actions");
    const deleteButton = actionsCell.querySelector(".btn-danger");
    deleteButton.addEventListener("click", (event) => {
      deleteTask(event, id);
    });
    //!выполняем задачу
    const completeButton = actionsCell.querySelector(".btn-warning");
    completeButton.addEventListener("click", (event) => {
      completeTask(event, id);
    });
  });

  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !saveButton.disabled) {
      saveButton.click();
    }
    saveButton.disabled = true;
  });
}

export default {
  initTodoApp,
};
