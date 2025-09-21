import { useState, useCallback } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [AllowNumber, setAllowNumber] = useState(false)
  const [AllowCharacter, setAllowCharacter] = useState(false)
  const [password, setPassword] = useState("")


  const passwordGenerator = useCallback(() => {
    const password = ""
    const string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(AllowNumber) string += "0123456789"
    if(AllowCharacter) string += "!@#$%^&*()_+"

    for(let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length + 1)
      password += string.charAt(char)
    }
    setPassword(password)
    
  }, [length, AllowNumber, AllowCharacter])


  return (
    <>
 

    <div className="flex items-center justify-center w-full max-w-md mx-auto shadow-lg rounded-lg px-6 py-4 my-8 text-orange-500 bg-gray-800 ">
      <div className="flex items-center justify-between shadow-md rounded-lg overflow-hidden mb-7">
      <h1 className="flex items-center justify-center text-xl font-bold  text-center text-white">
      Password Generator
    </h1>
        <input
          type="text"
          value={password}
          className="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
          placeholder="Password"
          readOnly
        />
        <button className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white ml-2">copy</button>
      </div>
    </div>
  </>
  )
}

export default App
