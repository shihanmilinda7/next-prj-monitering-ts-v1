"use client";

import StaffAddNew from "./addnew";
import { StaffObj } from "./types";

export const StaffTable = ({
  staffRowData,
  setReloadTable,
}: {
  staffRowData: StaffObj[];
  setReloadTable: () => void;
}) => {
  // const [reloadTable, setReloadTable] = useState(false);

  const tableHeads = [
    "#",
    "Name",
    "Contract Type",
    "Role",
    "Contact No",
    "Desigantion",
    "NIC",
    "",
  ];
  console.log("ddd", staffRowData);
  return (
    <div className="md:px-2 py-2 w-full">
      <div className="shadow overflow-y-scroll rounded border-b border-gray-200 w-full">
        <table className="min-w-full bg-white">
          <thead className="border-b-2 text-black border-indigo-400">
            <tr>
              {tableHeads.map((head) => (
                <th
                  key={head}
                  className="text-left py-5 px-4 uppercase text-sm font-bold"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {staffRowData.map((tableRow: StaffObj, index: number) => (
              <tr className="even:bg-blue-gray-50/50" key={tableRow.staffid}>
                <td className="text-left py-3 px-4 font-bold">{index + 1}</td>
                <td className="text-left py-3 px-4">{tableRow.staffname}</td>
                <td className="text-left py-3 px-4">{tableRow.contracttype}</td>
                <td className="text-left py-3 px-4">{tableRow.role}</td>
                <td className="text-left py-3 px-4">{tableRow.contactno}</td>
                <td className="text-left py-3 px-4">{tableRow.designation}</td>
                <td className="text-left py-3 px-4">{tableRow.nic}</td>
                {/* <td className="p-4 cursor-pointer hover:text-amber-900 hover: " onClick={()=>selRow(tableRow)}>Edit</td> */}
                <td className="text-left py-3 px-4 cursor-pointer hover:text-amber-900 hover: ">
                  <StaffAddNew
                    setReloadTable={setReloadTable}
                    buttonName="Edit | Delete"
                    selRowData={tableRow}
                    delButton={true}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
