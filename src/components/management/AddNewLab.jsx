import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { uid } from "uid";
import { set, ref } from "firebase/database";

function AddNewLab() {
  const [showAddedSuccessModal, setShowAddedSuccessModal] = useState(false);
  const [showAddedUnsuccessModal, setShowAddedUnsuccessModal] = useState(false);
  //variable state
  const [userName, setUserName] = useState("");
  const [LabName, setLabName] = useState("");
  const [district, setDistrict] = useState("");
  const [telephone, setTelephone] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  //error states
  const [userNameError, setUserNameError] = useState("");
  const [labNameError, setLabNameError] = useState("");
  const [districtError, setDistrictError] = useState("");
  const [telephoneError, setTelephoneError] = useState("");
  const [paymentDateError, setPaymentDateError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [provinceError, setProvinceError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [amountError, setAmountError] = useState("");

  //write
  const writeToDatabase = () => {
    //validation checks
    let isValid = true;

    //password validation things
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-="']/.test(
      password
    );
    const isLengthValid = password.length >= 8; // minimum 8 characters

    //email validation things
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    //amount validation things
    const amountPattern = /^\d+(\.\d{1,2})?$/;

    if (!userName) {
      setUserNameError("User name is required");
      isValid = false;
    }

    if (!LabName) {
      setLabNameError("Lab name is required");
      isValid = false;
    }

    if (!district) {
      setDistrictError("District is required");
      isValid = false;
    }

    if (!telephone) {
      setTelephoneError("Telephone number is required");
      isValid = false;
    } else if (!/^\d{10}$/.test(telephone)) {
      setTelephoneError(
        "Invalid telephone number. Please enter a 10-digit number."
      );
      isValid = false;
    }

    if (!paymentDate) {
      setPaymentDateError("Payment date is required");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (
      !hasUppercase ||
      !hasLowercase ||
      !hasNumber ||
      !hasSpecialChar ||
      !isLengthValid
    ) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long."
      );
      isValid = false;
    }

    if (!address) {
      setAddressError("Address is required");
      isValid = false;
    }

    if (!province) {
      setProvinceError("Province is required");
      isValid = false;
    }

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      setEmailError(
        "Invalid email format. Please enter a valid email address."
      );
      isValid = false;
    } 

    if (!amount) {
      setAmountError("Amount is required");
      isValid = false;
    }else if (!amountPattern.test(amount)) {
      setAmountError(
        "Invalid amount format. Please enter a valid amount."
      );
      isValid = false;
    } 

    if (!isValid) {
      setShowAddedUnsuccessModal(true);
      return; //not proceed if there are validation errors
    } else {
      const uuid = uid();
      set(ref(db, `/${uuid}`), {
        userName,
        LabName,
        district,
        telephone,
        paymentDate,
        password,
        address,
        province,
        email,
        amount,
      });

      setUserName("");
      setLabName("");
      setDistrict("");
      setTelephone("");
      setPaymentDate("");
      setPassword("");
      setAddress("");
      setProvince("");
      setEmail("");
      setAmount("");

      setShowAddedSuccessModal(true);
    }
  };
  //read

  //update

  //delete

  return (
    <div className="flex flex-col w-full h-full ">
      <div className="h-full w-full flex items-center justify-center">
        <div className="border-2 border-secondary-blue bg-primary-blue dark:bg-dark-primary dark:border-dark-ternary h-5/6 w-11/12 rounded-3xl flex flex-col">
          <div className="h-4/5 w-full p-2 flex text-white">
            {/**first column */}
            <div className="w-1/2 h-full p-3">
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">User name</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter user name"
                    className={`${userNameError === "" ? "border-secondary-blue bg-white" : "border-white bg-red-2 text-white dark:text-white"} w-full h-full rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg`}
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      setUserNameError(""); // Clear error when the user types
                    }}
                  />
                </div>
              </div>
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">Lab name</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter Lab name"
                    className={`${labNameError === "" ? "border-secondary-blue bg-white" : "border-white bg-red-2 text-white dark:text-white"} w-full h-full rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg`}
                    value={LabName}
                    onChange={(e) => {
                      setLabName(e.target.value);
                      setLabNameError("");
                    }}
                  />
                </div>
              </div>
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">District</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter district"
                    className={`${districtError === "" ? "border-secondary-blue bg-white" : "border-white bg-red-2 text-white dark:text-white"} w-full h-full rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg`}
                    value={district}
                    onChange={(e) => {
                      setDistrict(e.target.value);
                      setDistrictError("");
                    }}
                  />
                </div>
              </div>
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">Telephone</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter telephone number"
                    className={`${telephoneError === "" ? "border-secondary-blue bg-white" : "border-white bg-red-2 text-white dark:text-white"} w-full h-full rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg`}
                    value={telephone}
                    onChange={(e) => {
                      setTelephone(e.target.value);
                      setTelephoneError("");
                    }}
                  />
                </div>
              </div>
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">
                  Payment date
                </div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="date"
                    placeholder="Enter payment date as MM-dd-YYYY"
                    className={`${paymentDateError === "" ? "border-secondary-blue bg-white" : "border-white bg-red-2 text-white dark:text-white"} w-full h-full rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg`}
                    value={paymentDate}
                    onChange={(e) => {
                      setPaymentDate(e.target.value);
                      setPaymentDateError("");
                    }}
                  />
                </div>
              </div>
            </div>
            {/**Second column */}
            <div className="w-1/2 h-full p-3">
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">Password</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="password"
                    placeholder="Enter password"
                    className={`${passwordError === "" ? "border-secondary-blue bg-white" : "border-white bg-red-2 text-white dark:text-white"} w-full h-full rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                  />
                </div>
              </div>
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">Address</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter address"
                    className={`${addressError === "" ? "border-secondary-blue bg-white" : "border-white bg-red-2 text-white dark:text-white"} w-full h-full rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg`}
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setAddressError("");
                    }}
                  />
                </div>
              </div>
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">Province</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter province"
                    className={`${provinceError === "" ? "border-secondary-blue bg-white" : "border-white bg-red-2 text-white dark:text-white"} w-full h-full rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg`}
                    value={province}
                    onChange={(e) => {
                      setProvince(e.target.value);
                      setProvinceError("");
                    }}
                  />
                </div>
              </div>
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">Email</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter email"
                    className={`${emailError === "" ? "border-secondary-blue bg-white" : "border-white bg-red-2 text-white dark:text-white"} w-full h-full rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                  />
                </div>
              </div>
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">Amount</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter amount"
                    className={`${amountError === "" ? "border-secondary-blue bg-white" : "border-white bg-red-2 text-white dark:text-white"} w-full h-full rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg`}
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setAmountError("");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="h-1/5 w-full flex">
            <div className="h-full w-3/5 p-2"></div>
            <div className="h-full w-2/5 p-5 flex items-center justify-center">
              <button
                className="bg-secondary-blue hover:opacity-90 dark:bg-dark-ternary h-full w-full rounded-md text-xl shadow-xl text-white"
                onClick={writeToDatabase}
              >
                Add Lab
              </button>
            </div>
          </div>
        </div>
      </div>
      {/**Success notification modal */}
      {showAddedSuccessModal ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-white">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="p-5 rounded-lg shadow-lg relative flex flex-col w-full bg-green border-2 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-2 rounded-t">
                  <h3 className="text-sm">Notification</h3>
                  <button
                    className="ml-auto bg-red rounded-sm border-0 text-lg font-semibold drop-shadow-md active:bg-white"
                    onClick={() => setShowAddedSuccessModal(false)}
                  >
                    <span className=" drop-shadow-lg shadow-black h-6 w-6 text-white flex items-center justify-center active:text-dark-ternary">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-col">
                  <h3 className="text-2xl font-semibold">
                    Lab Added Successfully ! 😎
                  </h3>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="rounded-lg opacity-50 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}

      {/**Unsuccess notification modal */}
      {showAddedUnsuccessModal ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-white">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="p-5 rounded-lg shadow-lg relative flex flex-col w-full bg-red border-2 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-2 rounded-t">
                  <h3 className="text-sm">Notification</h3>
                  <button
                    className="ml-auto bg-red-1 rounded-sm border-0 text-lg font-semibold drop-shadow-md active:bg-white"
                    onClick={() => setShowAddedUnsuccessModal(false)}
                  >
                    <span className=" drop-shadow-lg shadow-black h-6 w-6 text-white flex items-center justify-center active:text-dark-ternary">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-col">
                  <h3 className="text-center text-2xl font-semibold">
                    Lab Added Unsuccessfully ! 😢
                  </h3>
                  {userNameError && (
                    <p className="h-1/6 pt-1 text-xs text-center text-white">
                      - {userNameError} -
                    </p>
                  )}
                  {labNameError && (
                    <p className="h-1/6 pt-1 text-xs text-center text-white">
                      - {labNameError} -
                    </p>
                  )}
                  {districtError && (
                    <p className="h-1/6 pt-1 text-xs text-center text-white">
                      - {districtError} -
                    </p>
                  )}
                  {telephoneError && (
                    <p className="h-1/6 pt-1 text-xs text-center text-white">
                      - {telephoneError} -
                    </p>
                  )}
                  {paymentDateError && (
                    <p className="h-1/6 pt-1 text-xs text-center text-white">
                      - {paymentDateError} -
                    </p>
                  )}
                  {passwordError && (
                    <p className="h-1/6 pt-1 text-xs text-center text-white">
                      - {passwordError} -
                    </p>
                  )}
                  {addressError && (
                    <p className="h-1/6 pt-1 text-xs text-center text-white">
                      - {addressError} -
                    </p>
                  )}
                  {provinceError && (
                    <p className="h-1/6 pt-1 text-xs text-center text-white">
                      - {provinceError} -
                    </p>
                  )}
                  {emailError && (
                    <p className="h-1/6 pt-1 text-xs text-center text-white">
                      - {emailError} -
                    </p>
                  )}
                  {amountError && (
                    <p className="h-1/6 pt-1 text-xs text-center text-white">
                      - {amountError} -
                    </p>
                  )}
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="rounded-lg opacity-50 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </div>
  );
}

export default AddNewLab;
