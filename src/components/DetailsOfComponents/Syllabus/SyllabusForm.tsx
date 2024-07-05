import { get, getDatabase, ref, set } from "firebase/database";
import { HiClipboardDocumentList } from "react-icons/hi2";
import app from "../../../config/firbaseconfig";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function SyllabusForm() {
  const [clas, setClas] = useState<any>();
  const [subjectNames, setSubjectNames] = useState<any>([]);
  const [selectedsubj,setselectsubj]=useState();
  const discription = useRef<any>();
  const db = getDatabase(app);

  const getSubjects = () => {
    const reference = ref(db, `subjects/${clas}/`);
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
    }
    const refrence =ref(db,`syllabus/${obj.classname}/${obj.subjname}`)

    if(!obj.subjname){
      toast.error("Please Select Class");
    }else if(!obj.subjname){
      toast.error("Please Select Subject");
    }else if(!obj.dis){
      toast.error("Please Put Syllabus");
    }else{

      set(refrence,obj).then(()=>{
        toast.success(`${obj.subjname} Syllabus of ${obj.classname} is Added`);
        discription.current.value = '';
      
      }).catch((er)=>{
        alert('eror');
        console.log(er);
        
      })
    }

  }


  return (
    <div className="border text-center border-3 p-4 mt-5 shadow" style={{ backgroundColor: '#f1f1f1' }}>
      <ToastContainer />
      <div className="d-flex col-lg-3 mb-4 mx-auto" style={{ color: "#c3a931" }}>
        <HiClipboardDocumentList className="fs-1 me-2" />
        <h2>Syllabus</h2>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-10 mx-auto text-center justify-content-between mt-3 mb-5 d-lg-flex">
            <div className="d-flex col-lg-5 justify-content-between mt-3 mt-lg-0 px-3 border-0 rounded-3 py-1" style={{ backgroundColor: '#c3a931' }}>
              <h6>Select Class <span>*</span></h6>
              <select style={{ width: '50%' }} onChange={(e) => setClas(e.target.value)}>
                <option >Select</option>
                <option value="Class One">Class One</option>
                <option value="Class Two">Class Two</option>
                <option value="Class Three">Class Three</option>
                <option value="Class Four">Class Four</option>
                <option value="Class Five">Class Five</option>
              </select>
            </div>
            <div className="d-flex col-lg-5 justify-content-between mt-3 mt-lg-0 px-3 border-0 rounded-3 py-1" style={{ backgroundColor: '#c3a931' }}>
              <h6>Select Subject <span>*</span></h6>
              <select style={{ width: '50%' }} onChange={getsubjname}>
                {subjectNames.map((subject: any, index: any) => (
                  <option key={index} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="">
            <h6>Type Description: </h6>
            <div className="d-md-flex flex-column border border-2 bg-white position-relative ">
              <textarea  ref={discription} style={{ width: '100%', height: '100px', outline:'none' }} className="p-1 border-0" ></textarea>
              
            </div>
          </div>
          <button onClick={addsyllabus} className="btn col-3 mx-auto mt-4" style={{ backgroundColor: "#c3a931" }}>Submit Syllabus</button>
        </div>
      </div>
    </div>
  );
}


