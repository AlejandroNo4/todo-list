export { allProjects };

function Project(title, id) {
  this.title = title;
  this.id = id;
}

const allProjects = () => {
  let projects = [];
  const defualtProject = new Project("Default", 1);
  projects.push(defualtProject);
  return {
    setProject: (title) => {
      if (localStorage.getItem("projects")) {
        projects = JSON.parse(localStorage.getItem("projects"));
      } else {
        projects = [];
      }
      const id = projects.length + 1;

      const newProject = new Project(title, id);
      projects.push(newProject);

      localStorage.setItem("projects", JSON.stringify(projects));
    },
    getProjects: () => {
      if (localStorage.getItem("projects")) {
        projects = JSON.parse(localStorage.getItem("projects"));
      } else {
        projects = [];
      }
      return projects;
    },
    deleteProject: (projectId) => {
      if (localStorage.getItem("projects")) {
        projects = JSON.parse(localStorage.getItem("projects"));
      } else {
        projects = [];
      }

      for (let i = 0; i < projects.length; i += 1) {
        if (projectId === projects[i].id) {
          projects.splice(i, 1);
          localStorage.setItem("projects", JSON.stringify(projects));
          window.location.reload();
        }
      }
    },
  };
};