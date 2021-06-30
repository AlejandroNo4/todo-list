import { afterEach, expect, it } from "@jest/globals";
import allProjects from "../src/projects-storage";

let projects;

beforeAll(() => {
  delete window.location;
  window.location = { reload: jest.fn() };
});

beforeEach(() => {
  projects = allProjects();
});

afterEach(() => {
  let projStorageReset = [{ title: "Default", id: 1 }];
  JSON.parse(localStorage.getItem("projects"));
  localStorage.setItem("projects", JSON.stringify(projStorageReset));
});

afterAll(() => {
  window.location = location;
});

it("Projects must always contain the default project", () => {
  expect(projects.getProjects()[0]).toEqual({ title: "Default", id: 1 });
});

it("Setting a new project will add, not override the projects", () => {
  projects.setProject("Test one");
  projects.setProject("Test two");
  expect(projects.getProjects().length).not.toBe(1);
  expect(projects.getProjects().length).not.toBe(2);
  expect(projects.getProjects().length).toBe(3);
});

it("Adding a new project, the storage can accept the same title", () => {
  projects.setProject("Test with the same name");
  projects.setProject("Test with the same name");
  expect(projects.getProjects().length).toBe(3);
});

it("Adding multiple projects with the same name, the id will be different", () => {
  projects.setProject("Test with the same name");
  projects.setProject("Test with the same name");
  projects.setProject("Test with the same name");
  expect(projects.getProjects()[1].id).toBe(2);
  expect(projects.getProjects()[2].id).toBe(3);
  expect(projects.getProjects()[3].id).toBe(4);
});

it("Delete the correct project with the giving id", () => {
  projects.setProject("Test one");
  projects.setProject("Test two");
  expect(projects.getProjects()[2].id).toBe(3);
  expect(projects.getProjects()[2].title).toBe("Test two");
  expect(projects.getProjects().length).toBe(3);
  projects.deleteProject(3);
  expect(projects.getProjects().length).toBe(2);
  expect(projects.getProjects()[2]).toBe(undefined);
});

it("BAD USAGE. The function setProject will no register more than one parameter", () => {
  projects.setProject("Test Second Title", "not this");
  expect(Object.keys(projects.getProjects()[1])).not.toContain("not this");
  expect(Object.keys(projects.getProjects()[1]).length).toBe(2);
});

it("BAD USAGE. If the title is empty, it will thow an error", () => {
  const t = () => {
    projects.setProject("");
  };
  expect(t).toThrow(Error);
});

it("BAD USAGE. If the title is undefined, it will thow an error", () => {
  const t = () => {
    projects.setProject();
  };
  expect(t).toThrow(Error);
});

it("BAD USAGE. Trying to delete the default project will thow an error", () => {
  const t = () => {
    projects.deleteProject(1);
  };
  expect(t).toThrow(Error);
});

it("BAD USAGE. To call the delete function, an id must be defined", () => {
  const t = () => {
    projects.deleteProject();
  };
  expect(t).toThrow(Error);
});

it("BAD USAGE. Cannot delete a project with an id that doesn't exists", () => {
  projects.setProject("Test one");
  const t = () => {
    projects.deleteProject(25);
  };
  expect(t).toThrow(Error);
});

it("BAD USAGE. Can't access to projects without using the function getProjects", () => {
  projects.setProject("Test one");
  expect(projects.projects).toBe(undefined)
});
