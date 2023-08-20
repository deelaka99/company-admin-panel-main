import React from "react";

function Manage() {
  return (
    <div className="flex flex-col w-full h-full">
      
      <div className="h-full w-full flex items-center justify-center">
        <div className=" h-5/6 w-11/12">
          <div className="h-full w-full flex items-center justify-center overflow-x-auto drop-shadow-2xl rounded-md overflow-y-auto">
            <table className="bg-ternary-blue dark:bg-dark-ternary p-3 h-full w-full ">
              <thead>
                <tr className="bg-secondary-blue dark:bg-dark-secondary">
                  <th className="p-1">Lab ID</th>
                  <th className="p-1">Name</th>
                  <th className="p-1">Address</th>
                  <th className="p-1">Contact</th>
                  <th className="p-1">Status</th>
                  <th className="p-1">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td>001</td>
                  <td>A</td>
                  <td>Galle</td>
                  <td>07713377130</td>
                  <td>Active</td>
                  <td>
                    <div className="flex items-center justify-center">
                      <div className="w-1/3">
                        <button className="bg-blue text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                          Update
                        </button>
                      </div>
                      <div className="w-1/3">
                        <button className="bg-red text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                          Remove
                        </button>
                      </div>
                      <div className="w-1/3">
                        <button className="bg-yellow text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                          Block
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>001</td>
                  <td>A</td>
                  <td>Galle</td>
                  <td>07713377130</td>
                  <td>Active</td>
                  <td>
                    <div className="flex items-center justify-center">
                      <div className="w-1/3">
                        <button className="bg-blue text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                          Update
                        </button>
                      </div>
                      <div className="w-1/3">
                        <button className="bg-red text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                          Remove
                        </button>
                      </div>
                      <div className="w-1/3">
                        <button className="bg-yellow text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                          Block
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>001</td>
                  <td>A</td>
                  <td>Galle</td>
                  <td>07713377130</td>
                  <td>Active</td>
                  <td>
                    <div className="flex items-center justify-center">
                      <div className="w-1/3">
                        <button className="bg-blue text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                          Update
                        </button>
                      </div>
                      <div className="w-1/3">
                        <button className="bg-red text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                          Remove
                        </button>
                      </div>
                      <div className="w-1/3">
                        <button className="bg-yellow text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                          Block
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>001</td>
                  <td>A</td>
                  <td>Galle</td>
                  <td>07713377130</td>
                  <td>Active</td>
                  <td>
                    <div className="flex items-center justify-center">
                      <div className="w-1/3">
                        <button className="bg-blue text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                          Update
                        </button>
                      </div>
                      <div className="w-1/3">
                        <button className="bg-red text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                          Remove
                        </button>
                      </div>
                      <div className="w-1/3">
                        <button className="bg-yellow text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                          Block
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>001</td>
                  <td>A</td>
                  <td>Galle</td>
                  <td>07713377130</td>
                  <td>Active</td>
                  <td>
                    <div className="flex items-center justify-center">
                      <div className="w-1/3">
                        <button className="bg-blue text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                          Update
                        </button>
                      </div>
                      <div className="w-1/3">
                        <button className="bg-red text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                          Remove
                        </button>
                      </div>
                      <div className="w-1/3">
                        <button className="bg-yellow text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                          Block
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="text-center">
                  <td>001</td>
                  <td>A</td>
                  <td>Galle</td>
                  <td>07713377130</td>
                  <td>Active</td>
                  <td>
                    <div className="flex items-center justify-center">
                      <div className="w-1/3">
                        <button className="bg-blue text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                          Update
                        </button>
                      </div>
                      <div className="w-1/3">
                        <button className="bg-red text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                          Remove
                        </button>
                      </div>
                      <div className="w-1/3">
                        <button className="bg-yellow text-center p-1 text-white rounded-md hover:opacity-70 h-full">
                          Block
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Manage;
