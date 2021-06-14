import { allProjects } from "./projects-storage";
import { addNewProject } from "./projects-form";

const body = document.body;
body.classList.add("d-flex");
const projectsArray = allProjects();

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

const todoForm = () => {
  const projectsObject = allProjects();
  const todosElements = allTodos();

  const newTodoForm = document.createElement("form");
  newTodoForm.classList.add("new-todo-form", "d-none", "box-shadow");
  const name = document.createElement("input");
  name.placeholder = "Name";
  name.setAttribute("required", "");
  name.maxLength = 50;
  const dueDate = document.createElement("input");
  dueDate.type = "date";
  dueDate.setAttribute("required", "");
  const priority = document.createElement("select");
  const priorityNone = document.createElement("option");
  priorityNone.innerText = "None";
  const priorityMedium = document.createElement("option");
  priorityMedium.innerText = "Medium";
  const priorityHigh = document.createElement("option");
  priorityHigh.innerText = "High";
  priority.appendChild(priorityNone);
  priority.appendChild(priorityMedium);
  priority.appendChild(priorityHigh);

  const projectsInput = document.createElement("select");
  projectsObject.getProjects().forEach((element) => {
    const projectOption = document.createElement("option");
    projectOption.innerText = element.title;
    projectOption.value = element.id;
    projectsInput.appendChild(projectOption);
  });

  const description = document.createElement("textarea");
  description.setAttribute("rows", "3");
  description.placeholder = "Description";
  description.maxLength = 250;
  description.setAttribute("required", "");

  const submitBtn = document.createElement("button");
  submitBtn.classList.add("btn");
  submitBtn.innerText = "Create to-do";

  const labelDate = document.createElement("label");
  labelDate.innerText = "Due Date";
  const labelPriority = document.createElement("label");
  labelPriority.innerText = "Select priority";
  const labelProject = document.createElement("label");
  labelProject.innerText = "For the project:";

  newTodoForm.appendChild(name);
  newTodoForm.appendChild(labelDate);
  newTodoForm.appendChild(dueDate);
  newTodoForm.appendChild(labelPriority);
  newTodoForm.appendChild(priority);
  newTodoForm.appendChild(labelProject);
  newTodoForm.appendChild(projectsInput);
  newTodoForm.appendChild(description);
  newTodoForm.appendChild(submitBtn);

  return {
    appendForm: () => {
      return newTodoForm;
    },
    showAddForm: () => {
      submitBtn.innerText = "Create to-do";
      if (newTodoForm.classList.contains("d-none")) {
        newTodoForm.classList.replace("d-none", "d-flex");
      } else {
        newTodoForm.classList.replace("d-flex", "d-none");
      }

      newTodoForm.addEventListener("submit", (event) => {
        const nameVal = name.value;
        const projectVal = projectsInput.value;
        const dueDateVal = dueDate.value;
        const priorityVal = priority.value;
        const descriptionVal = description.value;

        todosElements.setTodo(
          nameVal,
          projectVal,
          dueDateVal,
          priorityVal,
          descriptionVal
        );
      });
    },
    showEditForm: (todoId) => {
      if (newTodoForm.classList.contains("d-none")) {
        newTodoForm.classList.replace("d-none", "d-flex");
      } else {
        newTodoForm.classList.replace("d-flex", "d-none");
      }
      submitBtn.innerText = "Edit";

      newTodoForm.addEventListener("submit", (event) => {
        const nameVal = name.value;
        const projectVal = projectsInput.value;
        const dueDateVal = dueDate.value;
        const priorityVal = priority.value;
        const descriptionVal = description.value;

        todosElements.editTodo(
          todoId,
          nameVal,
          projectVal,
          dueDateVal,
          priorityVal,
          descriptionVal
        );
      });
    },
  };
};

const mainTodos = (projectTitle, projectId) => {
  const form = todoForm();

  const mainTodosWrapper = document.createElement("div");
  mainTodosWrapper.classList.add("todo-items");
  const todosElements = allTodos();

  const nameTitle = document.createElement("h1");
  nameTitle.classList.add("project-title");
  nameTitle.innerText = projectTitle;

  const cardsContainer = document.createElement("div");
  cardsContainer.classList.add("cards-container");

  const addItemBtn = document.createElement("div");
  addItemBtn.classList.add("new-btn");
  addItemBtn.innerText = "New To-Do +";

  mainTodosWrapper.appendChild(nameTitle);
  mainTodosWrapper.appendChild(addItemBtn);
  mainTodosWrapper.appendChild(form.appendForm(projectId));
  mainTodosWrapper.appendChild(cardsContainer);

  addItemBtn.addEventListener("click", () => {
    form.showAddForm();
  });

  todosElements.getTodos().forEach((element) => {
    if (projectId == element.project) {
      const cardTodo = document.createElement("div");
      cardTodo.classList.add("card", "d-flex", "padding");

      const titleDateContainer = document.createElement("div");
      titleDateContainer.classList.add("d-flex", "flex-column", "title-date");

      const cardTitle = document.createElement("h3");
      cardTitle.classList.add("card-title");
      cardTitle.innerText = element.name;
      const cardDate = document.createElement("p");
      cardDate.classList.add("card-date");
      cardDate.innerText = element.dueDate;

      const cardDescription = document.createElement("div");
      cardDescription.innerText = element.description;
      cardDescription.classList.add("card-description", "padding");

      titleDateContainer.appendChild(cardTitle);
      titleDateContainer.appendChild(cardDate);

      const buttonsWrapper = document.createElement("div");
      buttonsWrapper.classList.add("d-flex", "flex-column");

      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.classList.add("btn");
      const editButton = document.createElement("button");
      editButton.innerText = "Edit";
      editButton.classList.add("btn");

      buttonsWrapper.appendChild(deleteButton);
      buttonsWrapper.appendChild(editButton);

      cardTodo.appendChild(titleDateContainer);
      cardTodo.appendChild(cardDescription);
      cardTodo.appendChild(buttonsWrapper);

      if (element.priority === "Medium") {
        cardTodo.classList.add("medium-priority");
      }

      if (element.priority === "High") {
        cardTodo.classList.add("high-priority");
      }
      cardsContainer.appendChild(cardTodo);

      editButton.addEventListener("click", () => {
        form.showEditForm(element.id);
      });

      deleteButton.addEventListener("click", () => {
        todosElements.deleteTodo(element.id);
      });
    }
  });

  return mainTodosWrapper;
};

const aside = () => {
  const projects = document.createElement("div");

  const documentTitle = document.createElement("h1");
  documentTitle.innerText = "To-do list.";
  documentTitle.classList.add("main-title", "padding");
  projects.appendChild(documentTitle);

  const projectsList = document.createElement("ul");
  projectsList.classList.add("d-flex", "flex-column");
  projects.appendChild(projectsList);

  const projectsObject = allProjects();

  //--------------------------------------------- CONSOLE BTN
//-------------------------------- DELETE BTN
  const deleteBtn = document.createElement("div");
  deleteBtn.innerText = `Delete this project`;
  deleteBtn.classList.add("new-btn", "d-none");

  projects.appendChild(deleteBtn);


  //--------------------------------------------- DELETE BTN

  projectsObject.getProjects().forEach((element) => {
    const projectItem = document.createElement("li");
    projectItem.classList.add("project-item");

    projectItem.classList.remove("bg-dark");
    projectItem.innerText = element.title;
    projectsList.appendChild(projectItem);

    projectItem.addEventListener("click", () => {


      body.replaceChild(mainTodos(element.title, element.id), body.children[3]);

      if (element.id !== 1){
        deleteBtn.classList.remove("d-none")
      } else{
        deleteBtn.classList.add("d-none")
      }
      deleteBtn.addEventListener("click", () => {
        projectsObject.deleteProject(element.id);
      });
    });
  });

  projects.appendChild(addNewProject());

  return projects;
};

body.appendChild(aside());
body.appendChild(
  mainTodos(
    projectsArray.getProjects()[0].title,
    projectsArray.getProjects()[0].id
  )
);

// const mainTodosDontChangePage =()=>{
//   const newProjectTitlePassValue = projectsArray.getProjects()[0].title
//   const newProjectIdPassValue  = projectsArray.getProjects()[0].id
//   return{
//     setNewProjectTitle: (projectTitle)=>{
//       newProjectTitlePassValue = projectTitle
//       return newProjectTitlePassValue
//     },
//     setNewProjectId: (projectId)=>{
//       newProjectIdPassValue = projectId
//       return newProjectIdPassValue
//     }
//   }
// }
