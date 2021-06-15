import allTodos from './todos-storage';
import allProjects from './projects-storage';
import todoForm from './todos-form';
import sessionProjects from './projects-session';

const mainTodos = (projectTitle, projectId) => {
  const form = todoForm();
  const projects = allProjects();
  const sessions = sessionProjects();

  const mainTodosWrapper = document.createElement('div');
  mainTodosWrapper.classList.add('todo-items');
  const todosElements = allTodos();

  const nameTitle = document.createElement('h1');
  nameTitle.classList.add('project-title');
  nameTitle.innerText = projectTitle;

  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('cards-container');

  const addItemBtn = document.createElement('div');
  addItemBtn.classList.add('new-btn');
  addItemBtn.innerText = 'New To-Do +';

  const deleteProjectBtn = document.createElement('div');
  deleteProjectBtn.innerText = 'Delete this project';
  deleteProjectBtn.classList.add('delete-project-btn', 'd-none');

  if (projectId !== 1) {
    deleteProjectBtn.classList.remove('d-none');
  } else {
    deleteProjectBtn.classList.add('d-none');
  }

  deleteProjectBtn.addEventListener('click', () => {
    sessions.newSession('Default', 1);
    projects.deleteProject(projectId);
    todosElements.getTodos().forEach((element) => {
      if (projectId.toString() === element.project) {
        todosElements.deleteTodo(element.id);
      }
    });
  });

  mainTodosWrapper.appendChild(deleteProjectBtn);
  mainTodosWrapper.appendChild(nameTitle);
  mainTodosWrapper.appendChild(addItemBtn);
  mainTodosWrapper.appendChild(form.appendForm(projectId));
  mainTodosWrapper.appendChild(cardsContainer);

  addItemBtn.addEventListener('click', () => {
    form.showAddForm();
  });

  todosElements.getTodos().forEach((element) => {
    if (projectId.toString() === element.project) {
      const cardTodo = document.createElement('div');
      cardTodo.classList.add('card', 'd-flex', 'padding');

      const titleDateContainer = document.createElement('div');
      titleDateContainer.classList.add('d-flex', 'flex-column', 'title-date');

      const cardTitle = document.createElement('h3');
      cardTitle.classList.add('card-title');
      cardTitle.innerText = element.name;
      const cardDate = document.createElement('p');
      cardDate.classList.add('card-date');
      cardDate.innerText = element.dueDate;

      const cardDescription = document.createElement('div');
      cardDescription.innerText = element.description;
      cardDescription.classList.add('card-description', 'padding');

      titleDateContainer.appendChild(cardTitle);
      titleDateContainer.appendChild(cardDate);

      const buttonsWrapper = document.createElement('div');
      buttonsWrapper.classList.add('d-flex', 'flex-column');

      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.classList.add('btn');
      const editButton = document.createElement('button');
      editButton.innerText = 'Edit';
      editButton.classList.add('btn');

      buttonsWrapper.appendChild(deleteButton);
      buttonsWrapper.appendChild(editButton);

      cardTodo.appendChild(titleDateContainer);
      cardTodo.appendChild(cardDescription);
      cardTodo.appendChild(buttonsWrapper);

      if (element.priority === 'Medium') {
        cardTodo.classList.add('medium-priority');
      }

      if (element.priority === 'High') {
        cardTodo.classList.add('high-priority');
      }
      cardsContainer.appendChild(cardTodo);

      editButton.addEventListener('click', () => {
        form.showEditForm(element.id);
      });

      deleteButton.addEventListener('click', () => {
        todosElements.deleteTodo(element.id);
      });
    }
  });

  return mainTodosWrapper;
};

export default mainTodos;