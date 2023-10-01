import { React, useState, useEffect } from "react";
import { db, storage } from "../../firebase";
import { update, remove, ref, onValue } from "firebase/database";
import { ref as storageRef, deleteObject } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import NotificationModal from "../Modal/NotificationModal";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import LabManageTable from "../tables/LabManageTable";
import DownloadBtn from "../tables/sampleTable/DownloadBtn";
import DebouncedInput from "../tables/sampleTable/DebouncedInput";

function Manage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [labsData, setLabsData] = useState([]); // State to store retrieved data
  const [selectedLab, setSelectedLab] = useState({
    uid: "",
    LabName: "",
    address: "",
    amount: "",
    district: "",
    email: "",
    password: "",
    paymentDate: "",
    province: "",
    telephone: "",
    profilePicture: "",
  });

  const [showLabUpdateSuccessModal, setShowLabUpdateSuccessModal] =
    useState(false);
  const [showLabUpdateUnsuccessModal, setShowLabUpdateUnsuccessModal] =
    useState(false);
  const [showLabRemoveSuccessModal, setShowLabRemoveSuccessModal] =
    useState(false);
  const [showLabRemoveUnsuccessModal, setShowLabRemoveUnsuccessModal] =
    useState(false);
  const [showLabBlockedModal, setShowLabBlockedModal] = useState(false);
  const [showLabUnblockedModal, setShowLabUnblockedModal] = useState(false);

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

  // Lab update function
  const updateLabData = () => {
    const labRef = ref(db, `labs/${selectedLab.uid}`);
    const updates = {
      LabName: selectedLab.LabName,
      address: selectedLab.address,
      telephone: selectedLab.telephone,
      email: selectedLab.email,
    };

    // Update the data in Firebase realtime
    update(labRef, updates)
      .then(() => {
        // Data updated successfully
        console.log("Lab data updated!");
        setShowEditModal(false); // Close the Edit modal
        setShowLabUpdateSuccessModal(true);
      })
      .catch((error) => {
        console.error("Error updating lab data:", error);
        setShowLabUpdateUnsuccessModal(true);
      });
  };

  //Function to hadle remove button
  const handleRemoveClick = (lab) => {
    const labRef = ref(db, "labs/" + lab.uid);
    const imagePath = lab.profilePicture;
    const imageRef = storageRef(storage, imagePath);

    // Remove the user's profile picture from Firebase Storage
    deleteObject(imageRef)
      .then(() => {
        // Image deleted successfully from Firebase Storage
        console.log(lab.LabName, "'s proPic deleted from Firebase Storage");
      })
      .catch((error) => {
        console.error("Error deleting proPic from Firebase Storage:", error);
      });

    // Remove the user from Firebase database
    remove(labRef)
      .then(() => {
        setShowLabRemoveSuccessModal(true);
      })
      .catch((error) => {
        console.error("Error removing Lab:", error);
        setShowLabRemoveUnsuccessModal(true);
      });
  };

  // Function to handle edit button
  const handleEditClick = (lab) => {
    setSelectedLab(lab);
    setShowEditModal(true);
  };

  const handleToggleBlock = (lab) => {
    const labRef = ref(db, `labs/${lab.uid}`);

    // Update the blocked status of the lab in Firebase
    const updatedBlockedStatus = !lab.blocked;
    const updates = {
      blocked: updatedBlockedStatus,
    };

    // Update the data in Firebase
    update(labRef, updates)
      .then(() => {
        // Data updated successfully
        updatedBlockedStatus
          ? setShowLabBlockedModal(true)
          : setShowLabUnblockedModal(true);
      })
      .catch((error) => {
        console.error("Error blocking lab:", error);
      });
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("", {
      id: "No",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "No",
    }),
    columnHelper.accessor("profilePicture", {
      cell: (info) => (
        <img
          src={info?.getValue()}
          alt="proPic"
          className="rounded-full border w-10 h-10 object-cover"
        />
      ),
      header: "Profile Pic",
    }),
    columnHelper.accessor("LabName", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Lab Name",
    }),
    columnHelper.accessor("address", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Address",
    }),
    columnHelper.accessor("telephone", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Telephone",
    }),
    columnHelper.accessor("email", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "E-mail",
    }),
    columnHelper.accessor("", {
      header: "Action",
      cell: (info) => (
        <div className="flex items-center">
          <button
            className="bg-blue text-white active:bg-black font-semibold uppercase text-sm px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            onClick={() => handleEditClick(info.row.original)}
          >
            Edit
          </button>
          <button
            className={`bg-${
              info.row.original.blocked ? "green" : "yellow"
            } text-white active:bg-black font-semibold uppercase text-sm px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
            onClick={() => handleToggleBlock(info.row.original)}
          >
            {info.row.original.blocked ? "Unblock" : "Block"}
          </button>
          <button
            className="bg-red-2 text-white active:bg-black font-semibold uppercase text-sm px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            onClick={() => handleRemoveClick(info.row.original)}
          >
            Remove
          </button>
        </div>
      ),
    }),
  ];
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: labsData,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="flex items-center w-full h-1/6 border-b border-ternary-blue dark:border-dark-ternary">
          <div className="flex justify-start items-center h-full w-1/2 p-3">
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder="Search all columns..."
            />
          </div>
          <div className="flex items-center justify-end h-full w-1/2 p-3">
            <DownloadBtn data={labsData} fileName={"labs"} />
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          </div>
        </div>
        <div className="flex items-center justify-center w-full h-4/6 max-h-[450px] overflow-y-auto p-3 rounded">
          <LabManageTable tableName={table} />
        </div>
        <div className="flex items-center justify-center w-full h-1/6 p-3 border-t border-ternary-blue dark:border-dark-ternary">
          {/* pagination */}
          <div className="flex items-center justify-end mt-2 gap-2 text-ternary-blue dark:text-gray2">
            <button
              onClick={() => {
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
              className="p-1 border border-gray-300 px-2 disabled:opacity-30"
            >
              {"<"}
            </button>
            <button
              onClick={() => {
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
              className="p-1 border border-gray-300 px-2 disabled:opacity-30"
            >
              {">"}
            </button>

            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              | Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-16 bg-transparent"
              />
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="p-2 bg-transparent"
            >
              {[10, 20, 30, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
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
                    onClick={updateLabData}
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

      {/**lab update success modal */}
      {showLabUpdateSuccessModal ? (
        <NotificationModal
          show={showLabUpdateSuccessModal}
          onClose={() => {
            setShowLabUpdateSuccessModal(false);
          }}
          title="Notification"
          body="Lab Updated Successfull! 😎"
          color="green"
        />
      ) : null}

      {/**lab update Unsuccess modal */}
      {showLabUpdateSuccessModal ? (
        <NotificationModal
          show={showLabUpdateUnsuccessModal}
          onClose={() => {
            setShowLabUpdateUnsuccessModal(false);
          }}
          title="Notification"
          body="Lab Updated Unsuccessfull! 😥"
          color="red"
        />
      ) : null}

      {/**lab remove success modal */}
      {showLabRemoveSuccessModal ? (
        <NotificationModal
          show={showLabRemoveSuccessModal}
          onClose={() => {
            setShowLabRemoveSuccessModal(false);
          }}
          title="Notification"
          body="Lab Removed! 🤔"
          color="red"
        />
      ) : null}

      {/**lab remove unsuccess modal */}
      {showLabRemoveUnsuccessModal ? (
        <NotificationModal
          show={showLabRemoveUnsuccessModal}
          onClose={() => {
            setShowLabRemoveUnsuccessModal(false);
          }}
          title="Notification"
          body="Lab Removal Unsuccessfull! 🤗"
          color="red"
        />
      ) : null}

      {/**lab blocked success modal */}
      {showLabBlockedModal ? (
        <NotificationModal
          show={showLabBlockedModal}
          onClose={() => {
            setShowLabBlockedModal(false);
          }}
          title="Notification"
          body="Lab Blocked! 🤔"
          color="yellow"
        />
      ) : null}

      {/**lab unblocked success modal */}
      {showLabUnblockedModal ? (
        <NotificationModal
          show={showLabUnblockedModal}
          onClose={() => {
            setShowLabUnblockedModal(false);
          }}
          title="Notification"
          body="Lab UnBlocked! 🤗"
          color="green"
        />
      ) : null}
    </>
  );
}
export default Manage;
