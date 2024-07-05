import { get, getDatabase, ref } from "firebase/database";
import { HiClipboardDocumentList } from "react-icons/hi2";
import app from "../../../config/firbaseconfig";
import { useEffect, useState } from "react";
import Spiner from "../../Spiner";
import { ToastContainer, toast } from "react-toastify";

export default function Elocationlist() {
    const [spiner, setspiner] = useState(true)
    const db = getDatabase(app);
    const [cls, setcls] = useState<any>('');
    const [syllabus, setsylabus] = useState<any>([]);

    const getdata = () => {
        const refrence = ref(db, `elocation/${cls}/`);
        cls ?
            get(refrence).then((dta: any) => {
                dta &&
                    setsylabus(Object.values(dta.val()));

                setspiner(false)
            }).catch((eror) => {
                setspiner(false)
                setsylabus([])
                toast.error(`TimeTable Of ${cls} is not Present`)
                setcls('')
            })
            : setspiner(false)
    }
    console.log(syllabus);


    const statechange = () => {
        setspiner(true)
    }
    const stcls = (e: any) => {
        setcls(e.target.value);
        setspiner(false)
    }


    useEffect((statechange), [cls])
    useEffect((getdata), [cls])

    return (
        <div className="border border-3 p-4 mt-5 shadow text-center" style={{ backgroundColor: '#f1f1f1' }}>
            <ToastContainer />
            <div className="d-flex col-lg-5 mb-4 mx-auto" style={{ color: "#c3a931" }}>
                <HiClipboardDocumentList className="fs-1 me-2" />
                <h2>Lectures Time /Teachers Elocation List</h2>
            </div>
            <div className="container">

                <div className="row d-flex flex-column">

                    <div className="d-flex shadow justify-content-between col-sm-7 col-md-6 mx-auto mt-3 mt-lg-0 px-3 border-0 rounded-3 py-1" style={{ backgroundColor: '#c3a931' }}>
                        <h6>Select Class <span>*</span></h6>
                        <select style={{ width: '50%' }} onChange={stcls} >
                            <option selected>Select</option>
                            <option value="Class One">Class One</option>
                            <option value="Class Two">Class Two</option>
                            <option value="Class Three">Class Three</option>
                            <option value="Class Four">Class Four</option>
                            <option value="Class Five">Class Five</option>
                        </select>
                    </div>
                    {spiner ? <Spiner /> : cls ?
                        <div className="syllabus border p-4 mt-5 border-2 shadow mb-5">
                            <div>
                                <h3 className=" text-center" style={{ color: "#c3a931" }}>{`TimeTable of ${cls}`}</h3>
                            </div>
                            <table className="table border border-2 shadow">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Sir Name</th>
                                        <th scope="col">Subject Name</th>
                                        <th scope="col">Time</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {syllabus.length != 0 && syllabus.map((dta:any,i:any)=>{

                                    <tr key={i}>
                                        <th scope="row">{i+1}</th>
                                        <td>{dta.teacher}</td>
                                        <td>{dta.subjname}</td>
                                        <td>{`from  ${dta.starting} to  ${dta.endtime}`}</td>
                                    </tr>
                                    })}


                                </tbody>
                            </table>
                        </div> : <h2 className="mt-5" style={{ color: '#c3a931' }}>Select the Class</h2>}
                </div>
            </div>
        </div>
    );
}
