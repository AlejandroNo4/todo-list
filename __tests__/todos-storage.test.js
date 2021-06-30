import allTodos from '../src/todos-storage';

let todo;

beforeAll(() => {
  delete window.location;
  window.location = { reload: jest.fn() };
});

beforeEach(() => {
  todo = allTodos();
});

afterEach(() => {
  const todoRestore = [];
  JSON.parse(localStorage.getItem('todos'));
  localStorage.setItem('todos', JSON.stringify(todoRestore));
});

it('The default todo storage must be empty', () => {
  expect(todo.getTodos()).toEqual([]);
});

it('Set a todo with all given arguments', () => {
  todo.setTodo(
    'Test Name',
    'Default',
    '2021-06-30',
    'None',
    'Test description',
  );
  expect(todo.getTodos()[0]).toEqual({
    name: 'Test Name',
    project: 'Default',
    dueDate: '2021-06-30',
    priority: 'None',
    description: 'Test description',
    id: 1,
  });
});

it('increase the id with each todo created', () => {
  todo.setTodo(
    'Test Name',
    'Default',
    '2021-06-30',
    'None',
    'Test description',
  );
  todo.setTodo(
    'Test Name two',
    'Default',
    '2021-06-31',
    'None',
    'Test description two',
  );
  expect(todo.getTodos()[0].id).toBe(1);
  expect(todo.getTodos()[1].id).toBe(2);
});

it('Accepts todos with the exact same data', () => {
  todo.setTodo(
    'Test Name',
    'Default',
    '2021-06-30',
    'None',
    'Test description',
  );
  todo.setTodo(
    'Test Name',
    'Default',
    '2021-06-30',
    'None',
    'Test description',
  );
  expect(todo.getTodos()[0].id).toBe(1);
  expect(todo.getTodos()[1].id).toBe(2);
  expect(todo.getTodos().length).toBe(2);
  expect(todo.getTodos().length).not.toBe(1);
});

it('Delete a todo if a valid id is given', () => {
  todo.setTodo(
    'Test Name',
    'Default',
    '2021-06-30',
    'None',
    'Test description',
  );
  expect(todo.getTodos().length).toBe(1);
  todo.deleteTodo(1);
  expect(todo.getTodos().length).toBe(0);
  expect(todo.getTodos().length).not.toBe(1);
});

it('Edit a given todo with the correct information', () => {
  todo.setTodo(
    'Test Name',
    'Default',
    '2021-06-30',
    'None',
    'Test description',
  );
  expect(todo.getTodos()[0]).toEqual({
    name: 'Test Name',
    project: 'Default',
    dueDate: '2021-06-30',
    priority: 'None',
    description: 'Test description',
    id: 1,
  });
  todo.editTodo(
    1,
    'Test edited',
    'Default',
    '2021-06-30',
    'None',
    'Test description edited',
  );
  expect(todo.getTodos()[0]).toEqual({
    name: 'Test edited',
    project: 'Default',
    dueDate: '2021-06-30',
    priority: 'None',
    description: 'Test description edited',
    id: 1,
  });
  expect(todo.getTodos()[0]).not.toEqual({
    name: 'Test Name',
    project: 'Default',
    dueDate: '2021-06-30',
    priority: 'None',
    description: 'Test description',
    id: 1,
  });
});

it('BAD USAGE SET. Throw error if there is no called with the correct params', () => {
  const t = () => {
    todo.setTodo(
      'Default',
      '2021-06-30',
      'None',
      'Test description',
    );
  };
  expect(t).toThrow(Error);
});

it('BAD USAGE SET. Throw error if there is no called with params', () => {
  const t = () => {
    todo.setTodo();
  };
  expect(t).toThrow(Error);
});

it('BAD USAGE EDIT. Throw error if there is no called with the correct params', () => {
  todo.setTodo(
    'Test Name',
    'Default',
    '2021-06-30',
    'None',
    'Test description',
  );
  const t = () => {
    todo.editTodo(
      'Test edited',
      'Default',
      '2021-06-30',
      'None',
      'Test description edited',
    );
  };
  expect(t).toThrow(Error);
});

it('BAD USAGE EDIT. Throw error if there is no called with params', () => {
  todo.setTodo(
    'Test Name',
    'Default',
    '2021-06-30',
    'None',
    'Test description',
  );
  const t = () => {
    todo.editTodo();
  };
  expect(t).toThrow(Error);
});

it('BAD USAGE DELETE. Throw error if id is not defined', () => {
  todo.setTodo(
    'Test Name',
    'Default',
    '2021-06-30',
    'None',
    'Test description',
  );
  const t = () => {
    todo.deleteTodo();
  };
  expect(t).toThrow(Error);
});
