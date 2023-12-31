import { React, useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { auth, db, logout, storage } from "../../firebase";
import { set, ref, onValue } from "firebase/database";
import { ref as ref1, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function AddNewLab() {
  const provinces = [
    "Western",
    "Central",
    "Southern",
    "Northern",
    "Eastern",
    "North_Western",
    "North_Central",
    "Uva",
    "Sabaragamuwa",
  ];

  const provinceToDistricts = {
    Western: ["Colombo", "Gampaha", "Kalutara"],
    Central: ["Kandy", "Nuwara-Eliya", "Matale"],
    Southern: ["Galle", "Matara", "Hambanthota"],
    Northern: ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya"],
    Eastern: ["Trincomalee", "Batticaloa", "Ampara"],
    North_Western: ["Kurunegala", "Puttalam"],
    North_Central: ["Anuradhapura", "Polonnaruwa"],
    Uva: ["Badulla", "Monaragala"],
    Sabaragamuwa: ["Ratnapura", "Kegalle"],
  };

  const [showAddedSuccessModal, setShowAddedSuccessModal] = useState(false);
  const [showAddedUnsuccessModal, setShowAddedUnsuccessModal] = useState(false);
  //variable state
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [LabName, setLabName] = useState("");
  const [district, setDistrict] = useState("Colombo");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [province, setProvince] = useState("Western");
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilePath, setSelectedFilePath] = useState(null);

  //error states
  const [userNameError, setUserNameError] = useState("");
  const [labNameError, setLabNameError] = useState("");
  const [districtError, setDistrictError] = useState("");
  const [telephoneError, setTelephoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [provinceError, setProvinceError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [proPicError, setProPicError] = useState("");
  const [authError, setAuthError] = useState("");
  const [proPicUploadError, setProPicUploadError] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const adminRef = ref(db, `admins/${user.uid}`);
      const unsubscribe = onValue(adminRef, (snapshot) => {
        if (snapshot.exists()) {
          const adminData = snapshot.val();
          const adminUsername = adminData.name; // Assuming "name" is the field containing the admin username
          setUserName(adminUsername);
        }
      });

      // Unsubscribe from the onValue listener when the component unmounts
      return () => {
        unsubscribe();
      };
    }
  }, []);

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

    if (authError) {
      isValid = false;
    }

    if (proPicError) {
      isValid = false;
    }

    if (proPicUploadError) {
      isValid = false;
    }

    if (!selectedFile) {
      setProPicError("Please select an image");
      isValid = false;
    } else if (!selectedFile.type.startsWith("image/")) {
      setProPicError("Please select a valid image file");
      isValid = false;
    } else if (selectedFile.size > 5 * 1024 * 1024) {
      setProPicError("File size exceeds the maximum limit of 5MB");
      isValid = false;
    }

    if (!isValid) {
      setShowAddedUnsuccessModal(true);
      return; //not proceed if there are validation errors
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hashedPassword) => {
          if (err) {
            console.error("Error hashing password:", err);
            return;
          }

          // create a user
          createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
              //writting data to the firebase
              const uid = auth.currentUser.uid;

              try {
                setLoading(true); // Set loading state to true
                // Upload profile picture to Firebase Storage
                const storageRef = ref1(storage, "profilePictures/" + uid);
                uploadBytes(storageRef, selectedFile)
                  .then(async () => {
                    // Retrieve the download URL after the upload is complete
                    const downloadURL = await getDownloadURL(storageRef);
                    setProfilePicture(downloadURL);

                    set(ref(db, `labs/${uid}`), {
                      uid,
                      userName,
                      LabName,
                      district,
                      telephone,
                      password: hashedPassword, //store the hashed password
                      address,
                      province,
                      email,
                      type: "lab",
                      blocked: false,
                      profilePicture: downloadURL,
                    });
                    setLoading(false);
                    setShowAddedSuccessModal(true);
                    // Delay the logout function call for 3 seconds
                    setTimeout(() => {
                      logout();
                    }, 3000); // 3000 milliseconds = 3 seconds
                  })
                  .catch((error) => {
                    setLoading(false);
                    setProPicUploadError(
                      "Error occured when uploading Profile picture, Try again!"
                    );
                    setShowAddedUnsuccessModal(true);
                    console.log("Error uploading Propic", error);
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              } catch (error) {
                setShowAddedUnsuccessModal(true);
                console.log("Error adding user", error);
              }
            })
            .catch((error) => {
              // Handle the error based on the error code.
              if (error.code === "auth/email-already-in-use") {
                setEmailError("Email is already in use.");
              } else {
                setAuthError("Authentication Error! Please try again.");
              }
              setShowAddedUnsuccessModal(true);
              console.error("Error creating the user:", error);
            });
        });
      });
    }
  };

  //handle input image file
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      setSelectedFilePath(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setSelectedFilePath(null);
    }
  };

  return (
    <div className="flex flex-col w-full h-full ">
      <div className="h-full w-full flex items-center justify-center">
        <div className="border-2 border-secondary-blue bg-primary-blue dark:bg-dark-primary dark:border-dark-ternary h-5/6 w-11/12 rounded-3xl flex flex-col">
          <div className="h-3/5 w-full p-2 flex text-white">
            {/**first column */}
            <div className="w-1/2 h-full p-3">
              <div className="h-1/4 w-full flex">
                <div className="h-full w-2/6 flex items-center">User name</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter user name"
                    className={`${
                      userNameError === ""
                        ? "bg-ternary-blue bg-opacity-30 border-white dark:border-gray2 dark:bg-dark-ternary"
                        : "border-white bg-red-2 text-white"
                    } w-full h-full rounded-full text-white dark:text-gray1 border-secondary-blue border-2 pl-3 font-semibold placeholder:text-white placeholder:font-light dark:placeholder:text-gray1`}
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      setUserNameError(""); // Clear error when the user types
                    }}
                  />
                </div>
              </div>
              <div className="h-1/4 w-full flex">
                <div className="h-full w-2/6 flex items-center">Lab name</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter Lab name"
                    className={`${
                      labNameError === ""
                        ? "bg-ternary-blue bg-opacity-30 border-white dark:border-gray2 dark:bg-dark-ternary"
                        : "border-white bg-red-2 text-white"
                    } w-full h-full rounded-full text-white dark:text-gray1 border-secondary-blue border-2 pl-3 font-semibold placeholder:text-white placeholder:font-light dark:placeholder:text-gray1`}
                    value={LabName}
                    onChange={(e) => {
                      setLabName(e.target.value);
                      setLabNameError("");
                    }}
                  />
                </div>
              </div>
              <div className="h-1/4 w-full flex">
                <div className="h-full w-2/6 flex items-center">District</div>
                <div className="h-full w-4/6 p-2">
                  <select
                    className={`${
                      districtError === ""
                        ? "bg-ternary-blue bg-opacity-30 border-white dark:border-gray2 dark:bg-dark-ternary"
                        : "border-white bg-red-2 text-white"
                    } w-full h-full rounded-full text-white dark:text-gray1 border-secondary-blue border-2 pl-3 font-semibold placeholder:text-white placeholder:font-light dark:placeholder:text-gray1`}
                    value={district}
                    onChange={(e) => {
                      setDistrict(e.target.value);
                      setDistrictError("");
                    }}
                  >
                    {provinceToDistricts[province].map((district) => (
                      <option
                        className="text-primary-blue dark:text-gray1"
                        key={district}
                        value={district}
                      >
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="h-1/4 w-full flex">
                <div className="h-full w-2/6 flex items-center">Telephone</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter telephone number"
                    className={`${
                      telephoneError === ""
                        ? "bg-ternary-blue bg-opacity-30 border-white dark:border-gray2 dark:bg-dark-ternary"
                        : "border-white bg-red-2 text-white"
                    } w-full h-full rounded-full text-white dark:text-gray1 border-secondary-blue border-2 pl-3 font-semibold placeholder:text-white placeholder:font-light dark:placeholder:text-gray1`}
                    value={telephone}
                    onChange={(e) => {
                      setTelephone(e.target.value);
                      setTelephoneError("");
                    }}
                  />
                </div>
              </div>
            </div>
            {/**Second column */}
            <div className="w-1/2 h-full p-3">
              <div className="h-1/4 w-full flex">
                <div className="h-full w-2/6 flex items-center">Password</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="password"
                    placeholder="Enter password"
                    className={`${
                      passwordError === ""
                        ? "bg-ternary-blue bg-opacity-30 border-white dark:border-gray2 dark:bg-dark-ternary"
                        : "border-white bg-red-2 text-white"
                    } w-full h-full rounded-full text-white dark:text-gray1 border-secondary-blue border-2 pl-3 font-semibold placeholder:text-white placeholder:font-light dark:placeholder:text-gray1`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                  />
                </div>
              </div>
              <div className="h-1/4 w-full flex">
                <div className="h-full w-2/6 flex items-center">Address</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter address"
                    className={`${
                      addressError === ""
                        ? "bg-ternary-blue bg-opacity-30 border-white dark:border-gray2 dark:bg-dark-ternary"
                        : "border-white bg-red-2 text-white"
                    } w-full h-full rounded-full text-white dark:text-gray1 border-secondary-blue border-2 pl-3 font-semibold placeholder:text-white placeholder:font-light dark:placeholder:text-gray1`}
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setAddressError("");
                    }}
                  />
                </div>
              </div>
              <div className="h-1/4 w-full flex">
                <div className="h-full w-2/6 flex items-center">Province</div>
                <div className="h-full w-4/6 p-2">
                  <select
                    className={`${
                      provinceError === ""
                        ? "bg-ternary-blue bg-opacity-30 border-white dark:border-gray2 dark:bg-dark-ternary"
                        : "border-white bg-red-2 text-white"
                    } w-full h-full rounded-full text-white dark:text-gray1 border-secondary-blue border-2 pl-3 font-semibold`}
                    value={province}
                    onChange={(e) => {
                      setProvince(e.target.value);
                      setDistrict(provinceToDistricts[e.target.value][0]);
                      setProvinceError("");
                    }}
                  >
                    {provinces.map((p) => (
                      <option
                        className="text-primary-blue dark:text-gray1"
                        key={p}
                        value={p}
                      >
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="h-1/4 w-full flex">
                <div className="h-full w-2/6 flex items-center">Email</div>
                <div className="h-full w-4/6 p-2">
                  <input
                    type="text"
                    placeholder="Enter email"
                    className={`${
                      emailError === ""
                        ? "bg-ternary-blue bg-opacity-30 border-white dark:border-gray2 dark:bg-dark-ternary"
                        : "border-white bg-red-2 text-white"
                    } w-full h-full rounded-full text-white dark:text-gray1 border-secondary-blue border-2 pl-3 font-semibold placeholder:text-white placeholder:font-light dark:placeholder:text-gray1`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center h-1/5 w-full">
            <label className="relative cursor-pointer bg-ternary-blue text-primary-blue text-md font-lg font-inter py-3 px-5 rounded-full shadow-md hover:bg-white hover:shadow-xl dark:bg-dark-secondary dark:border-2 dark:border-dark-ternary dark:text-ternary-blue">
              <span>
                {selectedFile ? (
                  <div className="flex h-full w-full">
                    <div className="flex items-center justify-center">
                      <img
                        src={selectedFilePath}
                        alt="Selected"
                        className="w-10 h-10 rounded-full shadow-sm shadow-dark-primary"
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <span>
                        &nbsp;&nbsp;&nbsp;Change Profile
                        Picture&nbsp;&nbsp;&nbsp;
                        <FontAwesomeIcon icon={faCaretDown} />
                      </span>
                    </div>
                  </div>
                ) : (
                  <span>
                    Select Profile Picture&nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                )}
              </span>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </label>
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
                  {proPicError && (
                    <p className="h-1/6 pt-1 text-xs text-center text-white">
                      - {proPicError} -
                    </p>
                  )}
                  {authError && (
                    <p className="h-1/6 pt-1 text-xs text-center text-white">
                      - {authError} -
                    </p>
                  )}
                  {proPicUploadError && (
                    <p className="h-1/6 pt-1 text-xs text-center text-white">
                      - {proPicUploadError} -
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

      {loading ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-primary-blue dark:text-white">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary-blue dark:border-white"></div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default AddNewLab;
