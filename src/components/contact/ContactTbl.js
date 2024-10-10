import React from "react";
import { Button } from "../form";

const ContactTbl = () => {
  return (
    <div className="w-full h-[450px] bg-primary rounded-2xl p-3 mb-20">
      <div className="flex flex-col gap-4 w-full">
        <div className="w-full h-20 bg-white rounded-xl flex justify-between items-center px-8">
          <Button
            intent={"primary"}
            size={"md"}
            children={"Add Contact"}
            roundness={"round"}
            classes={""}
            type={"button"}
          />
        </div>
        <div className="w-full h-[330px]  bg-white rounded-xl">
          <div className="w-full h-full  overflow-auto p-3">
            <table className="w-full border-separate rounded-xl border-2 border-tertiary-gray-700">
              <thead className="text-base font-inter font-bold uppercase">
                <th className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                  Name
                </th>

                <th className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                  Name
                </th>
                <th className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                  Name
                </th>
                <th className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                  Name
                </th>
                <th className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                  Name
                </th>
                <th className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                  Name
                </th>
              </thead>
              <tbody className="text-base font-inter font-normal">
                <tr className="">
                  <td className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Moiz
                  </td>
                  <td className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Moiz
                  </td>
                  <td className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Moiz
                  </td>
                  <td className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Moiz
                  </td>
                  <td className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Moiz
                  </td>
                  <td className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Moiz
                  </td>
                </tr>
                <tr className="">
                  <td className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Moiz
                  </td>
                </tr>
                <tr className="">
                  <td className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Moiz
                  </td>
                </tr>
                <tr className="">
                  <td className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Moiz
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactTbl;
