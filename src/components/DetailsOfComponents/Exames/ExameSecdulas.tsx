import { get, getDatabase, ref } from "firebase/database";
import { HiClipboardDocumentList } from "react-icons/hi2";
import app from "../../../config/firbaseconfig";
import { useEffect, useState } from "react";
import Spiner from "../../Spiner";
import { ToastContainer, toast } from "react-toastify";

export default function Syllabus() {
  const [spiner, setspiner] = useState(true);
  const db = getDatabase(app);
  const [cls, setcls] = useState<any>('');
  const [syllabus, setsylabus] = useState<any>([]);

  const abc=(e:any)=>{
setcls(e.target.value)
setspiner(false)
  }

  const getdata = () => {
    const refrence = ref(db, `exames/${cls}/`);
    cls &&
      get(refrence).then((dta: any) => {
        setsylabus(Object.values(dta.val()));
        setspiner(false)
      }).catch(() => {
       setspiner(false)
       toast.error(`Test date Of ${cls} is not present`);
       setcls('')
      })
  }
const stspiner =()=>{
setspiner(true);
}
useEffect((stspiner),[cls])
  useEffect((getdata), [cls])

  return (
    <div className="border border-3 p-4 mt-5 shadow" style={{ backgroundColor: '#f1f1f1' }}>
 <ToastContainer />
      <div className="d-flex col-lg-3 mb-4 mx-auto" style={{ color: "#c3a931" }}>
        <HiClipboardDocumentList className="fs-1 me-2" />
        <h2>Exames Date</h2>
      </div>
      <div className="container">
        <div className="row">

          <div className="d-flex shadow justify-content-between col-sm-7 col-md-6 mx-auto mt-3 mt-lg-0 px-3 border-0 rounded-3 py-1" style={{ backgroundColor: '#c3a931' }}>
            <h6>Select Class <span>*</span></h6>
            <select style={{ width: '50%' }} onChange={abc} >
              <option selected>Select</option>
              <option value="Class One">Class One</option>
              <option value="Class Two">Class Two</option>
              <option value="Class Three">Class Three</option>
              <option value="Class Four">Class Four</option>
              <option value="Class Five">Class Five</option>
            </select>
          </div>
          <div className="syllabus border p-4 mt-5 border-2 shadow mb-5 text-center">
            { cls == '' ? <h2 style={{ color: "#c3a931" }}>Select Class</h2> : spiner?<Spiner/>: <>
              <div>
                <h3 className=" text-center" style={{ color: "#c3a931" }}>{`Test Date of ${cls}`}</h3>
              </div>
              <table className="table border border-2 shadow">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Class Name</th>
                    <th scope="col">Subject Name</th>
                    <th scope="col">Test Date</th>
                    <th scope="col">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {syllabus.map((dta: any, i: any) => {
                    return (

                      <tr key={i}>
                        <th >{i + 1}</th>
                        <td>{dta.classname}</td>
                        <td>{dta.subjname}</td>
                        <td>{dta.date}</td>
                        <td>{dta.dis}</td>


                      </tr>
                    )
                  })}
                </tbody>
              </table>
              </>}
            </div>
          </div>
        </div>
      </div>
      );
}