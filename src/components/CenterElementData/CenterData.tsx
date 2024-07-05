import { useContext, useEffect, useState } from "react";
import AddExames from "../DetailsOfComponents/Exames/AddExames";
import AddStudents from "../DetailsOfComponents/Students/AddStudents";
import AddSubjects from "../DetailsOfComponents/Subjects/AddSubjects";
import AddTeachers from "../DetailsOfComponents/Teachers/AddTeachers";
import Dashboard from "../DetailsOfComponents/Dashboard";
import ExameSecdulas from "../DetailsOfComponents/Exames/ExameSecdulas";
import StudenceAttendence from "../DetailsOfComponents/Attandence/StudenceAttendence";
import StudentsList from "../DetailsOfComponents/Students/StudentsList";
import Subjects from "../DetailsOfComponents/Subjects/Subjects";
import Syllabus from "../DetailsOfComponents/Syllabus/Syllabus";
import SyllabusForm from "../DetailsOfComponents/Syllabus/SyllabusForm";
import TeachersList from "../DetailsOfComponents/Teachers/TeachersList";
import { Store } from "../ContexStore/contex";
import SingleStudentDetail from "../DetailsOfComponents/Students/SingleStudentDetail";
import TeacherDetailPage from "../DetailsOfComponents/Teachers/TeacherDetailPage";
import Attandencedetails from "../DetailsOfComponents/Attandence/Attandencedetails";
import TeacherAttendence from "../DetailsOfComponents/Attandence/TeachersAttendence";
import TeachersElocationForm from "../DetailsOfComponents/Elocation/TeachersElocationForm";
import Elocationlist from "../DetailsOfComponents/Elocation/Elocationlist";

export default function Elmnt() {
    const name = useContext(Store);

    

    const obj: any = {
        'singlestudent':<SingleStudentDetail/>,
        'teachersinglepage':<TeacherDetailPage/>,
        'DashBoard': <Dashboard />,
        'Add Students': <AddStudents />,
        'Students List': <StudentsList />,
        'Add Teachers': <AddTeachers />,
        'Teachers List': <TeachersList />,
        'Add Subjects': <AddSubjects/>,
        'Subjects List': <Subjects/>,
        'Students Attandence': <StudenceAttendence/>,
        'Syllabus Form': <SyllabusForm />,
        'Syllabus List': <Syllabus />,
        'Add Exam Sechedule': <AddExames />,
        'Schedule': <ExameSecdulas />,
        'Detail Page of Attandence':<Attandencedetails/>,
        'Teachers Attandence':<TeacherAttendence/>,
        "Teachers Elocation":<TeachersElocationForm/>,
        'List of Elocation':<Elocationlist/>
    }

    const element = obj[name.singlepage] || obj[name.arrow] ||  obj[ name.nestdli ] ;


    return (
        <div>{element}</div>
    )
}



