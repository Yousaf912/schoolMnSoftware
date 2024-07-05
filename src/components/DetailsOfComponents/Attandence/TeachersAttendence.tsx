import { get, getDatabase, ref, set } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { RiPresentationFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import app from "../../../config/firbaseconfig";

export default function TeacherAttendence() {
  const [stdamount,setstdamount]=useState<any>([]);
  const present = useRef<any>();
  const absent = useRef<any>();
  const dat = useRef<any>();
  const db =getDatabase(app);


  
  const getdta=()=>{
    const refernce =ref(db,`Teaschers/`)
    get(refernce).then((dta)=>{
    setstdamount(Object.keys(dta.val()))

      
    }).catch((er)=>{
      console.log(er);
      setstdamount([])
    })
  }
  useEffect((getdta),[])


const sendata =()=>{
  const a= present.current.value;
  const b = parseFloat(stdamount - a)
  console.log(b);
  
  const obj={
    prstd:present.current.value,
    abstd:b,
    date:dat.current.value
  }
  const refrence = ref(db,`teacherAttendence/${obj.date}`)
  if(!obj.prstd){
    toast.error("Add present Teachers");
  }  else if(obj.prstd > stdamount.length){
    toast.error(` Add correct Value total Teachers are ${stdamount.length}`);
  }else if(!obj.date){
    toast.error("Select Date")
  }
  else{
    set(refrence,obj).then(()=>{
      toast.success(`Attendence of Teacher is added`);
    }).catch(()=>{
      toast.error("Data not send");
    })
  }
}


  return (
    <div className='border border-3 mt-5 shadow mb-5' style={{ backgroundColor: '#f1f1f1' }} >
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-md-12 mx-auto mt-3 text-center"  >
            <div className='  d-flex align-items-center p-2 mb-' style={{ color: '#c3a931' }}>
              <RiPresentationFill className='fs-1 me-3' />
              <h3>Students Attandence</h3>
            </div>

            <div className=" d-flex flex-row-reverse ">
              <h3 className="me-4 mb-3"> Total Teachers/<span className="text-black">{  stdamount.length}</span></h3>
            </div>
            <div className="d-md-flex col col-xl-12 justify-content-between  mx-auto">
              <div className="d-flex justify-content-between">
                Present Teachers:
                <input type="number" style={{ width: '60%' }} ref={present} />
              </div>
             
              <div className="d-flex justify-content-between mt-3 mt-md-0">
                Select Date:
                <input type="date" style={{ width: '60%' }}  ref={dat}/>
              </div>
            </div>


            <div className='col-12 mt-5 mb-5 text-center'>
              <button className='btn col-4 text-white' style={{ backgroundColor: '#c3a931' }} onClick={sendata} >Submit</button>
            </div>


          </div>
        </div>
      </div>

    </div>
  )

}