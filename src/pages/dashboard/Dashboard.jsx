import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [registeredLabsCount, setRegisteredLabsCount] = useState(0);
  const [blockedLabsCount, setBlockedLabsCount] = useState(0);

  useEffect(() => {
    // Fetch registered labs count
    const registeredLabsRef = ref(db, "labs/"); // Update with the correct path
    onValue(registeredLabsRef, (snapshot) => {
      try {
        setLoading(true);
        if (snapshot.exists()) {
          const labsData = snapshot.val();
          const labCount = Object.keys(labsData).length;
          setRegisteredLabsCount(labCount);

          // Calculate the count of blocked labs
          const blockedLabCount = Object.values(labsData).filter(
            (lab) => lab.blocked
          ).length;
          setBlockedLabsCount(blockedLabCount);
        }
      } catch (error) {
        console.log("Error in Lab fetching: ", error);
      } finally {
        setLoading(false); // Set loading state to false
      }
    });
  }, []);
  return (
    <div className=" w-full h-full flex items-center justify-center dark:text-white">
      <div className="flex flex-col w-full h-full">
        {/**Title */}
        <div className="h-1/6 w-full flex items-center justify-center p-2">
          <h1 className="text-5xl font-medium">Labs Overview</h1>
        </div>
        <div className="h-5/6 w-full flex items-center justify-center">
          <div className="h-3/4 w-3/4 flex">
            <div className="h-full w-2/5 text-white border-secondary-blue bg-primary-blue rounded-2xl border-2 dark:bg-dark-primary dark:border-dark-ternary dark:drop-shadow-2xl">
              <div className="w-full h-1/6 flex items-center justify-center">
                <p className="text-3xl">Registered Labs</p>
              </div>
              <div className="w-full h-4/6 flex items-center justify-center">
                <h1 className="text-8xl font-bold">{registeredLabsCount}</h1>
              </div>
              <div className="w-full h-1/6 flex items-center justify-center">
                <Link to="/admin/management">
                  <a href="#" className="hover:text-bermuda text-xl">
                    Manage Labs...
                  </a>
                </Link>
              </div>
            </div>
            <div className="h-full w-1/5"></div>
            <div className="h-full w-2/5 text-white border-secondary-blue bg-primary-blue rounded-2xl border-2 dark:bg-dark-primary dark:border-dark-ternary dark:drop-shadow-2xl">
              <div className="w-full h-1/6 flex items-center justify-center">
                <p className="text-3xl">Blocked Labs</p>
              </div>
              <div className="w-full h-4/6 flex items-center justify-center">
                <h1 className="text-8xl font-bold">{blockedLabsCount}</h1>
              </div>
              <div className="w-full h-1/6 flex items-center justify-center">
                <Link to="/admin/management">
                  <a href="#" className="hover:text-bermuda text-xl">
                    Manage Labs...
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default Dashboard;
