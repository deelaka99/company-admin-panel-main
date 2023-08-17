import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  return (
    <div className=" w-full h-full flex flex-col items-center justify-center dark:text-white">
      <div className="h-2/6 w-full flex items-center justify-center">
        <div className="h-5/6 w-11/12 bg-primary-blue  border-2 border-secondary-blue rounded-lg flex dark:bg-dark-primary dark:border-dark-ternary">
          <div className="w-3/12 h-full flex items-center justify-center">
            <div className="w-36 h-36 rounded-full bg-primary-blue overflow-hidden flex items-center justify-center border-4 border-white">
              <img
                className=""
                src="https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </div>
          </div>
          <div className="w-8/12 h-full  flex items-center justify-center pl-8 text-white">
            <div className="w-full h-1/4 flex flex-col">
              <div className="h-full flex">
                <h1 className="text-4xl font-inter font-medium pr-5">
                  Linada Annabel
                </h1>
                <button>
                  <FontAwesomeIcon icon={faPencil} />
                </button>
              </div>
              <h2 className="text-xl font-thin">Admin</h2>
            </div>
          </div>
          <div className="w-1/12 h-full  flex items-center justify-center"></div>
        </div>
      </div>
      <div className="h-3/6 w-full flex items-center justify-center">
        <div className="h-5/6 w-11/12 bg-primary-blue text-white flex flex-col  border-2 border-secondary-blue rounded-lg dark:bg-dark-primary dark:border-dark-ternary">
          <div className="w-full h-1/6 flex p-5">
            <div className="h-full w-5/12">
              <h1>User details:</h1>
            </div>
            <div className="h-full w-6/12"></div>
            <div className="h-full w-1/12">
              <button>
                <FontAwesomeIcon icon={faPencil} />
              </button>
            </div>
          </div>
          <div className="w-full h-5/6 flex">
            <div className="h-full w-1/5 ">
              <div className="w-full h-1/3 pt-5 pl-10 font-inter font-bold">
                <h1 className="pt-5">Email Address:</h1>
                <h1 className="pt-5">Phone number:</h1>
                <h1 className="pt-5">Address:</h1>
              </div>
            </div>
            <div className="h-full w-4/5 pt-5">
              <h1 className="pt-5">123wejith@gmail.com</h1>
              <h1 className="pt-5">+94 77 133 9343</h1>
              <h1 className="pt-5">105/01/136, Horagala East, Padukka.</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
