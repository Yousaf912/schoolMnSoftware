
import { useContext, useRef, useState } from 'react';
import { FaAddressCard } from "react-icons/fa6";
import './Addstudent.css';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { sendData } from '../../../config/firbasemethds';
import { Store } from '../../ContexStore/contex';
import { get, getDatabase, ref, set } from 'firebase/database';
import app from '../../../config/firbaseconfig';
import { ToastContainer, toast } from 'react-toastify';


export default function Addstudents() {
    const contextval = useContext(Store);

    const [arrowup, setarrow] = useState(true);
    const name = useRef<any>()
    const mail = useRef<any>()
    const Fathername = useRef<any>()
    const adress = useRef<any>()
    const classname = useRef<any>()
    const number = useRef<any>()
    const pradress = useRef<any>()
    const ftherocu = useRef<any>()

    const submintData = (event: any) => {
        const db = getDatabase(app);
        event.preventDefault();
        const obj = {
            name: name.current.value.trim(),
            mail: mail.current.value.trim(),
            address: adress.current.value.trim(),
            number: number.current.value.trim(),
            classname: classname.current.value.trim(),
            fathername: Fathername.current.value.trim(),
            fatherocupation: ftherocu.current.value.trim(),
            permanentadress: pradress.current.value.trim(),
            rol: ''
        }
        if (!obj.name || !obj.mail || !obj.address || !obj.number ||
            !obj.classname || !obj.fathername || !obj.permanentadress || !obj.fatherocupation) {

                toast.error("All fields are required!")
        } else {
            const refrence = ref(db, `Students/${obj.classname}/${obj.name}`)
            set(refrence, obj).then((dt) => {
                toast.success(`${obj.name} is added`)
                name.current.value = ''
                mail.current.value = ''
                adress.current.value = ''
                number.current.value = ''
                classname.current.value = ''
                Fathername.current.value = ''
                ftherocu.current.value = ''
                pradress.current.value = ''
            }).catch((er) => {
                console.log(er);

            })
        }

    }

    return (
        <div className='border border-3 mt-5 shadow' style={{ backgroundColor: '#f1f1f1' }}>
            
            <div className='hediv d-flex align-items-center justify-content-between '>
                <div className='  d-flex align-items-center p-2'>
                    <FaAddressCard className='fs-1 me-3' />
                    <h3>Add Students</h3>
                </div>
                <div className='fs-1 pe-4' onClick={() => { setarrow(!arrowup) }}>
                    {arrowup ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                </div>
            </div>
            <ToastContainer/>
            {arrowup &&
                <div className="container ">
                    <form action="" onSubmit={submintData}>
                        <div className="row ">
                            <div className="col-md-9 d-md-flex justify-content-between  mx-auto nm">
                                <div className='d-flex'>
                                    <label htmlFor="name">Name</label>
                                    <span>*</span>
                                </div>
                                <input type="text" id='name' ref={name} />
                            </div>
                            <div className="col-md-9 d-md-flex justify-content-between  mx-auto mt-2 nm">
                                <div className='d-flex'>
                                    <label htmlFor="fname">Father Name</label>
                                    <span>*</span>
                                </div>
                                <input type="text" id='fname' ref={Fathername} />
                            </div>

                            <div className="col-md-9 d-md-flex justify-content-between  mx-auto mt-2 nm">
                                <div className='d-flex'>
                                    <label htmlFor="adrs">Address</label>
                                    <span>*</span>
                                </div>
                                <input type="text" id='adrs' ref={adress} />
                            </div>

                            <div className="col-md-9 d-md-flex justify-content-between  mx-auto mt-2 nm">
                                <div className='d-flex'>
                                    <label htmlFor="pradrs">Permanent Address</label>
                                    <span>*</span>
                                </div>
                                <input type="text" id='pradrs' ref={pradress} />
                            </div>
                            <div className="col-md-10 mx-auto mt-2 milnuminpt d-lg-flex justify-content-between">
                                <div className='d-md-flex col-md-6'>
                                    <div className='d-flex'>
                                        <label htmlFor="focu">Father Occupation</label>
                                        <span>*</span>
                                    </div>
                                    <input type="text" id='focu' className='' ref={ftherocu} />
                                </div>
                                <div className='d-md-flex col-md-6'>
                                    <div className='d-flex'>
                                        <label htmlFor="nmb">Number</label>
                                        <span>*</span>
                                    </div>
                                    <input type="number" id='nmb' className='' ref={number} />
                                </div>
                            </div>
                            <div className="col-md-10 mx-auto mt-2 milnuminpt d-lg-flex justify-content-between">
                                <div className='d-md-flex col-md-6'>
                                    <div className='d-flex'>
                                        <label htmlFor="mail">Email</label>
                                        <span>*</span>
                                    </div>
                                    <input type="email" id='mail' className='' ref={mail} />
                                </div>
                                <div className='d-md-flex col-md-6'>
                                    <div className='d-flex'>
                                        <label htmlFor="slct">Class</label>
                                        <span>*</span>
                                    </div>
                                    <select name="" id="slct" ref={classname}>
                                        <option value="" selected>Select Class</option>
                                        <option value="class one">Class One</option>
                                        <option value="class two">Class Two</option>
                                        <option value="class three">Class Three</option>
                                        <option value="class four">Class Four</option>
                                        <option value="class five">Class Five</option>
                                    </select>
                                </div>
                            </div>
                        </div>



                        <div className="row pt-5 pb-5 d-flex  justify-content-center ">
                            <div className="text-center">
                                <button className='btn text-white mt-5' style={{ backgroundColor: '#d3b428' }} >Submit</button>
                            </div>


                        </div>
                    </form>
                </div>}
        </div>
    )
}




