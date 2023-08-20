import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faPeopleRoof,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import AddNewLab from "../../components/management/AddNewLab";
import Manage from "../../components/management/Manage";
import Payment from "../../components/management/Payment";

const Management = () => {
  const [activeComponent, setActiveComponent] = useState("AddNewLab");

  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };
  return (
    <>
      <div className="w-11/12 h-5/6 flex bg-ternary-blue drop-shadow-2xl rounded-xl dark:bg-dark-ternary">
        <div className="h-full w-1/5 flex flex-col rounded-lg">
          <div className="h-2/6 w-ful"></div>
          <div className="h-4/6 w-full flex flex-col items-start justify-center pt-8 pb-8 pl-3 pr-3 text-primary-blue dark:text-silver">
            <button
              className={`${
                activeComponent === "AddNewLab"
                  ? "hover:font-semibold border-2 border-primary-blue bg-secondary-blue dark:text-white dark:bg-dark-primary dark:border-silver"
                  : "text-primary-blue dark:text-silver"
              } h-1/3 w-full font-semibold text-xl rounded-lg hover:font-bold active:text-white  dark:hover:border-silver dark:active:text-dark-ternary`}
              onClick={() => handleButtonClick("AddNewLab")}
            >
              <div className="h-full w-full p-3 flex items-center">
                <FontAwesomeIcon icon={faSquarePlus} /> &nbsp;Add New Lab
              </div>
            </button>
            <button
              className={`${
                activeComponent === "Manage"
                  ? "hover:font-semibold border-2 border-primary-blue bg-secondary-blue dark:text-white dark:bg-dark-primary dark:border-silver"
                  : "text-primary-blue dark:text-silver"
              } h-1/3 w-full font-semibold text-xl rounded-lg hover:font-bold active:text-white  dark:hover:border-silver dark:active:text-dark-ternary`}
              onClick={() => handleButtonClick("Manage")}
            >
              <div className="h-full w-full p-3 flex items-center">
                <FontAwesomeIcon icon={faPeopleRoof} /> &nbsp;Manage Labs
              </div>
            </button>
            <button
              className={`${
                activeComponent === "Payment"
                  ? "hover:font-semibold border-2 border-primary-blue bg-secondary-blue dark:text-white dark:bg-dark-primary dark:border-silver"
                  : "text-primary-blue dark:text-silver"
              } h-1/3 w-full font-semibold text-xl rounded-lg hover:font-bold active:text-white  dark:hover:border-silver dark:active:text-dark-ternary`}
              onClick={() => handleButtonClick("Payment")}
            >
              <div className="h-full w-full p-3 flex items-center">
                <FontAwesomeIcon icon={faCreditCard} /> &nbsp;Payment
              </div>
            </button>
          </div>
          <div className="h-2/6 w-ful"></div>
        </div>
        <div className="h-full w-4/5 bg-primary-blue rounded-br-xl rounded-tr-xl dark:bg-dark-primary flex justify-center items-center">
          {activeComponent === "AddNewLab" && <AddNewLab />}
          {activeComponent === "Manage" && <Manage />}
          {activeComponent === "Payment" && <Payment />}
        </div>
      </div>
    </>
  );
  // return (
  //   <div className=" w-full h-full flex flex-col overflow-y-scroll dark:text-white">
  //     <div className="h-full w-full">
  //       <AddNewLab />
  //     </div>
  //     <div className="h-full w-full">
  //       <Manage />
  //     </div>
  //     <div className="h-full w-full">
  //       <Payment />
  //     </div>
  //   </div>
  // );
};

export default Management;
