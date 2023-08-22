import { React, useState, useEffect } from "react";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";

function Manage() {
  const [labsData, setLabsData] = useState([]); // State to store retrieved data

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
                      <button className="bg-blue text-white p-1 rounded shadow-lg hover:opacity-80">
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
    </div>
  );
}

export default Manage;
