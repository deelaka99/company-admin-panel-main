import React from "react";
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
  return (
    <>
      <div className="w-11/12 h-5/6 flex bg-ternary-blue drop-shadow-2xl rounded-xl dark:bg-dark-ternary">
        <div className="h-full w-1/4 flex flex-col rounded-lg">
          <div className="h-2/6 w-ful"></div>
          <div className="h-4/6 w-full flex flex-col items-start justify-center pt-8 pb-8 pl-3 pr-3 text-primary-blue dark:text-silver">
            <button className="h-1/3 w-full font-semibold text-xl rounded-lg hover:border-2 hover:border-primary-blue hover:bg-secondary-blue active:text-white dark:hover:bg-dark-primary dark:hover:border-silver dark:active:text-dark-ternary">
              <FontAwesomeIcon icon={faBell} /> &nbsp;Notification
            </button>
            <button className="h-1/3 w-full font-semibold text-xl rounded-lg hover:border-2 hover:border-primary-blue hover:bg-secondary-blue active:text-white dark:hover:bg-dark-primary dark:hover:border-silver dark:active:text-dark-ternary">
              <FontAwesomeIcon icon={faShieldHalved} /> &nbsp;Security
            </button>
            <button className="h-1/3 w-full font-semibold text-xl rounded-lg  hover:border-2 hover:border-primary-blue hover:bg-secondary-blue active:text-white dark:hover:bg-dark-primary dark:hover:border-silver dark:active:text-dark-ternary">
              <FontAwesomeIcon icon={faCircleQuestion} /> &nbsp;Help
            </button>
          </div>
          <div className="h-2/6 w-ful"></div>
        </div>
        <div className="h-full w-3/4 bg-primary-blue rounded-xl dark:bg-dark-primary">
            <Notification/>
        </div>
      </div>
    </>
  );
}

export default SettingContainer;
