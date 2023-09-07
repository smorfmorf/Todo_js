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

function createRow({ id, text, status, type }) {
  const tr = document.createElement("tr");
  tr.classList.add("row-tr");
  tr.innerHTML = `
    <td class="id">${id}</td>
    <td class="text ${type ? "text-decoration-line-through" : ""}">${text}</td>
    <td class="st">${status}</td>
    <td class="actions">
      <button class="btn btn-warning">Изменить</button>
      <button class="btn btn-danger">Удалить</button>
    </td>`;

  return tr;
}

const data = [
  {
    number: 0,
    title: "Продукты",
    status: "В процессе",
  },
];
// *рендер tbody 1
function renderTodo(tbody) {
  const allRows = data.map(createRow);
  tbody.append(...allRows);
}

function render(app, title) {
  const header = createHeader(title);
  const form = createForm();
  const table = createTable();

  app.append(header, form, table);

  return { tBody: table.tbody };
}

export default {
  createHeader,
  createButtons,
  createForm,
  createTable,
  createRow,
  renderTodo,
  render,
};
