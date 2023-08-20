import React from "react";

function Manage() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="h-full w-full flex items-center justify-center">
        <div className="h-5/6 w-11/12 overflow-hidden">
          <div class="relative w-full h-full overflow-y-auto overflow-x-auto  shadow-md rounded-lg">
            <table class="w-full text-sm text-center  text-primary-blue dark:text-white">
              <thead class="text-xs text-white  uppercase bg-secondary-blue dark:bg-black dark:text-dark-ternary">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Lab Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Address
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Telephone
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" class="px-4 py-3">
                    Statues
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-ternary-blue dark:bg-dark-ternary overflow-y-auto">
                <tr class="border-b">
                  <td class="px-6 py-4">Durdans</td>
                  <td class="px-6 py-4">nugegoda</td>
                  <td class="px-6 py-4">0112831071</td>
                  <td class="px-6 py-4">123wejith@gmail.com</td>
                  <td class="px-4 py-4">ACTIVE</td>
                  <td class="px-6 py-4 space-x-2">
                    <button className="bg-blue text-white p-1 rounded shadow-lg hover:opacity-80">Edit</button>
                    <button className="bg-yellow text-black p-1 rounded shadow-lg hover:opacity-80">Block</button>
                    <button className="bg-red text-white p-1 rounded shadow-lg hover:opacity-80">Remove</button>
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
