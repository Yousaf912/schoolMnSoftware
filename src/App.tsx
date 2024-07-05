
import { useEffect, useState } from 'react';
import style from './App.module.css';
import './App.module.css'
import { Store } from './components/ContexStore/contex';
import Header from './components/Header';
import Sidebar from './components/sidebar/sidebar';
import Elmnt from './components/CenterElementData/CenterData';
import DashboarDetails from './components/Dashboadetail/DashBoardDetials';



function App() {
  const [arrow, setarrow] = useState('DashBoard');
  const [nestdli, setnestdli] = useState('');
  const [studentdata, setstudentdata] = useState<any>([]);
  const [singlestudentname,setsinglestdname]=useState();
  const [snglTchrname,setSnglTechNme]=useState();
  const [optval, setoptval] = useState('class one');
  const[teacherdata,setTeacherdata]=useState();
  const [singlepage,setsinglepage]=useState<any>();
  const [show,setshw]=useState(false);
  const [singlstudent, setsinglestudent] = useState<any>([]);

  
  
  const nstdli = (a: any) => {
    setnestdli(a)
  }
  const starow = (e: any) => {
    setarrow(e)
  }
  
  const obj ={singlstudent,setsinglestudent, show,setshw,snglTchrname,setSnglTechNme,singlepage,setsinglepage,teacherdata,setTeacherdata,arrow,starow,nstdli,nestdli,studentdata,setstudentdata,singlestudentname,setsinglestdname,optval,setoptval};

  const removingState = ()=>{
    if (arrow == 'DashBoard'){
      setnestdli('')
    }
  }
  const remSinglPgSt=()=>{
    setsinglepage('')
  }
  useEffect((removingState),[arrow ]);
  useEffect((remSinglPgSt),[arrow && nestdli])


  return (
    <Store.Provider value={obj} >
      <div className="container-fluid">
        <div className="row mt-4 d-flex justify-content-between">
          <div className="col-md-4  col-lg-3 order-2 order-md-1">
            <Sidebar />
          </div>
          <div className="col-md-8 col-lg-9  order-1 order-md-2">
            <Header />
            {arrow == 'DashBoard'?
            <div>
              <DashboarDetails/>
            </div>:
            nestdli == ''?
            <div>
            <DashboarDetails/>
          </div>:
            <div className="col">
              <Elmnt></Elmnt>
            </div>}
          </div>
        </div>
      </div>
    
    </Store.Provider>
  )
}

export default App
