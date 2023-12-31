import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faShieldHalved,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";

import Notification from "./Notification";
import Security from "./Security";
import Help from "./Help";

function SettingContainer() {
  const [activeComponent, setActiveComponent] = useState("Notification");

  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };
  return (
    <>
      <div className="w-4/6 h-5/6 flex bg-ternary-blue drop-shadow-2xl rounded-xl dark:bg-dark-ternary">
        <div className="h-full w-1/4 flex flex-col rounded-lg">
          <div className="h-2/6 w-ful"></div>
          <div className="h-4/6 w-full flex flex-col items-start justify-center pt-8 pb-8 pl-3 pr-3 text-primary-blue dark:text-silver">
            <button
              className={`${
                activeComponent === "Notification"
                  ? "hover:font-semibold border-2 border-primary-blue bg-secondary-blue dark:text-white dark:bg-dark-primary dark:border-silver"
                  : "text-primary-blue dark:text-silver"
              } h-1/3 w-full font-semibold text-xl rounded-lg hover:font-bold active:text-white  dark:hover:border-silver dark:active:text-dark-ternary`}
              onClick={() => handleButtonClick("Notification")}
            >
              <div className="h-full w-full p-3 flex items-center">
                <FontAwesomeIcon icon={faBell} /> &nbsp;Notification
              </div>
            </button>
            <button
              className={`${
                activeComponent === "Security"
                  ? "hover:font-semibold border-2 border-primary-blue bg-secondary-blue dark:text-white dark:bg-dark-primary dark:border-silver"
                  : "text-primary-blue dark:text-silver"
              } h-1/3 w-full font-semibold text-xl rounded-lg hover:font-bold active:text-white  dark:hover:border-silver dark:active:text-dark-ternary`}
              onClick={() => handleButtonClick("Security")}
            >
              <div className="h-full w-full p-3 flex items-center">
                <FontAwesomeIcon icon={faShieldHalved} /> &nbsp;Security
              </div>
            </button>
            <button
              className={`${
                activeComponent === "Help"
                  ? "hover:font-semibold border-2 border-primary-blue bg-secondary-blue dark:text-white dark:bg-dark-primary dark:border-silver"
                  : "text-primary-blue dark:text-silver"
              } h-1/3 w-full font-semibold text-xl rounded-lg hover:font-bold active:text-white  dark:hover:border-silver dark:active:text-dark-ternary`}
              onClick={() => handleButtonClick("Help")}
            >
              <div className="h-full w-full p-3 flex items-center">
                <FontAwesomeIcon icon={faCircleQuestion} /> &nbsp;Help
              </div>
            </button>
          </div>
          <div className="h-2/6 w-ful"></div>
        </div>
        <div className="h-full w-3/4 bg-primary-blue rounded-br-xl rounded-tr-xl dark:bg-dark-primary flex justify-center items-center">
          {activeComponent === "Notification" && <Notification />}
          {activeComponent === "Security" && <Security />}
          {activeComponent === "Help" && <Help />}
        </div>
      </div>
    </>
  );
}

export default SettingContainer;
