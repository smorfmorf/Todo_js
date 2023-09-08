import initTodoApp from "./modules/logic.js";
import elements from "./modules/createElements.js";
const { render } = elements;

export const todoApp = {
  init: (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    render(app, title);

    // const todoApp = render(app, title);
    //tbody
    // const { tBody } = todoApp;
    // renderTodo(tBody);

    initTodoApp.initTodoApp();
  },
};
