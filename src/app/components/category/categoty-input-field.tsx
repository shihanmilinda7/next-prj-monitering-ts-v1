import Link from "next/link";

type OnChangeFunctionType = (e:React.ChangeEvent<HTMLInputElement>,index:number) => void;
type DeleteFunctionType = (e:React.MouseEvent<HTMLButtonElement>,index:number) => void;
type InputFieldParams = {
    id?: string;
    name?:string;
    value?:string;
    onChange: OnChangeFunctionType;
    index: number;
    deleteInputField: DeleteFunctionType;
    deleteCategoryInputField?:boolean;
  }

const CategoryInputField = ({ id, name, value, onChange, index, deleteInputField,deleteCategoryInputField }:InputFieldParams) => {
  return (
    <div className="flex mb-5">
      <div>
        <input
          type="text"
          name={name}
          id={id}
          placeholder="Photo Type"
          value={value}
          onChange={(e) => onChange(e, index)}
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div className={deleteCategoryInputField ? "flex ml-auto" : "flex ml-auto hidden"}>
        <button type="button"
          onClick={(e) => deleteInputField(e, index)}
          className="bg-red-600 rounded-md p-2 inline-flex items-center justify-center text-red-100 hover:text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
          <span className="sr-only">Close menu</span>
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CategoryInputField;