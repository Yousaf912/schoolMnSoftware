import { useContext, useEffect, useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Store } from "../../ContexStore/contex";
import { getDatabase, onValue, ref, set } from "firebase/database";
import app from "../../../config/firbaseconfig";
import Spiner from "../../Spiner";
import './editstudent.module.css';
import style from './editstudent.module.css';
import { FaAddressCard } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";


export default function () {
  // const [singlstudent, setsinglestudent] = useState<any>([]);
  const nm = useContext(Store);
  const db = getDatabase(app);
  const [spiner, setspiner] = useState(false)

  const abc = () => {
    nm.setsinglepage('')
  }


  const getdata = () => {
    const reference = ref(db, `Students/${nm.optval}/${nm.singlestudentname}`);
    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      nm.setsinglestudent([data])
      setspiner(true)
    });
  }

  useEffect((
    getdata
  ), [])


  return (
    <div className='border position-relative  border-3 py-4 px-5 text-center shadow mt-4' style={{ backgroundColor: '#f1f1f1' }}>
      {spiner ?
        <div className="container  border py-2 border-2 rounded-3">

          <div className="row">
            <div className="col-2 border py-2  justify-content-around  mt-2 ms-1 rounded-2 d-flex align-items-center"
              style={{ backgroundColor: '#c3a931', cursor: "pointer" }} onClick={abc}>
              <IoMdArrowRoundBack className="fs-2 " />
              <h6>Go back</h6>
            </div>

            {
              nm.singlstudent.map((val: any, i: any) => {
                return (
                  <>

                    <h3 className='text-center'>Details Of " <span className="text-black">{val.name}</span>"  </h3>
                    <div className="col-md-12 text-center mt-4">
                      <div className='d-lg-flex justify-content-between col-md-8 mx-auto '>
                        <div className='d-flex'>
                          <p>Name : </p>
                          <h6 className='mt-1 ms-3'>{val.name}</h6>
                        </div>
                        <div className='d-flex'>
                          <p>Father Name : </p>
                          <h6 className='mt-1 ms-3'>{val.fathername}</h6>
                        </div>

                      </div>
                      <div className='d-lg-flex justify-content-between col-md-8 mx-auto '>
                        <div className='d-flex'>
                          <p>Number : </p>
                          <h6 className='mt-1 ms-3'>{val.number}</h6>
                        </div>
                        <div className='d-flex'>
                          <p>Email Address: </p>
                          <h6 className='mt-1 ms-3'>{val.mail}</h6>
                        </div>
                      </div>
                      <div className='d-lg-flex justify-content-between col-md-8 mx-auto '>
                        <div className='d-flex'>
                          <p>Class : </p>
                          <h6 className='mt-1 ms-3'>{val.classname}</h6>
                        </div>
                        <div className='d-flex'>
                          <p>Rool Number: </p>
                          <h6 className='mt-1 ms-3'>#{i + 1}</h6>
                        </div>

                      </div>
                      <div className='d-flex justify-content-between col-md-8 mx-auto '>
                        <div className='d-flex'>
                          <p>Address: </p>
                          <h6 className='mt-1 '>{val.address}</h6>
                        </div>
                      </div>
                      <div className='d-flex justify-content-between col-md-8 mx-auto '>
                        <div className='d-flex'>
                          <p>Permanent Address : </p>
                          <h6 className='mt-1 '>{val.permanentadress}</h6>
                        </div>
                      </div>
                      <div>
                        <button className='btn mt-4 mb-2' style={{ backgroundColor: '#c3a931' }} onClick={() => nm.setshw(!nm.show)}>Edit</button>
                      </div>
                    </div>


                  </>)
              })
            }
          </div>

        </div>
        : <Spiner />}
      
    </div>
  )
}




// function EditStudents() {
//   const db = getDatabase(app)
//   const nam = useContext(Store)
 
//   const [cls,setcls]=useState('')
//   const [dta,setdata] =useState<any>()

//   const [name,setname]=useState<any>(dta.name);
//   const [mail,setmail]=useState();
//   const [fthername,setfthername]=useState();
//   const [adress,setadres]=useState();
//   const [pradres,setpradres]=useState();
//   const [ftheroc,setftheroc]=useState();


//   const getdata = () => {
//     const reference = ref(db, `Students/${nam.optval}/${nam.singlestudentname}`);
//     onValue(reference, (snapshot) => {
//       const data = snapshot.val();
//       setdata(data)

//       // setspiner(true)
//     });
//   }
//   useEffect((getdata),[])
// console.log(dta);





//   const abc = (e: any) => {
//     e.preventDefault();
//     nam.setshw(!nam.show)
//   }
  

// //   const name = useRef<any>()
// //   const mail = useRef<any>()
// //   const Fathername = useRef<any>()
// //   const adress = useRef<any>()
// //   const number = useRef<any>()
// //   const pradress = useRef<any>()
// //   const ftherocu = useRef<any>()

  
// //   const editdta = (event: any) => {
// //     const db = getDatabase(app);
// //     event.preventDefault();
// //     const obj = {
// //         name: name.current.value.trim(),
// //         mail: mail.current.value.trim(),
// //         address: adress.current.value.trim(),
// //         number: number.current.value.trim(),
// //         classname: cls,
// //         fathername: Fathername.current.value.trim(),
// //         fatherocupation: ftherocu.current.value.trim(),
// //         permanentadress: pradress.current.value.trim(),
// //         rol: ''
// //     }
// //     if (!obj.name || !obj.mail || !obj.address || !obj.number ||
// //         !obj.classname || !obj.fathername || !obj.permanentadress || !obj.fatherocupation) {

// //             toast.error("All fields are required!")
// //     } else {
// //         const refrence = ref(db, `Students/${obj.classname}/${obj.name}`)
// //         set(refrence, obj).then((dt) => {
// //             toast.success(`${obj.name} is added`)
// //             name.current.value = ''
// //             mail.current.value = ''
// //             adress.current.value = ''
// //             number.current.value = ''
// //             setcls('');
// //             Fathername.current.value = ''
// //             ftherocu.current.value = ''
// //             pradress.current.value = ''
// //         }).catch((er) => {
// //             console.log(er);

// //         })
// //     }

// // }



//   return (
//     <div className={`${nam.show ? style.show : style.edt} `}  >
//       <div >
//        <ToastContainer />
//         <div className='hediv d-flex align-items-center justify-content-between '>
//           <div className='  d-flex align-items-center justify-content-center mx-auto mt-3 mb-3 p-2'>
//             <FaAddressCard className='fs-1 me-3' />
//             <h3>Edit Students</h3>
//           </div>

//         </div>


//         <div className="container ">
//           <form action="" >
//             <div className="row ">
              
//                 return (
//                   <div className="col-md-9 d-md-flex justify-content-between  mx-auto nm">
//                     <div className='d-flex'>
//                       <label htmlFor="name">Name</label>
//                       <span>*</span>
//                     </div>
//                     <input type="text" id='name' value={name} onChange={(e:any)=>setname(e.target.value)} />
//                   </div>
//                   <div className="col-md-9 d-md-flex justify-content-between  mx-auto mt-2 nm">
//                     <div className='d-flex'>
//                       <label htmlFor="fname">Father Name</label>
//                       <span>*</span>
//                     </div>
//                     <input type="text" id='fname' placeholder={dta.fathername} />
//                   </div>

//                   <div className="col-md-9 d-md-flex justify-content-between  mx-auto mt-2 nm">
//                     <div className='d-flex'>
//                       <label htmlFor="adrs">Address</label>
//                       <span>*</span>
//                     </div>
//                     <input type="text" id='adrs' placeholder={dta.address} />
//                   </div>

//                   <div className="col-md-9 d-md-flex justify-content-between  mx-auto mt-2 nm">
//                     <div className='d-flex'>
//                       <label htmlFor="pradrs">Permanent Address</label>
//                       <span>*</span>
//                     </div>
//                     <input type="text" id='pradrs' placeholder={dta.permanentadress}/>
//                   </div>
//                   <div className="col-md-10 mx-auto mt-2 milnuminpt d-lg-flex justify-content-between">
//                     <div className='d-md-flex col-md-6'>
//                       <div className='d-flex'>
//                         <label htmlFor="focu">Father Occupation</label>
//                         <span>*</span>
//                       </div>
//                       <input type="text" id='focu' className='' placeholder={dta.fatherocupation} />
//                     </div>
//                     <div className='d-md-flex col-md-6'>
//                       <div className='d-flex'>
//                         <label htmlFor="nmb">Number</label>
//                         <span>*</span>
//                       </div>
//                       <input type="number" id='nmb' className='' placeholder={dta.number}  />
//                     </div>
//                   </div>
//                   <div className="col-md-10  mt-2 milnuminpt d-lg-flex justify-content-between">
//                     <div className='d-lg-flex col-md-6'>
//                       <div className='d-flex'>
//                         <label htmlFor="mail">Email</label>
//                         <span>*</span>
//                       </div>
//                       <input type="email" id='mail' className='' placeholder={dta.mail}  />
                    
//                     </div>

//                     <div className=' ms-3 d-md-flex mt-3 mt-lg-0 col-md-6'>
//                       <div className='d-flex'>
//                         <label htmlFor="slct">Slect Class</label>
//                         <span>*</span>
//                       </div>
//                       <select name="" id="slct" value={cls? cls : dta.classname} onChange={(e)=>setcls(e.target.value)}>
//                         <option selected> Class</option>
//                         <option value="class one">Class One</option>
//                         <option value="class two">Class Two</option>
//                         <option value="class three">Class Three</option>
//                         <option value="class four">Class Four</option>
//                         <option value="class five">Class Five</option>
//                       </select>
                      
//                     </div>
//                   </div>
//                 )
              
//             </div>



//             <div className="row pt-5 pb-5 d-flex  justify-content-center ">
//               <div className="justify-content-center d-flex">
//                 <button className='btn text-white mt-5' style={{ backgroundColor: '#d3b428' }} >Edit</button>
//                 <button className='btn ms-3 text-white mt-5' style={{ backgroundColor: '#d3b428' }} onClick={abc} >Cancle</button>
//               </div>


//             </div>
//           </form>
//         </div>
//       </div>
//     </div>

//   )


// }