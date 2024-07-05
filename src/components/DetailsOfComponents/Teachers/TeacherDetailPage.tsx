import { useContext, useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Store } from "../../ContexStore/contex";
import { getDatabase, onValue, ref } from "firebase/database";
import app from "../../../config/firbaseconfig";
import './teacherdetailpage.css'
import Spiner from "../../Spiner";


export default function () {
    const [spiner,setspiner]=useState(true)
    const [singlTeacher, setsinglesTeacher] = useState<any>([]);
    const nm = useContext(Store);
    const db = getDatabase(app);

    const abc = () => {
        nm.setsinglepage('')
        nm.setsinglestdname('')
    }

    const getdata = () => {
        const reference = ref(db, `Teaschers/${nm.snglTchrname}`);
        onValue(reference, (snapshot) => {
            const data = snapshot.val();
            setsinglesTeacher([data])
            setspiner(false)
        });
    }

    useEffect((
        getdata
    ), [])


    return (
        <div className='border border-3 py-4 px-5 text-center shadow mt-4' style={{ backgroundColor: '#f1f1f1' }}>
            {spiner?<Spiner/>:
            <div className="container  border py-2 border-2 rounded-3">
                <div className="row">
                    <div className="col-2 border py-2  justify-content-around  mt-2 ms-1 rounded-2 d-flex align-items-center"
                        style={{ backgroundColor: '#c3a931', cursor: "pointer" }} onClick={abc}>
                        <IoMdArrowRoundBack className="fs-2 " />
                        <h6>Go back</h6>
                    </div>

                    {singlTeacher.map((val: any, i: any) => {
                        return (
                            <>

                                <h3 className='text-center'>Details Of " <span className="text-black">{val.name}</span>"  </h3>
                                <div className="col-md-12 text-center mt-4">
                                    <div className='d-lg-flex justify-content-between col-md-8 mx-auto '>
                                        <div className='d-flex'>
                                            <p>Name : </p>
                                            <h6 className='mt-1 ms-3'>{val.name}</h6>
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

                                    <div className='d-flex justify-content-between col-md-8 mx-auto '>
                                        <div className='d-flex'>
                                            <p>Address: </p>
                                            <h6 className='mt-1 '>{val.adres}</h6>
                                        </div>
                                    </div>
                                    <h4 className="mt-4 mb-5 ">Qualification Background</h4>
                                    <div className="qualification">
                                        <div className='d-lg-flex justify-content-between col-md-10 mx-auto nm'>
                                            <div className='d-flex'>
                                                <p>Degree1 : </p>
                                                <h6 className='mt-1 ms-3'>{val.dgre1}</h6>
                                            </div>
                                            <div className='d-flex'>
                                                <p>Institue: </p>
                                                <h6 className='mt-1 ms-3'>{val.institute1}</h6>
                                            </div>
                                            <div className='d-flex'>
                                                <p>Passing Year: </p>
                                                <h6 className='mt-1 ms-3'>{val.psingyer}</h6>
                                            </div>
                                            <div className='d-flex'>
                                                <p>Status: </p>
                                                <h6 className='mt-1 ms-3'>{val.result1}</h6>
                                            </div>
                                        </div>

                                        <div className='d-lg-flex justify-content-between col-md-10 mx-auto nm'>
                                            <div className='d-flex'>
                                                <p>Degree2 : </p>
                                                <h6 className='mt-1 ms-3'>{val.dgre2}</h6>
                                            </div>
                                            <div className='d-flex'>
                                                <p>Institue: </p>
                                                <h6 className='mt-1 ms-3'>{val.institute2}</h6>
                                            </div>
                                            <div className='d-flex'>
                                                <p>Passing Year: </p>
                                                <h6 className='mt-1 ms-3'>{val.psingyer2}</h6>
                                            </div>
                                            <div className='d-flex'>
                                                <p>Status: </p>
                                                <h6 className='mt-1 ms-3'>{val.result12}</h6>
                                            </div>
                                        </div>
                                        <div className='d-lg-flex justify-content-between col-md-10 mx-auto nm'>
                                            <div className='d-flex'>
                                                <p>Degree3 : </p>
                                                <h6 className='mt-1 ms-3'>{val.dgre3}</h6>
                                            </div>
                                            <div className='d-flex'>
                                                <p>Institue: </p>
                                                <h6 className='mt-1 ms-3'>{val.institute3}</h6>
                                            </div>
                                            <div className='d-flex'>
                                                <p>Passing Year: </p>
                                                <h6 className='mt-1 ms-3'>{val.psingyer3}</h6>
                                            </div>
                                            <div className='d-flex'>
                                                <p>Status: </p>
                                                <h6 className='mt-1 ms-3'>{val.result3}</h6>
                                            </div>
                                        </div>

                                    </div>

                                    <div>
                                        <button className='btn mt-4 mb-2' style={{ backgroundColor: '#c3a931' }}>Edit</button>
                                    </div>
                                </div>


                            </>)
                    })}
                </div>
            </div>}
        </div>
    )
}