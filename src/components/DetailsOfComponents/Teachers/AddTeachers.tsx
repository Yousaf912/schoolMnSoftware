

import './Addteachers.css'
import { useRef, useState } from 'react';
import { FaAddressCard } from "react-icons/fa6";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { sendData } from '../../../config/firbasemethds';
import { getDatabase, ref, set } from 'firebase/database';
import app from '../../../config/firbaseconfig';
import { ToastContainer, toast } from 'react-toastify';


export default function Addteachers() {
  const [arrowup, setarrow] = useState(true);
  const name = useRef<any>();
  const mail = useRef<any>();
  const dob = useRef<any>();
  const gendr = useRef<any>();
  const number = useRef<any>();
  const adres = useRef<any>();
  const dgre1 = useRef<any>();
  const dgre2 = useRef<any>();
  const dgre3 = useRef<any>();
  const institute1 = useRef<any>();
  const result1 = useRef<any>();
  const psingyer = useRef<any>();
  const institute2 = useRef<any>();
  const result12 = useRef<any>();
  const psingyer2 = useRef<any>();
  const institute3 = useRef<any>();
  const result3 = useRef<any>();
  const psingyer3 = useRef<any>();


  const db = getDatabase(app);

  const sendata = () => {
    const obj = {
      name: name.current.value,
      mail: mail.current.value,
      dob: dob.current.value,
      // gendr:gendr.current.value,
      number: number.current.value,
      adres: adres.current.value,
      dgre1: dgre1.current.value,
      dgre2: dgre2.current.value,
      dgre3: dgre3.current.value,
      institute1: institute1.current.value,
      institute2: institute2.current.value,
      institute3: institute3.current.value,
      result1: result1.current.value,
      result12: result12.current.value,
      result3: result3.current.value,
      psingyer: psingyer.current.value,
      psingyer2: psingyer2.current.value,
      psingyer3: psingyer3.current.value
    }
    if (!obj.name || !obj.mail || !obj.number || !obj.dob || !obj.adres) {
      toast.error("All fileds are required!");
    } else {
      const refrence = ref(db, `Teaschers/${obj.name}`);
      set(refrence, obj);
      toast.success(`Teacher ${obj.name} is Added`);
      name.current.value = '';
      mail.current.value = '';
      dob.current.value = '';
      number.current.value = '',
        adres.current.value = '',
        dgre1.current.value = '',
        dgre2.current.value = '',
        dgre3.current.value = '',
        institute1.current.value = '',
        institute2.current.value = '',
        institute3.current.value = '',
        result1.current.value = '',
        result12.current.value = '',
        result3.current.value = '',
        psingyer.current.value = '',
        psingyer2.current.value = '',
        psingyer3.current.value = ''
    }
  }


  return (
    <div className='border border-3 mt-5 shadow mb-5' style={{ backgroundColor: '#f1f1f1' }} >
      <ToastContainer />
      <div className='hediv d-flex align-items-center justify-content-between' >
        <div className='  d-flex align-items-center p-2'>
          <FaAddressCard className='fs-1 me-3' />
          <h3>Add Teachers</h3>
        </div>
        <div className='fs-1 pe-4' onClick={() => { setarrow(!arrowup) }}>
          {arrowup ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </div>
      </div>
      {arrowup &&
        <div className="container">

          <div className="row pt-5 pb-5 ">
            <div className="col-8 inpt text-center">
              Name <span> * </span>
              <input type="text" ref={name} />
            </div>
            <div className="col-8 inpt text-center mt-3">
              Email <span> * </span>
              <input type="email" ref={mail} />
            </div>
            <div className="col-12 d-flex justify-content-center mt-3">
              <div className='me-3'>
                NUmber <span> * </span>
                <input type="number" ref={number} />
              </div>
              <div>
                Date Of birth <span> * </span>
                <input type="date" ref={dob} />
              </div>

            </div>
            <div className="col-8 inpt justify-content-center mt-3 d-flex align-items-center" >
              Address <span> * </span>
              <textarea name="" id="" ref={adres}></textarea>
            </div>
            <div className="col-9  mt-3 d-flex justify-content-center">
              <div className=''>
                Gender <span> * </span>
              </div>
              <form className='ms-5' >
                <label htmlFor="male">Male</label>
                <input type="radio" id="male" name="gender" value={'male'} />

                <label htmlFor="female">Female</label>
                <input type="radio" id="female" name="gender" value={'female'} />

                <label htmlFor="other">Other</label>
                <input type="radio" id="other" name="gender" value={'other'} />
              </form>

            </div>
            <div className="col-12 d-flex mt-5  justify-content-evenly">
              <div>Qualification <span> * </span></div>
              <div className="col-2 text-center ms-2 dgre">
                <p>Degree/Dimploma</p>
                <input type="text" ref={dgre1} />
                <input type="text" ref={dgre2} />
                <input type="text" ref={dgre3} />
              </div>
              <div className="col-2 text-center ms-2 dgre">
                <p>Collage/Uni/school</p>
                <input type="text" ref={institute1} />
                <input type="text" ref={institute2} />
                <input type="text" ref={institute3} />
              </div>
              <div className="col-2 text-center ms-2 dgre">
                <p>Result</p>
                <input type="text" ref={result1} />
                <input type="text" ref={result12} />
                <input type="text" ref={result3} />
              </div>
              <div className="col-2 text-center ms-2 dgre">
                <p>Passing Year</p>
                <input type="date" ref={psingyer} />
                <input type="date" ref={psingyer2} />
                <input type="date" ref={psingyer3} />
              </div>
            </div>

            <div className='col-12 mt-5 text-center'>
              <button className='btn col-4 text-white' style={{ backgroundColor: '#c3a931' }} onClick={sendata} >Submit</button>
            </div>

          </div>
        </div>}
    </div>
  )
}