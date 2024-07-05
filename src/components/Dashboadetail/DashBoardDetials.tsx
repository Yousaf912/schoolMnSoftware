
import './DashBoardDetails.css';
import { FcBusinessman } from "react-icons/fc";
import { RiLogoutBoxLine } from "react-icons/ri";
import { PiStudentDuotone } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { GiTeacher } from "react-icons/gi";
import { GrUserWorker } from "react-icons/gr";

// import ClassshrtInfo from './classshrtInfo';





export default function DashboarDetails() {
    const data = [
        { icon: <PiStudentDuotone className={`  fs-1 float-end`} />, title: "absent Students", number: 67, class: 'txt' },
        { icon: <HiMiniUserGroup className={`  fs-1 float-end`} />, title: "Present Students", number: 76, class: 'green' },
        { icon: <GrUserWorker className={`  fs-1 float-end`} />, title: "Absent Worker", number: 7, class: 'txt' },
        { icon: <GrUserWorker className={`  fs-1 float-end`} />, title: "Prsent Worker", number: 30, class: 'green' },
        { icon: <GiTeacher className={`  fs-1 float-end`} />, title: "Absent Teachers", number: 7, class: 'txt' },
        { icon: <GiTeacher className={`  fs-1 float-end`} />, title: "Prsent Teachers", number: 50, class: 'green' },
    ]
    return (
        <>
            <div className="container-fluid">
                <div className='d-flex mt-3 justify-content-between'>
                    <div className='d-flex'>
                        <p className='text-danger me-3'>Running Session:</p>
                        <div >
                            <FcBusinessman />
                            Admin
                        </div>
                    </div>
                    <div >
                        <RiLogoutBoxLine className='fs-3' />
                        Logout
                    </div>
                </div>
                <hr />

                <div className="row d-flex justify-content-around ">
                    {data.map((val: any,i:any ) => {
                        return (
                            <div key={i} className={` py-5 px-5 col-3 ms-1 mt-2    position-relative `}>
                                {val.icon}
                                <div className={`${val.class} px-3 position-absolute `}>
                                    <h1 className='mt-4'>{val.number}</h1>
                                    <p>{val.title}</p>
                                </div>

                            </div>
                        )
                    })}


                </div>
                <div className=' mt-3 border mb-5' >
                    <h1 className='text-center text-white  border mb-5 py-2' style={{backgroundColor:'#d3b428'}}>Chart View of present Students</h1>
                    
                </div>
                <div className='col-7'>
                    {/* <ClassshrtInfo></ClassshrtInfo> */}
                </div>

            </div>
        </>
    )
}