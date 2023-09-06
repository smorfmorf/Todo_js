{
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

  function createHeader(title) {
    const h3 = document.createElement("h3");
    h3.className = "text-center";
    h3.textContent = title;
    return h3;
  }

  function createButtons(props) {
    const btns = props.map(({ className, type, text }) => {
      const button = document.createElement("button");
      button.className = className;
      button.type = type;
      button.textContent = text;
      return button;
    });

    return btns;
  }

  function createForm() {
    const form = document.createElement("form");
    form.classList.add(
      "d-flex",
      "align-items-center",
      "justify-content-center",
      "mb-3"
    );
    form.innerHTML = `
    <label class="form-group me-3 mb-0">
    <input type="text" class="form-control" placeholder="ввести задачу" />
  </label>
 `;
    const buttons = createButtons([
      {
        className: "btn btn-primary me-3",
        type: "submit",
        text: "Сохранить",
      },
      {
        className: "btn btn-warning",
        type: "reset",
        text: "Очистить",
      },
    ]);
    form.append(...buttons);

    return form;
  }

  function createTable() {
    const table = document.createElement("table");
    table.classList.add(
      "d-flex",
      "flex-column",
      "align-items-center",
      "table",
      "table-bordered",
      "table-hover"
    );

    const thead = document.createElement("thead");
    thead.innerHTML = `
    <tr>
    <th>№</th>
    <th>Задача</th>
    <th>Статус</th>
    <th>Действия</th>
  </tr>
    `;

    const tbody = document.createElement("tbody");

    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  }

  function createRow({ number, title, status }) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${number}</td>
    <td>${title}</td>
    <td>${status}</td>
    <td>
      <button class="btn btn-warning">Изменить</button>
      <button class="btn btn-danger">Удалить</button>
    </td>`;

    return tr;
  }

  // const data = [
  //   {
  //     number: 0,
  //     title: "Продукты",
  //     status: "В процессе",
  //   },
  // ];
  // *рендер tbody 1
  // function renderTodo(tbody) {
  //   const allRows = data.map(createRow);
  //   tbody.append(...allRows);
  // }

  function render(app, title) {
    const header = createHeader(title);
    const form = createForm();
    const table = createTable();

    app.append(header, form, table);

    return { tBody: table.tbody };
  }

  function init(selectorApp, title) {
    const app = document.querySelector(selectorApp);
    //* 2
    const todoApp = render(app, title);

    //tbody
    // const { tBody } = todoApp;
    // renderTodo(tBody);

    initTodoApp();
  }

  window.todoApp = init;
}
