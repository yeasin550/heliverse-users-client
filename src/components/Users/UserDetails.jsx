/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import "aos/dist/aos.css";
import { useState } from "react";
// import { AiFillStar, AiOutlineStar } from "react-icons/ai";
// import Rating from "react-rating";
import Swal from "sweetalert2";
const UserDetails = ({ user, onSelect, isSelected }) => {
  
const { id, first_name, last_name, email, gender, avatar, domain, available } =
  user;
  // const available = user?.available => true: 'available' : "not available"
  const BookNow = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Select successfully",
    });
  };
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative p-3 mt-10 shadow-md text-lg rounded-md border-2">
      <img
        className="w-full h-80 rounded-md transition-transform transform hover:scale-90 duration-500"
        src={avatar}
        alt=""
      />
      <h1 className="font-bold my-2">
        {first_name} {last_name}
      </h1>
      <p>
        {" "}
        <span className="font-semibold">Email : </span> {email}
      </p>
      <p>
        {" "}
        <span className="font-semibold">Gender : </span> {gender}
      </p>
      <p>
        {" "}
        <span className="font-semibold">Domain : </span> {domain}
      </p>
      <p>
        {" "}
        <span className="font-semibold">Available : </span>{" "}
        {available ? "Available" : "Not Available"}
      </p>

      <div className="flex items-center gap-5 space-y-2"></div>
      {/* <button
        onClick={BookNow}
        id="spotify"
        className="bg-white transform hover:-translate-y-3 mt-3 border-2 h-10 rounded-md w-full duration-500 text-green-500 border-green-500 hover:bg-green-500 hover:text-white text-xl"
      >
        Select
      </button> */}
      <button
        onClick={() => {
          onSelect(id);
          BookNow(); // You can decide where to call BookNow based on your requirements
        }}
        id="spotify"
        className={`bg-white transform hover:-translate-y-3 mt-3 border-2 h-10 rounded-md w-full duration-500 ${
          isSelected
            ? "text-white bg-green-500"
            : "text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
        } text-xl`}
      >
        {isSelected ? "Selected" : "Select"}
      </button>
    </div>
  );
};

export default UserDetails;
