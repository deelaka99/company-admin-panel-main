import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { auth, db, storage } from "../../firebase";
import { ref as ref1, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateEmail } from "firebase/auth";
import { set, ref, onValue } from "firebase/database";
import NotificationModal from "../../components/Modal/NotificationModal";

const Profile = () => {
  const [showEditAdminModal, setShowEditAdminModal] = useState(false);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [showAdminAddedErrorModal, setShowAdminAddedErrorModal] =
    useState(false);
  const [showAdminAddedErrorModal1, setShowAdminAddedErrorModal1] =
    useState(false);
  const [showEditAdminSuccessModal, setShowEditAdminSuccessModal] =
    useState(false);
  const [showEditAdminUnsuccessModal, setShowEditAdminUnsuccessModal] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
  const [adminData, setAdminData] = useState({
    uid: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    type: "company",
  });
  const [currentAdminData, setCurrentAdminData] = useState({
    uid: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    type:"",
    profilePicture: "",
  });

  const [updatedAdminData, setUpdatedAdminData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    // Fetch admin data from Realtime Database
    const user = auth.currentUser;
    if (user) {
      const adminRef = ref(db, `admins/${user.uid}`);
      onValue(adminRef, (snapshot) => {
        if (snapshot.exists()) {
          const adminDetails = snapshot.val();
          setCurrentAdminData(adminDetails);
        }
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedProfilePicture(file);
  };

  const handleAddAdmin = async () => {
    try {
      setLoading(true); // Set loading state to true
      // Create user in Firebase Authentication
      const { email, password, phone, address, name, type } = adminData;
      await createUserWithEmailAndPassword(auth, email, password);

      // Get the newly created user's UID
      const user = auth.currentUser;

      // Upload profile picture to Firebase Storage
      const storageRef = ref1(storage, "profilePictures/" + user.uid);
      await uploadBytes(storageRef, selectedProfilePicture);

      // Retrieve the download URL using a new reference
      const downloadURLRef = ref1(storage, "profilePictures/" + user.uid);
      const downloadURL = await getDownloadURL(downloadURLRef);

      // Update admin details to include profile picture URL
      const adminDetails = { ...adminData };
      adminDetails.profilePicture = downloadURL;

      // Store admin details in the Realtime Database
      await set(ref(db, `admins/${user.uid}`), {
        uid: user.uid,
        name,
        email,
        phone,
        address,
        profilePicture: adminDetails.profilePicture,
        type,
      });
      window.location.reload();
    } catch (error) {
      // Handle error
      if (error.code === "auth/email-already-in-use") {
        console.error("Email is already in use:", error.message);
        setShowAddAdminModal(false);
        setShowAdminAddedErrorModal(true);
      } else {
        console.error("Error adding admin:", error);
        setShowAdminAddedErrorModal1(true);
      }
    }finally{
      setLoading(false); // Set loading state to false
    }
  };

  const handleUpdateAdmin = async () => {
    try {
      setLoading(true); // Set loading state to true
      const user = auth.currentUser;

      // Update profile picture if selected
      if (selectedProfilePicture) {
        const storageRef = ref1(storage, "profilePictures/" + user.uid);
        await uploadBytes(storageRef, selectedProfilePicture);
        const downloadURL = await getDownloadURL(storageRef);
        updatedAdminData.profilePicture = downloadURL;
      }

      // Update admin email in Firebase Authentication
      if (user) {
        await updateEmail(user, updatedAdminData.email);
      }

      // Update admin details in the Realtime Database
      await set(ref(db, `admins/${user.uid}`), updatedAdminData);

      // Close the modal after updating admin
      setShowEditAdminModal(false);
      setShowEditAdminSuccessModal(true);
    } catch (error) {
      console.error("Error updating admin:", error);
      setShowEditAdminUnsuccessModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full h-full flex flex-col items-center justify-center dark:text-white">
      <div className="h-2/6 w-full flex items-center justify-center">
        <div className="h-5/6 w-11/12 bg-primary-blue  border-2 border-secondary-blue rounded-lg flex dark:bg-dark-primary dark:border-dark-ternary">
          <div className="w-3/12 h-full flex items-center justify-center">
            <div className="w-36 h-36 rounded-full bg-primary-blue overflow-hidden flex items-center justify-center border-4 border-white">
              <img className="" src={currentAdminData.profilePicture} alt="" />
            </div>
          </div>
          <div className="w-8/12 h-full  flex items-center justify-center pl-8 text-white">
            <div className="w-full h-1/4 flex flex-col">
              <div className="h-full flex">
                <h1 className="text-4xl font-inter font-medium pr-5">
                  {currentAdminData.name}
                </h1>
                <button onClick={() => setShowEditAdminModal(true)}>
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
              <button
                className="rounded-full bg-ternary-blue text-primary-blue dark:bg-dark-ternary dark:text-white p-4 shadow-black shadow-sm hover:shadow-lg hover:shadow-black "
                onClick={() => setShowAddAdminModal(true)}
              >
                <FontAwesomeIcon icon={faUserPlus} />
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
              <h1 className="pt-5">{currentAdminData.email}</h1>
              <h1 className="pt-5">{currentAdminData.phone}</h1>
              <h1 className="pt-5">{currentAdminData.address}</h1>
            </div>
          </div>
        </div>
      </div>
      {/**Add admin modal */}
      {showAddAdminModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-primary-blue dark:text-white">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="p-5 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-ternary-blue dark:bg-dark-secondary dark:border-2 dark:border-dark-ternary outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-2 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Admin User</h3>
                  <button
                    className="p-1 ml-auto  border-0 text-primary-blue text-3xl font-semibold active:text-black"
                    onClick={() => setShowAddAdminModal(false)}
                  >
                    <span className=" text-primary-blue drop-shadow-lg shadow-black h-6 w-6 text-4xl block dark:text-white flex items-center justify-center">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-3 flex flex-col">
                  <form>
                    <div className="h-1/6 w-full flex flex-col">
                      <div className="">
                        <p className="font-semibold">Name :</p>
                      </div>
                      <div className="pt-2 pb-2">
                        <input
                          type="text"
                          placeholder="Enter name"
                          name="name"
                          value={adminData.name}
                          onChange={handleInputChange}
                          className="rounded-full p-2 w-full bg-white border-primary-blue border-2 text-center font-semibold dark:border-dark-ternary dark:bg-dark-ternary active:bg-secondary-blue dark:active:bg-dark-secondary"
                        />
                      </div>
                    </div>
                    <div className="h-1/6 w-full flex flex-col">
                      <div>
                        <p className="font-semibold">Email :</p>
                      </div>
                      <div className="pt-2 pb-2">
                        <input
                          type="text"
                          placeholder="Enter email"
                          name="email"
                          value={adminData.email}
                          onChange={handleInputChange}
                          className="rounded-full p-2 w-full bg-white border-primary-blue border-2 text-center font-semibold dark:border-dark-ternary dark:bg-dark-ternary active:bg-secondary-blue dark:active:bg-dark-secondary"
                        />
                      </div>
                    </div>
                    <div className="h-1/6 w-full flex flex-col">
                      <div>
                        <p className="font-semibold">Phone :</p>
                      </div>
                      <div className="pt-2 pb-2">
                        <input
                          type="text"
                          placeholder="Enter phone"
                          name="phone"
                          value={adminData.phone}
                          onChange={handleInputChange}
                          className="rounded-full p-2 w-full bg-white border-primary-blue border-2 text-center font-semibold dark:border-dark-ternary dark:bg-dark-ternary active:bg-secondary-blue dark:active:bg-dark-secondary"
                        />
                      </div>
                    </div>
                    <div className="h-1/6 w-full flex flex-col">
                      <div>
                        <p className="font-semibold">Address :</p>
                      </div>
                      <div className="pt-2 pb-2">
                        <input
                          type="text"
                          placeholder="Enter address"
                          name="address"
                          value={adminData.address}
                          onChange={handleInputChange}
                          className="rounded-full p-2 w-full bg-white border-primary-blue border-2 text-center font-semibold dark:border-dark-ternary dark:bg-dark-ternary active:bg-secondary-blue dark:active:bg-dark-secondary"
                        />
                      </div>
                    </div>
                    <div className="h-1/6 w-full flex flex-col">
                      <div>
                        <p className="font-semibold">Password :</p>
                      </div>
                      <div className="pt-2 pb-2">
                        <input
                          type="password"
                          placeholder="Enter password"
                          name="password"
                          value={adminData.password}
                          onChange={handleInputChange}
                          className="rounded-full p-2 w-full bg-white border-primary-blue border-2 text-center font-semibold dark:border-dark-ternary dark:bg-dark-ternary active:bg-secondary-blue dark:active:bg-dark-secondary"
                        />
                      </div>
                    </div>
                    <div className="h-1/6 w-full flex flex-col">
                      <div>
                        <p className="font-semibold">Profile picture :</p>
                      </div>
                      <div className="pt-2 pb-2">
                        <input type="file" onChange={handleFileChange} />
                      </div>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-1 rounded-b">
                  <button
                    className="bg-primary-blue text-white active:bg-black font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 dark:bg-dark-primary"
                    type="button"
                    onClick={handleAddAdmin}
                  >
                    Add Admin
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {/**edit admin modal */}
      {showEditAdminModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-primary-blue dark:text-white">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="p-5 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-ternary-blue dark:bg-dark-secondary dark:border-2 dark:border-dark-ternary outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-2 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit Profile</h3>
                  <button
                    className="p-1 ml-auto  border-0 text-primary-blue text-3xl font-semibold active:text-black"
                    onClick={() => setShowEditAdminModal(false)}
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
                        <p className="font-semibold">Name :</p>
                      </div>
                      <div className="pt-2 pb-2">
                        <input
                          type="text"
                          placeholder="Existing name"
                          value={updatedAdminData.name}
                          onChange={(e) =>
                            setUpdatedAdminData((prevData) => ({
                              ...prevData,
                              name: e.target.value,
                            }))
                          }
                          className="rounded-full p-2 w-full bg-white border-primary-blue border-2 text-center font-semibold dark:border-dark-ternary dark:bg-dark-ternary active:bg-secondary-blue dark:active:bg-dark-secondary"
                        />
                      </div>
                    </div>
                    <div className="h-1/5 w-full flex flex-col">
                      <div>
                        <p className="font-semibold">Email :</p>
                      </div>
                      <div className="pt-2 pb-2">
                        <input
                          type="text"
                          placeholder="Existing email"
                          value={updatedAdminData.email}
                          onChange={(e) =>
                            setUpdatedAdminData((prevData) => ({
                              ...prevData,
                              email: e.target.value,
                            }))
                          }
                          className="rounded-full p-2 w-full bg-white border-primary-blue border-2 text-center font-semibold dark:border-dark-ternary dark:bg-dark-ternary active:bg-secondary-blue dark:active:bg-dark-secondary"
                        />
                      </div>
                    </div>
                    <div className="h-1/5 w-full flex flex-col">
                      <div>
                        <p className="font-semibold">Phone :</p>
                      </div>
                      <div className="pt-2 pb-2">
                        <input
                          type="text"
                          placeholder="Existing phone"
                          value={updatedAdminData.phone}
                          onChange={(e) =>
                            setUpdatedAdminData((prevData) => ({
                              ...prevData,
                              phone: e.target.value,
                            }))
                          }
                          className="rounded-full p-2 w-full bg-white border-primary-blue border-2 text-center font-semibold dark:border-dark-ternary dark:bg-dark-ternary active:bg-secondary-blue dark:active:bg-dark-secondary"
                        />
                      </div>
                    </div>
                    <div className="h-1/5 w-full flex flex-col">
                      <div>
                        <p className="font-semibold">Address :</p>
                      </div>
                      <div className="pt-2 pb-2">
                        <input
                          type="text"
                          placeholder="Existing address"
                          value={updatedAdminData.address}
                          onChange={(e) =>
                            setUpdatedAdminData((prevData) => ({
                              ...prevData,
                              address: e.target.value,
                            }))
                          }
                          className="rounded-full p-2 w-full bg-white border-primary-blue border-2 text-center font-semibold dark:border-dark-ternary dark:bg-dark-ternary active:bg-secondary-blue dark:active:bg-dark-secondary"
                        />
                      </div>
                    </div>
                    <div className="h-1/5 w-full flex flex-col">
                      <div>
                        <p className="font-semibold">Profile picture :</p>
                      </div>
                      <div className="pt-2 pb-2">
                        <input type="file" onChange={handleFileChange} />
                      </div>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-1 rounded-b">
                  <button
                    className="bg-primary-blue text-white active:bg-black font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 dark:bg-dark-primary"
                    type="button"
                    onClick={handleUpdateAdmin}
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {/**Email already in use modal */}
      {showAdminAddedErrorModal ? (
        <NotificationModal
          show={showAdminAddedErrorModal}
          onClose={() => {
            setShowAdminAddedErrorModal(false);
          }}
          title="Notification"
          body=" 😥Email is already in use!"
          color="red"
        />
      ) : null}
      {/**Email already in use modal */}
      {showAdminAddedErrorModal1 ? (
        <NotificationModal
          show={showAdminAddedErrorModal1}
          onClose={() => {
            setShowAdminAddedErrorModal1(false);
          }}
          title="Notification"
          body=" 😥User adding Error occured!"
          color="red"
        />
      ) : null}
      {/**Edit Admin Success */}
      {showEditAdminSuccessModal ? (
        <NotificationModal
          show={showEditAdminSuccessModal}
          onClose={() => {
            setShowEditAdminSuccessModal(false);
          }}
          title="Notification"
          body=" Admin Update Success! 🤗"
          color="green"
        />
      ) : null}
      {/**Edit Admin unsuccess */}
      {showEditAdminUnsuccessModal ? (
        <NotificationModal
          show={showEditAdminUnsuccessModal}
          onClose={() => {
            setShowEditAdminUnsuccessModal(false);
          }}
          title="Notification"
          body=" Admin Update Unsuccess! 😥"
          color="red"
        />
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
};

export default Profile;
