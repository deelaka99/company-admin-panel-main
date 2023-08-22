import { React, useState, useEffect } from "react";
import { db } from "../../firebase";
import { ref, onValue, update } from "firebase/database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

function Manage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [labsData, setLabsData] = useState([]); // State to store retrieved data
  // const [editLabData, setEditLabData] = useState({}); // State to store lab data for editing

  const [selectedLab, setSelectedLab] = useState({
    LabName: "",
    address: "",
    telephone: "",
    email: "",
  });

  // useEffect hook to fetch data from Firebase
  useEffect(() => {
    const labsRef = ref(db, "labs");
    onValue(labsRef, (snapshot) => {
      const labsData = [];
      snapshot.forEach((childSnapshot) => {
        const lab = childSnapshot.val();
        labsData.push(lab);
      });
      setLabsData(labsData);
    });
  }, []);

  // Function to update lab data in Firebase
  // const updateLabData = async () => {
  //   try {
  //     const labRef = ref(db, `labs/${editLabData.uuid}`); // Assuming "uuid" is the unique identifier
  //     await update(labRef, {
  //       LabName: editLabData.LabName,
  //       address: editLabData.address,
  //       telephone: editLabData.telephone,
  //       email: editLabData.email
  //     });
  //     setShowEditModal(false);
  //   } catch (error) {
  //     //handle error
  //     console.error("Error updating lab data:", error);
  //   }
  // };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="h-full w-full flex items-center justify-center">
        <div className="h-5/6 w-11/12 overflow-hidden">
          <div className="relative w-full h-full overflow-y-auto overflow-x-auto  shadow-md rounded-lg">
            <table className="w-full text-sm text-center  text-primary-blue dark:text-white">
              <thead className="text-xs text-white  uppercase bg-secondary-blue dark:bg-black dark:text-dark-ternary">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Lab Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Telephone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Statues
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-ternary-blue dark:bg-dark-ternary overflow-y-auto">
                {labsData.map((lab, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4">{lab.LabName}</td>
                    <td className="px-6 py-4">{lab.address}</td>
                    <td className="px-6 py-4">{lab.telephone}</td>
                    <td className="px-6 py-4">{lab.email}</td>
                    <td className="px-6 py-4">Active</td>
                    <td className="px-6 py-4 space-x-2 flex">
                      <button
                        className="bg-blue text-white p-1 rounded shadow-lg hover:opacity-80"
                        onClick={() => {
                          setSelectedLab(lab);
                          setShowEditModal(true);
                          setEditLabData({ ...lab }); 
                        }}
                      >
                        Edit
                      </button>
                      <button className="bg-yellow text-black p-1 rounded shadow-lg hover:opacity-80">
                        Block
                      </button>
                      <button className="bg-red text-white p-1 rounded shadow-lg hover:opacity-80">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/**Edit lab modal */}
      {showEditModal ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-primary-blue dark:text-white">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="p-2 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-ternary-blue dark:bg-dark-secondary dark:border-2 dark:border-dark-ternary outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-1 rounded-t">
                  <h3 className="text-xl font-semibold">Edit Lab</h3>
                  <button
                    className=" ml-auto  border-0 text-primary-blue font-semibold active:text-black"
                    onClick={() => setShowEditModal(false)}
                  >
                    <span className=" text-primary-blue drop-shadow-lg shadow-black h-6 w-6 text-3xl block dark:text-white flex items-center justify-center">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-2 flex flex-col">
                  <form>
                    <div className="h-1/5 w-full flex flex-col">
                      <div className="">
                        <p className="font-semibold">Lab Name :</p>
                      </div>
                      <div className="pt-2 pb-2">
                        <input
                          type="text"
                          placeholder="Enter new Lab name"
                          className="rounded-full p-2 h-3/5 w-full bg-white border-primary-blue border-2 text-center font-semibold dark:border-dark-ternary dark:bg-dark-ternary active:bg-secondary-blue dark:active:bg-dark-secondary"
                          value={selectedLab.LabName}
                          onChange={(e) =>
                            setSelectedLab({
                              ...selectedLab,
                              LabName: e.target.value,
                            })
                          }
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
                          placeholder="Enter new Address"
                          className="rounded-full p-2 h-3/5 w-full bg-white border-primary-blue border-2 text-center font-semibold dark:border-dark-ternary dark:bg-dark-ternary active:bg-secondary-blue dark:active:bg-dark-secondary"
                          value={selectedLab.address}
                          onChange={(e) =>
                            setSelectedLab({
                              ...selectedLab,
                              address: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="h-1/5 w-full flex flex-col">
                      <div>
                        <p className="font-semibold">Telephone :</p>
                      </div>
                      <div className="pt-2 pb-2">
                        <input
                          type="text"
                          placeholder="Enter new Telephone"
                          className="rounded-full p-2 h-3/5 w-full bg-white border-primary-blue border-2 text-center font-semibold dark:border-dark-ternary dark:bg-dark-ternary active:bg-secondary-blue dark:active:bg-dark-secondary"
                          value={selectedLab.telephone}
                          onChange={(e) =>
                            setSelectedLab({
                              ...selectedLab,
                              telephone: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="h-1/5 w-full flex flex-col">
                      <div>
                        <p className="font-semibold">Email :</p>
                      </div>
                      <div className="pt-2 pb-2">
                        <input
                          type="email"
                          placeholder="Enter new E-mail"
                          className="rounded-full p-2 h-3/5 w-full bg-white border-primary-blue border-2 text-center font-semibold dark:border-dark-ternary dark:bg-dark-ternary active:bg-secondary-blue dark:active:bg-dark-secondary"
                          value={selectedLab.email}
                          onChange={(e) =>
                            setSelectedLab({
                              ...selectedLab,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-1 rounded-b">
                  <button
                    className="bg-primary-blue text-white active:bg-black font-bold uppercase text-md px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 dark:bg-dark-primary"
                    type="button"
                    onClick={() => setShowEditModal(false)}
                  >
                    <FontAwesomeIcon icon={faFloppyDisk} />
                    &nbsp; Save
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

export default Manage;
