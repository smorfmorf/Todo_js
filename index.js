const username = prompt("Введите ваше имя:");

const userTasks = JSON.parse(localStorage.getItem(username)) || [];
console.log("userTasks: ", userTasks);

const taskInput = document.querySelector(".form-control");
const saveButton = document.querySelector(".btn-primary");
//поле ввода - блокируем
taskInput.addEventListener("input", () => {
  if (taskInput.value.trim() === "") {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
});

saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const task = {
      id: Date.now(),
      text: taskText,
      status: "В процессе",
    };
    userTasks.push(task);
    localStorage.setItem(username, JSON.stringify(userTasks));
    taskInput.value = "";
    renderTasks(userTasks);
  }
});

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !saveButton.disabled) {
    saveButton.click();
  }
});

function completeTask(taskId) {
  const task = userTasks.find((t) => t.id === taskId);
  if (task) {
    task.status = "Выполнена";
    localStorage.setItem(username, JSON.stringify(userTasks));
    renderTasks(userTasks);
  }
}

function deleteTask(taskId) {
  const newUsers = userTasks.filter((el) => el.id !== taskId.id);
  userTasks = newUsers;

  localStorage.setItem(username, JSON.stringify(userTasks));
  renderTasks(userTasks);
}

// function renderTasks(tasks) {
//   const tableBody = document.querySelector("tbody");
//   tableBody.innerHTML = "";

//   tasks.forEach((task, index) => {
//     const row = document.createElement("tr");
//     // Создайте ячейки для номера, задачи, статуса и действий
//     // ...
//     // Добавьте кнопки "Удалить" и "Завершить" с обработчиками событий
//     // ...
//     tableBody.appendChild(row);
//   });
// }

function renderTasks(tasks) {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";

  tasks.forEach((task, index) => {
    const row = document.createElement("tr");

    // Создайте ячейку для номера
    const numberCell = document.createElement("td");
    numberCell.textContent = index + 1;
    row.append(numberCell);

    // Создайте ячейку для задачи
    const taskCell = document.createElement("td");
    taskCell.textContent = task.text;
    row.append(taskCell);

    // Создайте ячейку для статуса
    const statusCell = document.createElement("td");
    statusCell.textContent = task.status;
    row.append(statusCell);

    // Создайте ячейку для действий (кнопки "Удалить" и "Завершить")
    const actionsCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.addEventListener("click", () => {
      deleteTask(task.id); // Вызовите функцию для удаления задачи
    });
    actionsCell.append(deleteButton);

    const completeButton = document.createElement("button");
    completeButton.textContent = "Завершить";
    completeButton.classList.add("btn", "btn-success");
    completeButton.addEventListener("click", () => {
      completeTask(task.id); // Вызовите функцию для завершения задачи
    });
    actionsCell.append(completeButton);

    row.append(actionsCell);

    tableBody.append(row);
  });
}
// Инициализация рендера задач при запуске приложения
renderTasks(userTasks);
