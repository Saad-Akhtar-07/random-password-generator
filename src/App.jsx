import { useState, useCallback, useEffect ,useRef} from "react";

function App() {
  const [length, setLength] = useState(8);
  const [AllowNumber, setAllowNumber] = useState(false);
  const [AllowCharacter, setAllowCharacter] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (AllowNumber) chars += "0123456789";
    if (AllowCharacter) chars += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(randomIndex);
    }
    setPassword(pass);
  }, [length, AllowNumber, AllowCharacter]);


 const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
 
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, AllowNumber, AllowCharacter,passwordGenerator]);

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-white mt-6">
        Password Generator
      </h1>

      <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-6 py-6 my-8 text-orange-500 bg-gray-800 space-y-6">
        
        {/* Password box with copy button */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={password}
            className="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
            placeholder="Password"
            readOnly
            ref={passwordRef} 
          />
          <button
            className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg 
             hover:bg-orange-600 active:bg-orange-700 
             active:scale-95 transition duration-150"
            // onClick={() => navigator.clipboard.writeText(password)}
            onClick={copyPasswordToClipboard }
          >
            Copy
          </button>
        </div>

        {/* Controls */}
        <div className="space-y-4 text-sm text-white">
          {/* Length Slider */}
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={6}
              max={32}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer "
            />
            <label>Length: {length}</label>
          </div>

          {/* Options */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={AllowNumber}
                onChange={() => setAllowNumber((prev) => !prev)}
              />
              Numbers
            </label>

            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={AllowCharacter}
                onChange={() => setAllowCharacter((prev) => !prev)}
              />
              Special Chars
            </label>
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
