import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { AccountContext } from "../context/AccountContext";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const {isAuthenticated} = useContext(AccountContext);

  useEffect(()=>{
    const fetchDoctors = async() =>{
      try{
        const {data} = await axios.get("http://localhost:3200/api/v1/user/doctors",
          {withCredentials:true},
        )

        setDoctors(data.doctors);

      }catch(err){
        toast.error(err.response.data.message);
      }
    }

    fetchDoctors();
  },[])

  if(!isAuthenticated){
    return <Navigate to={'/login'}/>
   }
  return (
    <section className="page doctors">
      <h1>DOCTORS</h1>
      <div className="banner">
        {doctors && doctors.length > 0 ? (
          doctors.map((element) => {
            return (
              <div className="card">
                <img
                  src={element.avatar && element.avatar.url}
                  alt="doctor avatar"
                />
                <h4>{`${element.firstname} ${element.lastname}`}</h4>
                <div className="details">
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    DOB: <span>{element.dob.substring(0, 10)}</span>
                  </p>
                  <p>
                    Department: <span>{element.doctorDepartment}</span>
                  </p>
                  <p>
                    Gender: <span>{element.gender}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Registered Doctors Found!</h1>
        )}
      </div>
    </section>
  )
}

export default Doctors
