import { atom } from "recoil";

export const studentState = atom({
    key: "studentState",
    default: {
        name: "",
        email: "",
        password: "",
        collegeDetails: {
            enrollmentNumber: null,
            collegeId: null,
            courseEnrolled: null
        },
        classesJoined:[],
        projectsUploaded:[],
        isLoggedIn: false,

    },
});

