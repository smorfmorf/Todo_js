const username = prompt("Введите ваше имя:");
let userTasks = JSON.parse(localStorage.getItem(username)) || [];

function completeTask(taskId) {
  const task = userTasks.find((t) => t.id === taskId);
  if (task) {
    task.status = "Выполнена";
    //text-decoration-line-through
    console.log(task);

    localStorage.setItem(username, JSON.stringify(userTasks));
    renderTasks(userTasks);
  }
}

function deleteTask(taskId) {
  userTasks = userTasks.filter((el) => el.id !== taskId);
  localStorage.setItem(username, JSON.stringify(userTasks));
  renderTasks(userTasks);
}

function renderTasks(tasks) {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";

  tasks.forEach((task, index) => {
    const row = document.createElement("tr");

    const numberCell = document.createElement("td");
    numberCell.textContent = index + 1;
    row.append(numberCell);

    const taskCell = document.createElement("td");
    taskCell.textContent = task.text;
    row.append(taskCell);

    const statusCell = document.createElement("td");
    statusCell.textContent = task.status;
    row.append(statusCell);

    const actionsCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.addEventListener("click", () => {
      deleteTask(task.id);
    });
    actionsCell.append(deleteButton);

    const completeButton = document.createElement("button");
    completeButton.textContent = "Завершить";
    completeButton.classList.add("btn", "btn-success");
    completeButton.addEventListener("click", () => {
      completeTask(task.id);
    });
    actionsCell.append(completeButton);

    row.append(actionsCell);

    tableBody.append(row);
  });
}

function initTodoApp() {
  renderTasks(userTasks);

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
      taskInput.value = "";
      localStorage.setItem(username, JSON.stringify(userTasks));
      renderTasks(userTasks);
    }
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
