import { getDatabase, ref, set } from "firebase/database";
import app from "./firbaseconfig";

const db = getDatabase(app);

export const sendData = (nodename:any,data:any)=>{
    const refernce = ref(db,`${nodename}`);
    set(refernce,data)
}




