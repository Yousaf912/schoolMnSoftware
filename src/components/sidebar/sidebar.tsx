
import { PiStudentFill, PiExam } from "react-icons/pi";
import { FaChalkboardTeacher,FaHome ,FaSchool,FaClipboardList} from "react-icons/fa";
import style from './sidebar.module.css';
import './sidebar.module.css'
import logo from '../../assets/log-removebg-preview.png';
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Store } from "../ContexStore/contex";
import { MdSubject,MdOutlineCoPresent, MdFormatListBulletedAdd } from "react-icons/md";
import { list } from "firebase/storage";






export default function sidebar() {
  const storObj = useContext(Store);
  // const [classlist,setclasslist]=useState(false);
 
  const data = [
    {
      name:'DashBoard',
      icon:<FaHome />,
      action:storObj.starow,
      link:'/DashBoard',
    },
    {
      name: 'Acedimic',
      nested: {
        add: "Teachers Elocation",
        list: 'List of Elocation',
        link1:'/Acedimic/TeachersElocation',
        link2:'/Acedimic/TeachersElocation/List',
      },
      icon: < MdFormatListBulletedAdd/>,
      arow: <IoIosArrowForward />,
      arow2: <IoIosArrowDown />,
      action: storObj.starow,
      action2:storObj.nstdli,
      link:'/Acedimic'
    },
    {
      name: 'Students',
      nested: {
        add: "Add Students",
        list: 'Students List',
        link1:'/studrnts/AddStudents',
        link2:'/studrnts/StudentsList',
      },
      icon: <PiStudentFill />,
      arow: <IoIosArrowForward />,
      arow2: <IoIosArrowDown />,
      action: storObj.starow,
      action2:storObj.nstdli,
      link:'/studrnts'
    },
    {
      name: 'Teachers',
      nested: {
        add: "Add Teachers",
        list: 'Teachers List',
        action: storObj.nstdli,
        link1:'/Teachers/AddTeachers',
        link2:'/Teachers/TeachersList',
      },
      icon: <FaChalkboardTeacher />,
      arow: <IoIosArrowForward />,
      arow2: <IoIosArrowDown />,
      action: storObj.starow,
      action2:storObj.nstdli,
      link:'/Teachers'
    },
    {
      name: 'Subjects',
      nested: {
        add: 'Add Subjects',
        list: 'Subjects List',
        action: storObj.nstdli,
        link1:'/Subjects/AddSubjects',
        link2:'/Subjects/SubjectList',
      },
      icon: <MdSubject/>,
      arow: <IoIosArrowForward />,
      arow2: <IoIosArrowDown />,
      action: storObj.starow,
      action2:storObj.nstdli,
      link:'/Subjects'
    },
    {
      name: 'Attandence',
      nested: {
        add: "Students Attandence",
        list: 'Teachers Attandence',
        thid: 'Detail Page of Attandence',
        action: storObj.nstdli,
        link1:'/Attandence/StudentsAttendence',
        link2:'/Attandence/TeachersAttendence',
        link3:'/Attandence/AttendenceDetailsPage',
      },
      icon: <MdOutlineCoPresent/>,
      arow: <IoIosArrowForward />,
      arow2: <IoIosArrowDown />,
      action: storObj.starow,
      action2:storObj.nstdli,
      link:'/Attandence'
    },
    {
      name: 'Syllabus',
      nested: {
        add: 'Syllabus Form',
        list: 'Syllabus List',
        action: storObj.nstdli,
        link1:'/Syllabus/SyllabusForm',
        link2:'/Syllabus',
       
      },
      icon: <FaClipboardList/>,
      arow: <IoIosArrowForward />,
      arow2: <IoIosArrowDown />,
      action: storObj.starow,
      action2:storObj.nstdli,
      link:'/Syllabus'
    },
    {
      name: 'Exames',
      nested: {
        add: 'Add Exam Sechedule',
        list: 'Schedule',
        action: storObj.nstdli,
        link1:'/Exames/ScheduleForm',
        link2:'/Exames/ScheduleList',
       
      },
      icon: < PiExam/>,
      arow: <IoIosArrowForward />,
      arow2: <IoIosArrowDown />,
      action: storObj.starow,
      action2:storObj.nstdli,
      link:'/Exames'
    },

  ]
  return (
    <div className={`${style.min} container border-0 rounded-4 p-2  `}>
      <div className="row">
        <div className="text-center">
          <img src={logo} width={120} />
        </div>
        <ul className={`col-12 ${style.ulstyl}`}>
          {data.map((val: any, i: any) => {
            return (
              <div key={i}>
                <div className={` ${storObj.arrow == val.name ? style.activ : style.hov} d-flex align-items-center justify-content-around  border-2 border rounded-3 mt-2`} >
                  <div onClick={() => val.action(val.name)} className={` ${style.namdiv}  d-flex  align-items-center mt-1`}>
                    <div className={`${storObj.arrow == val.name ? style.icn2 : style.icn}`}>
                      {val.icon}
                    </div>
                    <div className={` ${style.lidv} `}>
                      <Link to={val.link} className="text-decoration-none text-black">
                      <li>{val.name}</li>
                      </Link>

                    </div>
                  </div>
                  <div onClick={() => val.action('')} className="   px-2">
                    {storObj.arrow == val.name ? val.arow2 : val.arow}
                  </div>
                </div>
                {val.nested && storObj.arrow == val.name &&
                  <ul>
                    <Link to={val.nested.link1} className="text-decoration-none text-black">
                    <li className={`${storObj.nestdli == val.nested.add && style.activ} ${style.nk}`} onClick={() => val.action2(val.nested.add)}>{val.nested.add}</li>
                    </Link>
                    <Link to={val.nested.link2} className="text-decoration-none text-black ">
                    <li className={`${storObj.nestdli == val.nested.list && style.activ} ${style.nk} mt-1` } onClick={() => val.action2(val.nested.list)}>{val.nested.list}</li>
                    </Link>
                    <Link to={val.nested.link3} className="text-decoration-none text-black ">
                    <li className={`${storObj.nestdli == val.nested.thid && style.activ} ${style.nk} mt-1`} onClick={() => val.action2(val.nested.thid)} >{val.nested.thid}</li>
                    </Link>
                    
                  </ul>}
              </div>

            )
          })}
        </ul>
      </div>
    </div>
  )
}
