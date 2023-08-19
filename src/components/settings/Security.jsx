import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUnlock,
  faShieldHalved,
  faBell,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import Toggle from "./Toggle";

function Security() {
  return (
    <div className="w-11/12 h-5/6 p-2 text-primary-blue font-inter font-md flex flex-col dark:text-white">
      <div className="h-1/5 w-full"></div>
      <div className="h-3/5 w-full p-5 flex flex-col">
        <div className="w-full h-1/3 pt-2">
          <button className="w-full p-3 rounded-lg bg-ternary-blue flex active:bg-secondary-blue active:text-white hover:drop-shadow-xl hover:shadow-white dark:bg-dark-secondary dark:active:bg-dark-ternary">
            <div className="w-11/12 h-full flex items-center">
              <FontAwesomeIcon icon={faUnlock} /> &nbsp;Change Password
            </div>
            <div className="w-1/12 h-full">
              <FontAwesomeIcon icon={faCaretRight} />
            </div>
          </button>
        </div>
        <div className="w-full h-1/3 pt-2">
          <button className="w-full p-3 rounded-lg bg-ternary-blue flex active:bg-secondary-blue active:text-white hover:drop-shadow-xl hover:shadow-white dark:bg-dark-secondary dark:active:bg-dark-ternary">
            <div className="w-11/12 h-full flex items-center">
              <FontAwesomeIcon icon={faShieldHalved} /> &nbsp;Two Factor
              Verification
            </div>
            <div className="w-1/12 h-full">
              <FontAwesomeIcon icon={faCaretRight} />
            </div>
          </button>
        </div>
        <div className="w-full h-1/3 pt-2">
          <div className="w-full p-3 rounded-lg bg-ternary-blue flex  hover:drop-shadow-xl dark:bg-dark-secondary">
            <div className="w-11/12 h-full flex items-center">
              <FontAwesomeIcon icon={faBell} /> &nbsp;Get Alerts About
              Unrecognized Logins
            </div>
            <div className="w-1/12 h-full">
              <Toggle/>
            </div>
          </div>
        </div>
      </div>
      <div className="h-1/5 w-full"></div>
    </div>
  );
}

export default Security;
