export { sessionProjects }

function SessionConstructor(title, id){
  this.title = title
  this.id = id
}

const sessionProjects = () =>{
  let session = [{title: "Default", id: 1}]
  return {
    newSession: (title, id)=>{
      if (localStorage.getItem("session")) {
        session = JSON.parse(localStorage.getItem("session"));
      } else {
        session = [{title: "Default", id: 1}];
      }
      const addingSession = new SessionConstructor(title, id)
      session = [addingSession]
      localStorage.setItem("session", JSON.stringify(session));
    },
    getSession: ()=>{
      if (localStorage.getItem("session")) {
        session = JSON.parse(localStorage.getItem("session"));
      } else {
        session = [{title: "Default", id: 1}];
      }
      return session
    },
  }
}