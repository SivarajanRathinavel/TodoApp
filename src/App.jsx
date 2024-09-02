import { useState } from 'react'

import './App.css'
import { Todo } from './Components/Todo'

function App() {
  const [trigger, setTrigger] = useState(true)
  const handleClick = () =>{
    setTrigger(!trigger);
  }

  return (
    <>
    <div className="container">
      <Todo/>
    </div>
      {/* <h3 style={{textAlign:'center'}}>TwoWay Switch Simulation</h3>
      <div className="container">
        <div className={`${trigger?"box":"box-off"}`}>
        <div className="light">
          {trigger?"Power On":"Power Off"}
        </div>
        </div>
        <div className="button">
          <div className="switch" onClick={()=>handleClick()}>
            Switch 1
          </div>
          <div className="switch" onClick={()=>handleClick()}>
            Switch 2
          </div>
        </div>
      </div> */}
    </>
      
  )
}

export default App
