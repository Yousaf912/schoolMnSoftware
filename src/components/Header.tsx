
import style from './header.module.css';
import pic from '../assets/IMG_20220131_104338.jpg'
import { useContext, useEffect, useState } from 'react';
import { Store } from './ContexStore/contex';



const Header = () => {
  const val = useContext(Store);
  const [nestli, setnstli] = useState(val.nestdli);

  const addval = () => {
    setnstli(val.nestdli)
  }
  useEffect((
    addval
  ), [val.nestdli])

  const singlstdnamestate=()=>{
    val.setsinglestdname('')
  }

  useEffect((singlstdnamestate),[val.optval,val.nestdli])
  const setval = () => {
    setnstli('')
    val.setsinglestdname('')
  }
  useEffect((
    setval
  ), [val.arrow])

  return (
    <div className={`${style.heder} shadow-lg border-0 rounded-4 p-2 d-flex justify-content-around align-items-center`}>
      <input type="text" className={style.inpt} readOnly value={`${val.arrow} ${nestli && ' > '} ${nestli} ${val.singlestudentname && '>'} ${ val.singlestudentname && val.singlestudentname} `} />
      <div>
        <img src={pic} width={50} height={50} className='border-0 rounded-circle' />
      </div>
    </div>
  )
}

export default Header