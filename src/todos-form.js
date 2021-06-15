import allProjects from './projects-storage';
import allTodos from './todos-storage';

const todoForm = () => {
  const projectsObject = allProjects();
  const todosElements = allTodos();

  const newTodoForm = document.createElement('form');
  newTodoForm.classList.add('new-todo-form', 'd-none', 'box-shadow');
  const name = document.createElement('input');
  name.placeholder = 'Name';
  name.setAttribute('required', '');
  name.maxLength = 50;
  const dueDate = document.createElement('input');
  dueDate.type = 'date';
  dueDate.setAttribute('required', '');
  const priority = document.createElement('select');
  const priorityNone = document.createElement('option');
  priorityNone.innerText = 'None';
  const priorityMedium = document.createElement('option');
  priorityMedium.innerText = 'Medium';
  const priorityHigh = document.createElement('option');
  priorityHigh.innerText = 'High';
  priority.appendChild(priorityNone);
  priority.appendChild(priorityMedium);
  priority.appendChild(priorityHigh);

  const projectsInput = document.createElement('select');
  projectsObject.getProjects().forEach((element) => {
    const projectOption = document.createElement('option');
    projectOption.innerText = element.title;
    projectOption.value = element.id;
    projectsInput.appendChild(projectOption);
  });

  const description = document.createElement('textarea');
  description.setAttribute('rows', '3');
  description.placeholder = 'Description';
  description.maxLength = 250;
  description.setAttribute('required', '');

  const submitBtn = document.createElement('button');
  submitBtn.classList.add('btn');
  submitBtn.innerText = 'Create to-do';

  const labelDate = document.createElement('label');
  labelDate.innerText = 'Due Date';
  const labelPriority = document.createElement('label');
  labelPriority.innerText = 'Select priority';
  const labelProject = document.createElement('label');
  labelProject.innerText = 'For the project:';

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
    appendForm: () => newTodoForm,
    showAddForm: () => {
      submitBtn.innerText = 'Create to-do';
      if (newTodoForm.classList.contains('d-none')) {
        newTodoForm.classList.replace('d-none', 'd-flex');
      } else {
        newTodoForm.classList.replace('d-flex', 'd-none');
      }

      newTodoForm.addEventListener('submit', () => {
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
          descriptionVal,
        );
      });
    },
    showEditForm: (todoId) => {
      if (newTodoForm.classList.contains('d-none')) {
        newTodoForm.classList.replace('d-none', 'd-flex');
      } else {
        newTodoForm.classList.replace('d-flex', 'd-none');
      }
      submitBtn.innerText = 'Edit';

      newTodoForm.addEventListener('submit', () => {
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
          descriptionVal,
        );
      });
    },
  };
};

export default todoForm;