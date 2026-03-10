import axios from "axios";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);   // 👈 add this

  const submit = async () => {

    if(!email){
      alert("Enter email");
      return;
    }

    try{

      setLoading(true);   // 👈 start loading

      const res = await axios.post("https://password-reset-gdo3.onrender.com/api/auth/forgot",{email});

      alert(res.data.message);

    }
    catch(error){

      if(error.response && error.response.data.message){
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }

    }
    finally{
      setLoading(false);   // 👈 stop loading
    }

  }

  return (

    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100 justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-8">

          <div className="card shadow-lg p-4">

            <h3 className="text-center mb-4">
              <FaEnvelope className="me-2"/>
              Forgot Password
            </h3>

            <input
              type="email"
              className="form-control mb-3"
              placeholder="Enter your email"
              onChange={(e)=>setEmail(e.target.value)}
            />

            <button
              className="btn btn-primary w-100 py-2"
              onClick={submit}
              disabled={loading}   // 👈 disables button
            >
              {loading ? "Sending..." : "Send Reset Link"}   {/* 👈 button text */}
            </button>

          </div>

        </div>
      </div>
    </div>

  )
}