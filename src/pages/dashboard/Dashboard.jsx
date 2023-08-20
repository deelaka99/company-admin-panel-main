import React from "react";
import {Link} from "react-router-dom";

const Dashboard = () => {
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
                    <h1 className="text-8xl font-bold">255</h1>
                  </div>
                  <div className="w-full h-1/6 flex items-center justify-center">
                    <Link to="/admin/management"><a href="#" className="hover:text-bermuda text-xl">
                      Manage Labs...
                    </a></Link>
                  </div>
                </div>
                <div className="h-full w-1/5"></div>
                <div className="h-full w-2/5 text-white border-secondary-blue bg-primary-blue rounded-2xl border-2 dark:bg-dark-primary dark:border-dark-ternary dark:drop-shadow-2xl">
                  <div className="w-full h-1/6 flex items-center justify-center">
                    <p className="text-3xl">Blocked Labs</p>
                  </div>
                  <div className="w-full h-4/6 flex items-center justify-center">
                    <h1 className="text-8xl font-bold">55</h1>
                  </div>
                  <div className="w-full h-1/6 flex items-center justify-center">
                    <Link to="/admin/management"><a href="#" className="hover:text-bermuda text-xl">
                      Manage Labs...
                    </a></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

  );
};

export default Dashboard;
