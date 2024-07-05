import { getDatabase, ref, set } from 'firebase/database';
import './addsubject.css'
import { useRef, useState } from 'react';
import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdOutlinePostAdd } from "react-icons/md";
import app from '../../../config/firbaseconfig';
import { ToastContainer, toast } from 'react-toastify';



export default function Subjects() {

  const [arrowup, setarrow] = useState(true);
  const [clasname, setclassnam] = useState<any>();

  // const classname = useRef<any>();
  const sub1 = useRef<any>();
  const sub2 = useRef<any>();
  const sub3 = useRef<any>();
  const sub4 = useRef<any>();
  const sub5 = useRef<any>();
  const sub6 = useRef<any>();
  const sub7 = useRef<any>();
  const sub8 = useRef<any>();
  const sub9 = useRef<any>();

  const db = getDatabase(app);
  const abc = () => {
    const obj = {
      // classname: classname.current.value,
      classname: clasname,
      sub1: sub1.current.value,
      sub2: sub2.current.value,
      sub3: sub3.current.value,
      sub4: sub4.current.value,
      sub5: sub5.current.value,
      sub6: sub6.current.value,
      sub7: sub7.current.value,
      sub8: sub8.current.value,
      sub9: sub9.current.value,
    }
    if (!obj.classname) {
      toast.error(`Please Select a Class`);
    } else if (!obj.sub1) {
      toast.error(`Please Add Subject`);
    } else {

      const refrence = ref(db, `subjects/${obj.classname}`);
      set(refrence, obj).then((suc) => {
        toast.success(`Subject of ${obj.classname} is Added`);
        setclassnam('');
          sub1.current.value = '';
          sub2.current.value = '';
          sub4.current.value = '';
          sub3.current.value = '';
          sub5.current.value = '';
          sub6.current.value = '';
          sub7.current.value = '';
          sub8.current.value = '';
          sub9.current.value = '';

      }).catch(() => {
            alert('eror')
          })
    }
  }

  return (
    <div className='border border-3 mt-5 shadow mb-5' style={{ backgroundColor: '#f1f1f1' }} >
      <ToastContainer />
      <div className='hediv d-flex align-items-center justify-content-between' >
        <div className='  d-flex align-items-center p-2'>
          <MdOutlinePostAdd className='fs-1 me-3' />
          <h3>Add Subjects</h3>
        </div>
        <div className='fs-1 pe-4' onClick={() => { setarrow(!arrowup) }}>
          {arrowup ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </div>
      </div>
      {arrowup &&
        <div className="container">

          <div className="row pt-5 pb-5 ">
            <div className="col-8 inpt text-center">
              Select the Class <span> * </span>
              <select onChange={(e) => setclassnam(e.target.value)}>
                <option selected>Select</option>
                <option value="Class One">Class One</option>
                <option value="Class Two">Class Two</option>
                <option value="Class Three">Class Three</option>
                <option value="Class Four">Class Four</option>
                <option value="Class Five">Class Five</option>
              </select>
            </div>


            <div className="col-12 d-flex mt-5  justify-content-evenly">
              <div>Subjects <span> * </span></div>
              <div className="col-2 text-center ms-2 dgre">

                <input type="text" ref={sub1} />
                <input type="text" ref={sub2} />
                <input type="text" ref={sub3} />
              </div>
              <div className="col-2 text-center ms-2 dgre">

                <input type="text" ref={sub4} />
                <input type="text" ref={sub5} />
                <input type="text" ref={sub6} />
              </div>
              <div className="col-2 text-center ms-2 dgre">

                <input type="text" ref={sub7} />
                <input type="text" ref={sub8} />
                <input type="text" ref={sub9} />
              </div>

            </div>

            <div className='col-12 mt-5 text-center'>
              <button className='btn col-4 text-white' style={{ backgroundColor: '#c3a931' }} onClick={abc} >Submit</button>
            </div>

          </div>
        </div>}
    </div>
  )
}
