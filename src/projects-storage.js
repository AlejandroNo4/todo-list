function Project(title, id) {
  this.title = title;
  this.id = id;
}

const allProjects = () => {
  let projects = [];

  return {
    setProject: (title) => {
      if (localStorage.getItem('projects')) {
        projects = JSON.parse(localStorage.getItem('projects'));
      } else {
        projects = [{ title: 'Default', id: 1 }];
      }
      const id = projects.length + 1;

      if (title === '' || title === undefined) {
        throw new Error('Title is undefined!');
      }

      const newProject = new Project(title, id);
      projects.push(newProject);

      localStorage.setItem('projects', JSON.stringify(projects));
    },
    getProjects: () => {
      if (localStorage.getItem('projects')) {
        projects = JSON.parse(localStorage.getItem('projects'));
      } else {
        projects = [{ title: 'Default', id: 1 }];
      }
      return projects;
    },
    deleteProject: (projectId) => {
      if (localStorage.getItem('projects')) {
        projects = JSON.parse(localStorage.getItem('projects'));
      } else {
        projects = [];
      }

      if (projectId === undefined || projectId === 1 || projectId > projects.length) {
        throw new Error('The project id to delete is invalid!');
      }

      for (let i = 0; i < projects.length; i += 1) {
        if (projectId === projects[i].id) {
          projects.splice(i, 1);
          localStorage.setItem('projects', JSON.stringify(projects));
          window.location.reload();
        }
      }
    },
  };
};

export default allProjects;