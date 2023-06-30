import {Route,Routes} from "react-router-dom";
import {useState} from "react";

import {Landing, Join, Main} from "./pages";


function App() {

  return (<div>
    
    <Routes>
      <Route path="/" element={<Landing/>}></Route>
      <Route path="/join" element={<Join/>}></Route>
      <Route path="/main/:userId" element={<Main/>}></Route>
    </Routes>
    

    
  </div>


  );
}

export default App;
