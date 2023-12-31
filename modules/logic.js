import createElements from "./createElements.js";
const { createRow } = createElements;

// const username = prompt("Введите ваше имя:");
let username = "max";
let userTasks = JSON.parse(localStorage.getItem(username)) || [];

function completeTask(event, taskId) {
  const target = event.target;
  const tr = target.closest("tr");
  const td = tr.querySelector(".st");
  const text = tr.querySelector(".text");
  console.log("text: ", text);
  tr.style.backgroundColor = "rgb(113, 188, 157)";
  text.classList.add("text-decoration-line-through");
  td.textContent = "Выполнена";

  const task = userTasks.find((t) => t.id == taskId);
  console.log("task: ", task);
  if (task) {
    task.status = "Выполнена";
    task.type = true;
    task.color = true;
    localStorage.setItem(username, JSON.stringify(userTasks));
  }
}

// function deleteTask(event, taskId) {
//   const target = event.target;
//   const tr = target.closest("tr");
//   console.log("tr: ", tr);
//   tr.remove();

//   const tableBody = document.querySelector("tbody");
//   const rows = tableBody.querySelectorAll("tr");
//   rows.forEach((row, index) => {
//     const cells = row.querySelectorAll("td");
//     cells[0].textContent = index + 1; // Обновляем индексы в первой ячейке (нумерация с 1)
//   });

//   //* filter для массива userTasks
//   userTasks = userTasks.filter((task) => task.id !== taskId);
//   // Обновляем индексы в массиве userTasks
//   userTasks = userTasks.map((task, index) => ({ ...task, id: index + 1 }));
//   localStorage.setItem(username, JSON.stringify(userTasks));
// }

function renderTasks() {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";
  userTasks.forEach((task, index) => {
    const row = createRow({
      id: index + 1,
      text: task.text,
      status: task.status,
      type: task.type,
      color: task.color,
    });

    tableBody.append(row);
  });

  return tableBody;
}

function initTodoApp() {
  renderTasks();

  const taskInput = document.querySelector(".form-control");
  const saveButton = document.querySelector(".btn-primary");

  saveButton.disabled = true;

  taskInput.addEventListener("input", () => {
    if (taskInput.value.trim() === "") {
      saveButton.disabled = true;
    } else {
      saveButton.disabled = false;
    }
  });

  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !saveButton.disabled) {
      saveButton.click();
    }
    saveButton.disabled = true;
  });

  const clearButton = document.querySelector(".btn-warning");
  clearButton.addEventListener("click", () => {
    saveButton.disabled = true;
  });

  deleteTask();
  addTask2();
  completeTask2();
}

function completeTask2() {
  const tableBody = document.querySelector("tbody");
  tableBody.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("btn-warning")) {
      const contact = target.closest("tr");
      const id = +contact.querySelector(".id").textContent;
      completeTask(e, id);
    }
  });
}

function addTask2() {
  const tableBody = document.querySelector("tbody");
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    //можно и так вытащить value из input
    // const formData = new FormData(form);
    // const obj = Object.fromEntries(formData);

    let input = form.input.value.trim();
    const task = {
      id: userTasks.length + 1,
      text: input,
      status: "В процессе",
      type: false,
      color: false,
    };
    form.reset();

    userTasks.push(task);
    localStorage.setItem(username, JSON.stringify(userTasks));

    const rowHTML = createRow(task);
    tableBody.append(rowHTML);
  });
}

//!Функция удаления задачи
function deleteTask() {
  const tableBody = document.querySelector("tbody");
  tableBody.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("btn-danger")) {
      const contact = target.closest("tr");
      const id = +contact.querySelector(".id").textContent;
      contact.remove();

      const rows = tableBody.querySelectorAll("tr");
      rows.forEach((row, index) => {
        const cells = row.querySelectorAll("td");
        cells[0].textContent = index + 1; // Обновляем индексы в первой ячейке (нумерация с 1)
      });

      //* filter для массива userTasks
      userTasks = userTasks.filter((task) => task.id !== id);
      // Обновляем индексы в массиве userTasks
      userTasks = userTasks.map((task, index) => ({
        ...task,
        id: index + 1,
      }));
      localStorage.setItem(username, JSON.stringify(userTasks));
      console.log("userTasks: ", userTasks);
    }
  });
}

window.addEventListener("click", () => {
  console.log(userTasks);
});

export default {
  initTodoApp,
  deleteTask,
};
