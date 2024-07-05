import { get, getDatabase, ref, set } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { RiPresentationFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import app from "../../../config/firbaseconfig";

export default function StudenceAttendence() {
  const [stdamount,setstdamount]=useState<any>([]);
  const [cls,setcls]=useState('');
  const present = useRef<any>();
  const absent = useRef<any>();
  const db =getDatabase(app);

  const abc=(e:any)=>{
    setcls(e.target.value) 
  }

  const getdta=()=>{
    const refernce =ref(db,`Students/${cls}/`)
    cls != '' &&
    get(refernce).then((dta)=>{
    setstdamount(Object.keys(dta.val()))

      
    }).catch((er)=>{
      console.log(er);
      toast.error(`Students of '${cls}' not are present`);
      setstdamount([])
    })
  }
  useEffect((getdta),[cls])


const sendata =()=>{
  const obj={
    prstd:present.current.value,
    abstd:absent.current.value,
    clas:cls
  }
  const refrence = ref(db,`studentAttendence/${obj.clas}`)
  if(!obj.abstd){
    toast.error("Add Absent students");
  }else if(obj.prstd >stdamount.length){
    toast.error("Present students are More than Total");
  }else if((obj.abstd - obj.prstd)>=stdamount.length){
    toast.error("Absent students are more than total");
  }
  else if(!obj.clas){
    toast.error("Select Class");
  }else if(!obj.prstd){
    toast.error("Add Presents Students");
  }else{
    cls &&
    set(refrence,obj).then(()=>{
      toast.success(`Attendence of ${cls} is added`);
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

            <div className="shadow mb-5 col-lg-4 d-flex justify-content-between mx-auto p-2 inpt text-center" style={{ backgroundColor: '#c3a931' }}>
              <h6>Select the Class</h6>
              <select onChange={abc} >
                <option selected>Select</option>
                <option value="class one">Class One</option>
                <option value="class two">Class Two</option>
                <option value="class three">Class Three</option>
                <option value="class four">Class Four</option>
                <option value="class five">Class Five</option>
              </select>
            </div>


            <div className=" d-flex flex-row-reverse ">
              <h3 className="me-4 mb-3"> Total/<span className="text-black">{  stdamount.length}</span></h3>
            </div>
            <div className="d-md-flex col col-xl-9 justify-content-between  mx-auto">
              <div className="d-flex justify-content-between">
                Present Students:
                <input type="number" style={{ width: '60%' }} ref={present} />
              </div>
              <div className="d-flex justify-content-between mt-3 mt-md-0">
                Absent students:
                <input type="number" style={{ width: '60%' }}  ref={absent}/>
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
