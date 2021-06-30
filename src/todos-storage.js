function Todo(name, project, dueDate, priority, description, id) {
  this.name = name;
  this.project = project;
  this.dueDate = dueDate;
  this.priority = priority;
  this.description = description;
  this.id = id;
}

const allTodos = () => {
  let todos = [];
  return {
    setTodo: (name, project, dueDate, priority, description) => {
      if (localStorage.getItem("todos")) {
        todos = JSON.parse(localStorage.getItem("todos"));
      } else {
        todos = [];
      }

      if (
        name === undefined ||
        project === undefined ||
        dueDate === undefined ||
        priority === undefined ||
        description === undefined
      ) {
        throw new Error("One or more properties are undefined!");
      }

      const id = todos.length + 1;
      const newTodo = new Todo(
        name,
        project,
        dueDate,
        priority,
        description,
        id
      );
      todos.push(newTodo);

      localStorage.setItem("todos", JSON.stringify(todos));
    },
    getTodos: () => {
      if (localStorage.getItem("todos")) {
        todos = JSON.parse(localStorage.getItem("todos"));
      } else {
        todos = [];
      }
      return todos;
    },
    deleteTodo: (todoId) => {
      if (localStorage.getItem("todos")) {
        todos = JSON.parse(localStorage.getItem("todos"));
      } else {
        todos = [];
      }

      if (todoId === undefined) {
        throw new Error("The to-do id is undefined!");
      }

      for (let i = 0; i < todos.length; i += 1) {
        if (todoId === todos[i].id) {
          todos.splice(i, 1);
          localStorage.setItem("todos", JSON.stringify(todos));
          window.location.reload();
        }
      }
    },
    editTodo: (todoId, name, project, dueDate, priority, description) => {
      if (localStorage.getItem("todos")) {
        todos = JSON.parse(localStorage.getItem("todos"));
      } else {
        todos = [];
      }

      if (
        todoId === undefined ||
        name === undefined ||
        project === undefined ||
        dueDate === undefined ||
        priority === undefined ||
        description === undefined
      ) {
        throw new Error("One or more properties are undefined!");
      }

      for (let i = 0; i < todos.length; i += 1) {
        if (todoId === todos[i].id) {
          todos[i].name = name;
          todos[i].project = project;
          todos[i].dueDate = dueDate;
          todos[i].priority = priority;
          todos[i].description = description;
          localStorage.setItem("todos", JSON.stringify(todos));
          window.location.reload();
        }
      }
    },
  };
};

export default allTodos;
