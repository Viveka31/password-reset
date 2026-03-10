import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ResetPassword(){

  

  const {token} = useParams();

  const [password,setPassword] = useState("");
  const [valid,setValid] = useState(true);

  useEffect(()=>{

    const checkToken = async () => {

      try{

        await axios.get(`http://localhost:5000/api/auth/verify/${token}`);

      }catch(err){

        setValid(false);
        alert("Reset link expired");

      }

    }

    checkToken();

 },[token])


  const submit = async ()=>{

  if(!valid){
    alert("Token expired");
    return;
  }

  if(!password){
    alert("Enter new password");
    return;
  }

  try{

    const res = await axios.post(
      `http://localhost:5000/api/auth/reset/${token}`,
      { password }
    );

    alert(res.data.message);

  }catch(err){

    alert(err.response?.data?.message || "Error resetting password");

  }

}

  return(
    <div className="container mt-5">

      <h2>Reset Password</h2>

      <input
        type="password"
        className="form-control"
        placeholder="New Password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button className="btn btn-success mt-3" onClick={submit}>
        Reset Password
      </button>

    </div>
  )
}