import { allProjects } from "./projects-storage";
export { addNewProject };

const addNewProject = () => {
  const formContainer = document.createElement("div");
  const formProject = document.createElement("form");
  const inputProjectName = document.createElement("input");
  const submitProject = document.createElement("button");
  const projectsObj = allProjects();

  inputProjectName.placeholder = "Project Name";
  inputProjectName.setAttribute("required", "");
  inputProjectName.maxLength = 25;
  submitProject.innerText = "Create";
  submitProject.classList.add("btn");
  formProject.appendChild(inputProjectName);
  formProject.appendChild(submitProject);
  formProject.classList.add("d-none", "padding");

  // -----------------------------------------NEW PROJECT BUTTON

  const NewProjectBtn = document.createElement("div");
  NewProjectBtn.innerText = "New project +";
  NewProjectBtn.classList.add("new-btn");

  NewProjectBtn.addEventListener("click", () => {
    if (formProject.classList.contains("d-none")){
      formProject.classList.remove("d-none")
      formProject.classList.add("d-flex", "flex-column")
    } else{
      formProject.classList.remove("d-flex")
      formProject.classList.add("d-none")
    }
  });
  // -----------------------------------------FORM EVENT LISTENER
  formProject.addEventListener("submit", () => {
    const title = inputProjectName.value;
    projectsObj.setProject(title);
  });

  formContainer.appendChild(NewProjectBtn);
  formContainer.appendChild(formProject);

  return formContainer;
};
