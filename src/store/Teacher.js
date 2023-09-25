import { atom } from "recoil";

export const teacherstate = atom({
  key: "teacherstate",
  default: {
    name:"",
    college:null,
    department:null,
    contactNumber:null,
    email: "",
    classes:[],
    projectsRecieved:[],
    password: "",
    isLoggedIn: false,
   
  },
});

