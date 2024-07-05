import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import app from "../../../config/firbaseconfig";
import Spiner from "../../Spiner";



export default function Subjects() {
  const [clas, setclas] = useState<any>('')
  const [subject, setsubject] = useState<any>([]);
  const [spiner, setspiner] = useState(true)

  const abc = (e: any) => {
    setclas(e.target.value)
    setspiner(false)
  }

  const db = getDatabase(app);

  const getdata = () => {
    const refernce = ref(db, `subjects/${clas}/`)
    get(refernce).then((dta: any) => {
        if(dta){
          setsubject([dta.val()])
        }

      setspiner(false)
    }).catch((er) => {
      console.log(er);
      alert("eror found")
    })
  }

  const spinr = () => setspiner(true)
  useEffect((spinr), [clas])
  useEffect((getdata), [clas])
  console.log(subject);


  return (
    <div className='border border-3 mt-5 shadow mb-5' style={{ backgroundColor: '#f1f1f1' }} >
      <div className="container">
        <div className="row">
          <div className="col-md-11 mx-auto mt-3 text-center"  >
            <div className='  d-flex align-items-center p-2 mb-' style={{ color: '#c3a931' }}>
              <HiMiniClipboardDocumentList className='fs-1 me-3' />
              <h3>List Of Subjects</h3>
            </div>

            <div className="shadow mb-5 col-lg-4 d-flex justify-content-between mx-auto p-2 inpt text-center" style={{ backgroundColor: '#c3a931' }}>
              <h6>Select the Class</h6>

              <select onChange={abc}>
                <option value="Class One">Class One</option>
                <option value="Class Two">Class Two</option>
                <option value="Class Three">Class Three</option>
                <option value="Class Four">Class Four</option>
                <option value="Class Five">Class Five</option>
              </select>
            </div>

            {clas ==''? <h2 className="mb-4" style={{ color: '#c3a931' }}>Select the class</h2>
             :  spiner? <Spiner/>:subject.map((dta: any) => { 
              return (
                <div className="details col-11 mb-5 d-md-flex justify-content-between text-center">
                  {dta? <>
                  <h5>{dta.classname}</h5>
                  <div className=" rounded-2 shadow-lg p-4 " style={{ width: "85%" }}>
                    <div className=" d-flex justify-content-between">
                      <div className="d-flex">
                        <h6>Subject 1 :</h6>
                        <p className="ms-1 ">{dta.sub1}</p> 
                      </div>
                      <div className="d-flex">
                        <h6>Subject 2 :</h6>
                        <p className="ms-1 ">{dta.sub2}</p>
                      </div>
                      <div className="d-flex">
                        <h6>Subject 3 :</h6>
                        <p className="ms-1 ">{dta.sub3}</p>
                      </div>
                    </div>

                    <div className=" d-flex justify-content-between">
                      <div className="d-flex">
                        <h6>Subject 4 :</h6>
                        <p className="ms-1 ">{dta.sub4}</p>
                      </div>
                      <div className="d-flex">
                        <h6>Subject 5 :</h6>
                        <p className="ms-1 ">{dta.sub5}</p>
                      </div>
                      <div className="d-flex">
                        <h6>Subject 6 :</h6>
                        <p className="ms-1 ">{dta.sub6}</p>
                      </div>
                    </div>
                    <div className=" d-flex justify-content-between">
                      <div className="d-flex">
                        <h6>Subject 7 :</h6>
                        <p className="ms-1 ">{dta.sub7}</p>
                      </div>
                      <div className="d-flex">
                        <h6>Subject 8 :</h6>
                        <p className="ms-1 ">{dta.sub8}</p>
                      </div>
                      <div className="d-flex">
                        <h6>Subject 9 :</h6>
                        <p className="ms-1 ">{dta.sub9}</p>
                      </div>
                    </div>


                  </div>
                  </>: <h2 style={{ color: '#c3a931' }}>Subjects Of {clas} are not present</h2> }
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
