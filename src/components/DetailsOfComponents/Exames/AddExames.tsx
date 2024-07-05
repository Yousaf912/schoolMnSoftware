import { get, getDatabase, ref, set } from "firebase/database";
import { HiClipboardDocumentList } from "react-icons/hi2";
import app from "../../../config/firbaseconfig";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function AddExames() {
  const [clas, setClas] = useState<any>('');
  const [subjectNames, setSubjectNames] = useState<any>([]);
  const [selectedsubj,setselectsubj]=useState();
  const discription = useRef<any>();
  const db = getDatabase(app);
  const dte =useRef<any>();


  const getSubjects = () => {
    const reference = ref(db, `subjects/${clas}/`);
    clas &&
    get(reference).then((snapshot: any) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const subjectArray = Object.values(data);
        const data2 = subjectArray.splice(1, subjectArray.length)
        setSubjectNames(data2);

      } else {
        setSubjectNames([]);
      }
    }).catch((error) => {
      console.error("Error fetching subjects:", error);
      setSubjectNames([]);
    });
  };
  useEffect(() => {
    getSubjects();
  }, [clas]);

  const getsubjname =(e:any)=>{
    setselectsubj(e.target.value)
  }

  const addsyllabus=()=>{
    const obj = {
      subjname:selectedsubj,
      classname:clas,
      dis:discription.current.value,
      date:dte.current.value,
    }
    if(!obj.classname){
      toast.error("Select the class!");
    }else if(!obj.date){
      toast.error("Select the Date!");
    }else if(!obj.subjname){
      toast.error("Select the Subject!");
    }
    else{
      const refrence =ref(db,`exames/${obj.classname}/${obj.subjname}`)
      set(refrence,obj).then(()=>{
        toast.success(`Exame of ${obj.classname} is added`);
      }).catch((er)=>{
        alert('eror');
        console.log(er);
        
      })

    }

  }


  return (
    <div className="border border-3 p-4 mt-5 mb-5 shadow" style={{ backgroundColor: '#f1f1f1' }}>
      <ToastContainer />
      <div className="d-flex col-lg-4 mb-4 mx-auto" style={{ color: "#c3a931" }}>
        <HiClipboardDocumentList className="fs-1 me-2" />
        <h2>Set Exames Dtae</h2>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-7 col-lg-5 mx-auto  mt-3 mb-5 ">
            <div className="d-flex shadow justify-content-between mt-3 mt-lg-0 px-3 border-0 rounded-3 py-1" style={{ backgroundColor: '#c3a931' }}>
              <h6>Select Class <span>*</span></h6>
              <select style={{ width: '45%' }} onChange={(e) => setClas(e.target.value)} value={clas}>
                <option selected>Select</option>
                <option value="Class One">Class One</option>
                <option value="Class Two">Class Two</option>
                <option value="Class Three">Class Three</option>
                <option value="Class Four">Class Four</option>
                <option value="Class Five">Class Five</option>
              </select>
            </div>
            <div className="d-flex shadow justify-content-between mt-3  px-3 border-0 rounded-3 py-1" style={{ backgroundColor: '#c3a931' }}>
              <h6>Select Subject <span>*</span></h6>
              <select style={{ width: '45%' }} onChange={getsubjname}>
                {subjectNames.map((subject: any, index: any) => (
                  <option key={index} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div className="d-flex shadow justify-content-between mt-3  px-3 border-0 rounded-3 py-1" style={{ backgroundColor: '#c3a931' }}>
              <h6>Select Date <span>*</span></h6>
             <input type="date" ref={dte} />
            </div>
          </div>
          <div className="">
            <h6>Note for Exames: </h6>
            <div className="d-md-flex flex-column shadow border border-2 bg-white position-relative ">
              <textarea  ref={discription} style={{ width: '100%', height: '100px', outline:'none' }} className="p-1 border-0" ></textarea>
              
            </div>
          </div>
          <button onClick={addsyllabus} className="btn col-sm-3 mx-auto mt-4" style={{ backgroundColor: "#c3a931" }}>Set Secdulas</button>
        </div>
      </div>
    </div>
  );
}
