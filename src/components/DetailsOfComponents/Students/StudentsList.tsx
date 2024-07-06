
import { MdGroups } from "react-icons/md";
import './studentsList.css';
import { useContext, useEffect, useState } from "react";
import { Store } from "../../ContexStore/contex";
import { get, getDatabase, ref } from "firebase/database";
import app from "../../../config/firbaseconfig";
import { Link, } from "react-router-dom";
import { MdPageview } from "react-icons/md";
import Spiner from "../../Spiner";
import { ToastContainer, toast } from "react-toastify";



export default function StudentsDetails() {

  const contexval = useContext(Store);
  const db = getDatabase(app);
  const [spiner, setspiner] = useState(true)


  const selectval = (e: any) => {
    let a = e.target.value
    contexval.setoptval(a);
    setspiner(false)
  }

  const getdata = () => {
    const reference = ref(db, `Students/${contexval.optval}`);
    get(reference).then((snapshot: any) => {
      const data = snapshot.val();
      if (snapshot){
        contexval.setstudentdata(Object.values(data))
        setspiner(false)
      }else{
        contexval.setstudentdata([])
      }
    }).catch(() => {
      toast.error(`Students Of ${contexval.optval} not present`);
      // contexval.setoptval('')
      contexval.setstudentdata('')
      setspiner(false)
    })
  };

  const spinr = () => setspiner(true);
  useEffect((spinr), [contexval.optval])

  useEffect((
    getdata
  ), [contexval.optval])

  const abc = (b: any, a: any) => {
    contexval.setsinglestdname(b)
    contexval.setsinglepage(a)
  }

  return (
    <>
      <ToastContainer />
      <div className='border mt-5 shadow' style={{ backgroundColor: '#f1f1f1' }}>
        <div className='border  d-flex justify-content-center' style={{ color: '#c3a931' }}>
          <MdGroups className='fs-1 ms-3 me-3' />
          <h2>Students Details</h2>

        </div>
        <div className="container">
          <div className="row">
            <div className="d-flex col-lg-5 mx-auto border justify-content-between py-sm-2 " style={{ backgroundColor: '#d3b428' }} >
              <h5>Please Select the Class </h5>
              <select name="" id="" onChange={selectval} >
                <option value="class one" >CLass One</option>
                <option value="class two">CLass Two</option>
                <option value="class three">CLass Three</option>
                <option value="class four">CLass Four</option>
                <option value="class five">CLass Five</option>
              </select>
            </div>
            <h6> Name/Rool Number/Class Name</h6>
            <div className="col-12 d-lg-flex  mt-3 serch">
              <div className="col-lg-5 d-flex ">
                <input type="text" />
                <button>Name</button>
              </div>
              <div className="col-lg-5 d-flex mt-2 mb-2 mt-lg-0">
                <input type="text" />
                <button>Roll#</button>
              </div>
              <h5> Total / {contexval.studentdata.length}</h5>
            </div>

            {spiner ? <Spiner /> :
              <div className="col-12 mt-4">
                <table className="table table-hover shadow mb-5" >
                  <thead>
                    <tr>
                      <th scope="col">Roll#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Father Name</th>
                      <th scope="col">Adress</th>
                      <th>Details</th>
                    </tr>
                  </thead>

                  <tbody>
                    {contexval.studentdata && contexval.studentdata.map((val: any, i: any) => {
                        
                        return (
                          <tr key={i} >
                            <th scope="row">{i + 1}</th>
                            <td>{val.name}</td>
                            <td>{val.fathername}</td>
                            <td>{val.address}</td>
                            <td>
                              <Link to={`/studrnts/StudentsList/${val.name}`} className="text-decoration-none text-black">
                                <MdPageview className="fs-2" style={{ color: '#c3a931' }} onClick={() => abc(val.name, 'singlestudent')} />
                              </Link>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>}

          </div>
        </div>

      </div>
    </>
  )
}
