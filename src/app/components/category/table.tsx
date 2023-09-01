import CategoryAddNew from "./addnew";
import { CategoryObj } from "./types";

export const CategoryTable = ({
  categoryRowData,
  setReloadTable,
}: {
  categoryRowData: CategoryObj[];
  setReloadTable: () => void;
}) => {
  const tableHeads = ["#", "Category Name", "Photo Types", ""];
  console.log("ddd", categoryRowData);

  return (
    <div className="md:px-2 py-2 w-full">
      <div className="shadow overflow-y-scroll rounded border-b border-gray-200 w-full">
        <table className="min-w-full bg-white">
          <thead className="border-b-2 text-black border-purple-400">
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
            {categoryRowData.map((tableRow: CategoryObj, index: number) => (
              <tr
                className="even:bg-purple-gray-50/50"
                key={tableRow.categoryid}
              >
                <td className="text-left py-3 px-4 font-bold">{index + 1}</td>
                <td className="text-left py-3 px-4">{tableRow.categoryname}</td>
                <td className="text-left py-3 px-4">
                  {tableRow.categoryValues &&
                    tableRow.categoryValues.map((catValue) => (
                      <ul key={catValue.categorydetailid}>
                        <li>{catValue.categorydetailname}</li>
                      </ul>
                    ))}
                </td>
                <td className="text-left py-3 px-4 cursor-pointer hover:text-amber-900 hover: ">
                  <CategoryAddNew
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
