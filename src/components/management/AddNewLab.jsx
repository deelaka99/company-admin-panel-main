import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { uid } from "uid";
import { set, ref } from "firebase/database";

function AddNewLab() {
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
    } else {
      setTelephoneError("");
    }

    if (!paymentDate) {
      setPaymentDateError("Payment date is required");
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
    }

    if (!amount) {
      setAmountError("Amount is required");
      isValid = false;
    }

    if (!isValid) {
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
                    className="w-full h-5/6 rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      setUserNameError(""); // Clear error when the user types
                    }}
                  />
                  {userNameError && (
                    <p className="h-1/6 pt-1 text-xs text-center text-red">
                      {userNameError}
                    </p>
                  )}
                </div>
              </div>
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">Lab name</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter Lab name"
                    className="w-full h-5/6 rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg"
                    value={LabName}
                    onChange={(e) => {
                      setLabName(e.target.value);
                      setLabNameError("");
                    }}
                  />
                  {labNameError && (
                    <p className="h-1/6 pt-1 text-xs text-center text-red">
                      {labNameError}
                    </p>
                  )}
                </div>
              </div>
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">District</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter district"
                    className="w-full h-5/6 rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg"
                    value={district}
                    onChange={(e) => {
                      setDistrict(e.target.value);
                      setDistrictError("");
                    }}
                  />
                  {districtError && (
                    <p className="h-1/6 pt-1 text-xs text-center text-red">
                      {districtError}
                    </p>
                  )}
                </div>
              </div>
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">Telephone</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter telephone number"
                    className="w-full h-5/6 rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg"
                    value={telephone}
                    onChange={(e) => {
                      setTelephone(e.target.value);
                      setTelephoneError("");
                    }}
                  />
                  {telephoneError && (
                    <p className="h-1/6 text-xs text-center text-red">
                      {telephoneError}
                    </p>
                  )}
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
                    className="w-full h-5/6 rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg"
                    value={paymentDate}
                    onChange={(e) => {
                      setPaymentDate(e.target.value);
                      setPaymentDateError("");
                    }}
                  />
                  {paymentDateError && (
                    <p className="h-1/6 text-xs text-center text-red">
                      {paymentDateError}
                    </p>
                  )}
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
                    className="w-full h-5/6 rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      const hasUppercase = /[A-Z]/.test(value);
                      const hasLowercase = /[a-z]/.test(value);
                      const hasNumber = /\d/.test(value);
                      const hasSpecialChar =
                        /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-="']/.test(value);
                      const isLengthValid = value.length >= 8; // minimum 8 characters
                      
                      if (
                        !hasUppercase ||
                        !hasLowercase ||
                        !hasNumber ||
                        !hasSpecialChar ||
                        !isLengthValid
                      ) {
                        setPasswordError(
                          "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long."
                        );
                      } else {
                        setPasswordError("");
                      }
                    }}
                  />
                  {passwordError && (
                    <p className="h-1/6 text-xs text-center text-red">
                      {passwordError}
                    </p>
                  )}
                </div>
              </div>
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">Address</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter address"
                    className="w-full h-5/6 rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setAddressError("");
                    }}
                  />
                  {addressError && (
                    <p className="h-1/6 text-xs text-center text-red">
                      {addressError}
                    </p>
                  )}
                </div>
              </div>
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">Province</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter province"
                    className="w-full h-5/6 rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg"
                    value={province}
                    onChange={(e) => {
                      setProvince(e.target.value);
                      setProvinceError("");
                    }}
                  />
                  {provinceError && (
                    <p className="h-1/6 text-xs text-center text-red">
                      {provinceError}
                    </p>
                  )}
                </div>
              </div>
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">Email</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter email"
                    className="w-full h-5/6 rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      const emailPattern =
                        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

                      if (!emailPattern.test(value)) {
                        setEmailError(
                          "Invalid email format. Please enter a valid email address."
                        );
                      } else {
                        setEmailError("");
                      }
                    }}
                  />
                  {emailError && (
                    <p className="h-1/6 text-xs text-center text-red">
                      {emailError}
                    </p>
                  )}
                </div>
              </div>
              <div className="h-1/5 w-full flex">
                <div className="h-full w-2/6 flex items-center">Amount</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter amount"
                    className="w-full h-5/6 rounded-full text-primary-blue dark:text-black border-secondary-blue border-2 p-3 font-medium text-lg"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      // Validate amount (for example, non-negative numbers with up to 2 decimal places)
                      const amountPattern = /^\d+(\.\d{1,2})?$/;

                      if (!amountPattern.test(value)) {
                        setAmountError(
                          "Invalid amount format. Please enter a valid amount."
                        );
                      } else {
                        setAmountError("");
                      }
                    }}
                  />
                  {amountError && (
                    <p className="h-1/6 text-xs text-center text-red">
                      {amountError}
                    </p>
                  )}
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
    </div>
  );
}

export default AddNewLab;
