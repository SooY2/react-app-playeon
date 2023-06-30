import {BrowserRouter,Route,Routes} from "react-router-dom";
import {useState} from "react";

import {Landing, Join, Main} from "./pages";


function App() {

  let [tmp,setTmp]=useState(10);

  return (<div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>}></Route>
      <Route path="/join" element={<Join/>}></Route>
      <Route path="/main/:userId" element={<Main/>}></Route>
    </Routes>
    </BrowserRouter>

    
  </div>


  );
}

export default App;
