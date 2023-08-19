import { useState, React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUnlock,
  faShieldHalved,
  faBell,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import Toggle from "./Toggle";

function Security() {
  const [showChangePasswordModal, setChangePasswordShowModal] = useState(false);
  const [showTFVModal, setTFVShowModal] = useState(false);
  return (
    <div className="w-11/12 h-5/6 p-2 text-primary-blue font-inter font-md flex flex-col dark:text-white">
      <div className="h-1/5 w-full"></div>
      <div className="h-3/5 w-full p-5 flex flex-col">
        <div className="w-full h-1/3 pt-2">
          <button
            className="w-full p-3 rounded-lg bg-ternary-blue flex active:bg-secondary-blue active:text-white hover:drop-shadow-xl hover:shadow-white dark:bg-dark-secondary dark:active:bg-dark-ternary"
            onClick={() => setChangePasswordShowModal(true)}
          >
            <div className="w-11/12 h-full flex items-center">
              <FontAwesomeIcon icon={faUnlock} /> &nbsp;Change Password
            </div>
            <div className="w-1/12 h-full">
              <FontAwesomeIcon icon={faCaretRight} />
            </div>
          </button>
        </div>
        <div className="w-full h-1/3 pt-2">
          <button
            className="w-full p-3 rounded-lg bg-ternary-blue flex active:bg-secondary-blue active:text-white hover:drop-shadow-xl hover:shadow-white dark:bg-dark-secondary dark:active:bg-dark-ternary"
            onClick={() => setTFVShowModal(true)}
          >
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
              <Toggle />
            </div>
          </div>
        </div>
      </div>
      <div className="h-1/5 w-full"></div>
      {/**password change modal */}
      {showChangePasswordModal ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-primary-blue dark:text-white">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="p-5 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-ternary-blue dark:bg-dark-secondary dark:border-2 dark:border-dark-ternary outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-2 rounded-t">
                  <h3 className="text-2xl font-semibold">Change Password</h3>
                  <button
                    className="p-1 ml-auto  border-0 text-primary-blue text-3xl font-semibold active:text-black"
                    onClick={() => setChangePasswordShowModal(false)}
                  >
                    <span className=" text-primary-blue drop-shadow-lg shadow-black h-6 w-6 text-4xl block dark:text-white flex items-center justify-center">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-col">
                  <form>
                    <div className="h-1/5 w-full flex flex-col">
                      <div className="">
                        <p className="font-semibold">Current password :</p>
                      </div>
                      <div className="pt-2 pb-2">
                        <input
                          type="password"
                          placeholder="Current password"
                          className="rounded-full p-2 w-full bg-white border-primary-blue border-2 text-center font-semibold dark:border-dark-ternary dark:bg-dark-ternary active:bg-secondary-blue dark:active:bg-dark-secondary"
                        />
                      </div>
                    </div>
                    <div className="h-1/5 w-full flex flex-col">
                      <div>
                        <p className="font-semibold">New Password :</p>
                      </div>
                      <div className="pt-2 pb-2">
                        <input
                          type="password"
                          placeholder="Enter your new password"
                          className="rounded-full p-2 w-full bg-white border-primary-blue border-2 text-center font-semibold dark:border-dark-ternary dark:bg-dark-ternary active:bg-secondary-blue dark:active:bg-dark-secondary"
                        />
                      </div>
                    </div>
                    <div className="h-1/5 w-full flex flex-col">
                      <div>
                        <p className="font-semibold">Confirm New Password :</p>
                      </div>
                      <div className="pt-2 pb-2">
                        <input
                          type="password"
                          placeholder="Confirm your new password"
                          className="rounded-full p-2 w-full bg-white border-primary-blue border-2 text-center font-semibold dark:border-dark-ternary dark:bg-dark-ternary active:bg-secondary-blue dark:active:bg-dark-secondary"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-1 rounded-b">
                  <button
                    className="bg-primary-blue text-white active:bg-black font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 dark:bg-dark-primary"
                    type="button"
                    onClick={() => setChangePasswordShowModal(false)}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg opacity-50 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}

      {/**Two factor verification modal */}
      {showTFVModal ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-primary-blue dark:text-white">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="p-5 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-ternary-blue dark:bg-dark-secondary dark:border-2 dark:border-dark-ternary outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-2 rounded-t">
                  <h3 className="text-lg font-semibold">
                    2 Factor Authentication
                  </h3>
                  <button
                    className="p-1 ml-auto  border-0 text-primary-blue text-3xl font-semibold active:text-black"
                    onClick={() => setTFVShowModal(false)}
                  >
                    <span className=" text-primary-blue drop-shadow-lg shadow-black h-6 w-6 text-4xl block dark:text-white flex items-center justify-center">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-col">
                  <form>
                    <div className="h-1/5 w-full flex flex-col">
                      <div className="">
                        <p className="font-semibold">Your Email :</p>
                      </div>
                      <div className="pt-2 pb-2 flex items-center justify-center">
                        <p className="font-inter font-bold">
                          123wejith@gmail.com
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-1 rounded-b">
                  <button
                    className="bg-primary-blue text-white active:bg-black font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 dark:bg-dark-primary"
                    type="button"
                    onClick={() => setTFVShowModal(false)}
                  >
                    Verify Email
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg opacity-50 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </div>
  );
}

export default Security;
