import { allProjects } from "./projects-storage";
import { addNewProject } from "./projects-form";
import { sessionProjects } from "./projects-session";
import { mainTodos } from "./todos-show";

const body = document.body;
body.classList.add("d-flex");
let sessionCalling = sessionProjects();

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

  projectsObject.getProjects().forEach((element) => {
    const projectItem = document.createElement("li");
    projectItem.classList.add("project-item");

    projectItem.classList.remove("bg-dark");
    projectItem.innerText = element.title;
    projectsList.appendChild(projectItem);

    projectItem.addEventListener("click", () => {
      sessionCalling.newSession(element.title, element.id);
      body.replaceChild(mainTodos(element.title, element.id), body.children[3]);
    });
  });

  projects.appendChild(addNewProject());

  return projects;
};

body.appendChild(aside());
body.appendChild(
  mainTodos(
    sessionCalling.getSession()[0].title,
    sessionCalling.getSession()[0].id
  )
);
