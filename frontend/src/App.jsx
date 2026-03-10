import {BrowserRouter,Routes,Route} from "react-router-dom";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<ForgotPassword/>} />

        <Route path="/reset/:token" element={<ResetPassword/>} />

      </Routes>

    </BrowserRouter>

  )
}

export default App