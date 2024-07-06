// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBo0I9cTKN-C61fksm8KTZWLFe_nWuoi0c",
  authDomain: "crued-img.firebaseapp.com",
  databaseURL: "https://crued-img-default-rtdb.firebaseio.com",
  projectId: "crued-img",
  storageBucket: "crued-img.appspot.com",
  messagingSenderId: "354915630135",
  appId: "1:354915630135:web:6e6209d03a4509ff6d13b2",
  measurementId: "G-R8YE11G9QH"
};
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;