import React from 'react' 
import { RxCrossCircled } from "react-icons/rx";

const Error = ({ children }) => {
  
    return (
        <div  className='margin-custom'>
            <h2 className='mt-5 text-danger'> {children} <RxCrossCircled /> </h2>
            <p className='text-danger'>Please try again.</p>
            <button onClick = {() => window.location.reload() } className='btnClass mt-4'>Retry</button>
        </div>
)
}

export default Error