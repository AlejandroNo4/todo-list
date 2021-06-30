import sessionProjects from "../src/projects-session";

let session;


beforeEach(() => {
  session = sessionProjects();
});

afterEach(() => {
  let sessionReset = [{ title: "Default", id: 1 }];
  JSON.parse(localStorage.getItem("projects"));
  localStorage.setItem("session", JSON.stringify(sessionReset));
});

it("The getSession function will always return title and id", () => {
  expect(session.getSession()[0].id).toBe(1);
  expect(session.getSession()[0].title).toBe("Default");
});

it("Change session to show the current project", () => {
  session.newSession("Test Second Title", 2);
  let gettingSession = session.getSession();
  expect(gettingSession[0].title).toBe("Test Second Title")
});

it("Must have no conflict with setting the same session more than once", ()=>{
  session.newSession("Test fourth Title", 4);
  session.newSession("Test fourth Title", 4);
  session.newSession("Test fourth Title", 4);
  expect(session.getSession().length).not.toBe(3)
})

it("BAD USAGE. The function newSession should substitute, not add a new item", ()=>{
  session.newSession("Test Second Title", 2);
  session.newSession("Test Third Title", 3);
  let gettingSession = session.getSession();
  expect(gettingSession[0].title).not.toBe("Test Second Title")
  expect(gettingSession.length).not.toBe(3)
})

it("BAD USAGE. The function newSession will no register more than two parameters", ()=>{
  session.newSession("Test Second Title", 2, "not this")
  expect(Object.keys(session.getSession()[0])).not.toContain("not this")
  expect(Object.keys(session.getSession()[0]).length).toBe(2)
})

it("BAD USAGE. The function cannot accept only title", ()=>{
  const t = () => {
    session.newSession("Test fourth Title")
  };
  expect(t).toThrow(Error);
})

it("BAD USAGE. The function cannot accept only id", ()=>{
  const t = () => {
    session.newSession(4)
  };
  expect(t).toThrow(Error);
})

it("BAD USAGE. The function cannot accept blank title", ()=>{
  const t = () => {
    session.newSession("")
  };
  expect(t).toThrow(Error);
})

