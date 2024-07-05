
import { MdGroups } from "react-icons/md";
import './teacherslist.css'
import { get, getDatabase, onValue, ref } from "firebase/database";
import app from "../../../config/firbaseconfig";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../ContexStore/contex";
import { MdPageview } from "react-icons/md";
import { Link } from "react-router-dom";
import Spiner from "../../Spiner";

export default function TeacherList() {
  const conexval = useContext(Store);
  const db = getDatabase(app)
  const [spiner,setspiner]=useState(true);


  const getdata = () => {
    const reference = ref(db, 'Teaschers/');
    onValue(reference, (dta) => {
      const dat = Object.values(dta.val());
      conexval.setTeacherdata(dat)
      setspiner(false)
    })

  }
  const data = conexval.teacherdata;

  const abc = (a:any, b:any) => {
    conexval.setSnglTechNme(a)
    conexval.setsinglepage(b);
    conexval.setsinglestdname(a)
  }
 console.log(conexval.snglTchrname);
 
  

  useEffect((getdata), [])
  return (
    <div className="text-center">
    {spiner?<Spiner/>:
      <div className='border mt-5 pb-5 shadow' style={{ backgroundColor: '#f1f1f1' }}>
        <div className='border  d-flex justify-content-center' style={{ color: '#c3a931' }}>
          <MdGroups className='fs-1 ms-3 me-3' />
          <h2>Teachers List</h2>
        </div>
        <div className="container">
          <div className="row">
            <p className='mt-3'>Search Teachers By Name</p>
            <div className="col-12  mt-3 serch">
              <div className="col-3 ">
                <input type="text" />
                <button>Name</button>
              </div>
            </div>
            <div className="col-12 mt-4">

              <table className="table shadow table-hover">
                <thead>
                  <tr>
                    <th scope="col">ID#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Adress</th>
                    {/* <th scope="col"></th> */}
                    <th scope="col">Number</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>

                  {data && data.map((val: any, i: any) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{val.name}</td>
                        <td>{val.adres}</td>
                        <td>{val.number}</td>
                        <td>
                          <Link to={`/Teachers/TeachersList/${val.name}`}>
                            <MdPageview className="fs-2" style={{ color: '#c3a931' }} onClick={() => abc(val.name, 'teachersinglepage')} />
                            </Link>
                        </td>
                      </tr>
                    )
                  })}

                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>}
    </div>
  )
}
