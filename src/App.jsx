import React from 'react'
import { useCallback, useState, useEffect, useRef } from 'react';

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div  className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly ref={passwordRef} />
            <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
  </div>
  )
}

export default App

// import React, { useCallback, useEffect, useRef, useState } from 'react'

// function App() {

//   const [length, setLength] = useState(8);
//   const [number, setNumber] = useState(false);
//   const [char, setChar] = useState(false);
//   const [password, setPassword] = useState("");

//   const passwordGenerator = useCallback(() => {
//     let pass = "";
//     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
//     if(number) str += "0123456789"
//     if(char) str += "!@#$%^&*"

//     for (let i = 0; i <= length; i++) {
//       let char = Math.floor(Math.random() * str.length + 1)
//       pass += str.charAt(char)
//     }
//     setPassword(pass)

//   }, [length, number, char, setPassword])

//   useEffect(()=>{
//     passwordGenerator()
//   }, [length, number, char, passwordGenerator])

//   const passwordRef = useRef(null)
//   const copyPassword = useCallback(()=>{
//     passwordRef.current?.select();
//     passwordRef
//     window.navigator.clipboard.writeText(password)
//   }, [password])



//   return (
//     <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
//       <h1 className='text-center text-white my-3'>Password Generator</h1>

//       <div className='flex shadow rounded-lg overflow-hidden mb-4'>
//         <input ref={passwordRef} type="text" value={password} readOnly className='px-3 py-1 outline-none w-full' placeholder='Password' />
//         <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={copyPassword}>Copy</button>
//       </div>

//       <div className='flex items-center text-sm gap-x-4'>

//         <div className='flex items-center gap-x-1'>
//           <input onChange={(e)=>{setLength(e.target.value)}} type="range" className='cursor-pointer' value={length} min={8} max={100}/>
//           <label htmlFor="">Length: {length}</label>
//         </div>

//         <div className='flex items-center gap-x-1'>
//           <input type="checkbox" defaultChecked={number} onChange={()=>{
//             setNumber((prev) => !prev)
//           }} />
//           <label htmlFor="">Numbers</label>
//         </div>

//         <div className='flex items-center gap-x-1'>
//           <input type="checkbox" defaultChecked={char} onChange={()=>{
//             setNumber((prev) => !prev)
//           }} />
//           <label htmlFor="">Characters</label>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default App