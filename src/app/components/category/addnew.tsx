"use client"

import React, { useState } from 'react'
import Modal from 'react-modal'
import TextInputField from '../common-comp/input-fields/text-input-fields';
import ConfirmAlertbox from '../common-comp/confirm-alertbox';
import { CategoryDetailObj, CategoryObj } from './types';
import CategoryInputField from './categoty-input-field';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

type ParamTypes = {
    buttonName: string;
    selRowData?: CategoryObj;
    delButton?: boolean;
    setReloadTable?: () => void;

}

const CategoryAddNew = (params: ParamTypes) => {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false)

    const [categoryid, setCategoryid] = useState(params.selRowData?.categoryid ?? "");
    const [categoryname, setCategoryname] = useState(params.selRowData?.categoryname ?? "");
    const [categoryValues, setCategoryValues] = useState(params.selRowData?.categoryValues ?? []);

    const [showDelButton, setShowDelButton] = useState(params.delButton);

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)'
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    }

    const submitButtonHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (categoryid) {
            update();
        } else {
            addnew();
        }
    }
    // const submitButtonHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     if (categoryid) {
    //         update();
    //     } else {
    //         addnew();
    //     }
    // }

    //add new category action
    const inputFieldValidation = () =>{
        
    }

    const addnew = async () => {
        const res_new_cat = await fetch(
            "api/category",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ categoryname, categoryValues }),
            }
        );

        const res = await res_new_cat.json();
        console.log(res);

        if (res == "SUCCESS") {
            setIsOpen(false);
            if (params.setReloadTable) {
                params.setReloadTable();
            }
            toast.success('Category crated successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.error('Error!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        return res;

    };

    //update category action
    const update = async () => {
        const res_update_cat = await fetch(
            "api/category",
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ categoryid, categoryname, categoryValues }),
            }
        );

        const res = await res_update_cat.json();

        if (res == "SUCCESS") {
            setIsOpen(false);
            if (params.setReloadTable) {
                params.setReloadTable();
            }
            toast.success('Category updated successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        } else {
            toast.error('Error!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        return res;

    };

    //delete category action
    const deleteAction = async () => {
        if (categoryid) {
            const res_del_cat = await fetch(
                "api/category",
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ categoryid, categoryValues }),
                }
            );

            const res = await res_del_cat.json();
            if (res == "SUCCESS") {
                setIsOpen(false);
                if (params.setReloadTable) {
                    params.setReloadTable();
                }
                toast.success('Category deleted successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            } else {
                toast.error('Error!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } else {
            if (params.setReloadTable) {
                params.setReloadTable();
            }
            router.push("/category")
        }
    }

    //add new input field for category value
    const addInputField = () => {
        const tmpCatValue = [...categoryValues];
        tmpCatValue.push({ categorydetailname: "" });
        setCategoryValues(tmpCatValue);
    }

    //delete input field
    const deleteInputField = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        const tmpCatValue = [...categoryValues];
        tmpCatValue.splice(index, 1);
        setCategoryValues(tmpCatValue);
    };

    //update catgory value array
    const handleCatValueChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const values = [...categoryValues];
        values[index].categorydetailname = e.target.value;
        setCategoryValues(values);
    };

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-2  rounded-lg tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
            >
                {params.buttonName}
            </button>
            {/* <button onClick={() => setIsOpen(true)}>Open Modal</button> */}
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles} ariaHideApp={false}>
                {/* <TextInputField
          id="staffid"
          name="staffid"
          type="hidden"
          autocomplete=""
          value={staffid}
          onChange={(e) => setStaffid(e.target.value)}
        /> */}
                {/* <form onSubmit={submitButtonHandler}> */}
                    <div className="pl-12 pb-1">
                        <h1 className="text-2xl uppercase text-indigo-800">Add New Category</h1>
                    </div>
                    <div className="flex items-center justify-center p-12">
                        <div className="mx-auto w-full max-w-[550px]">


                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3">
                                    <TextInputField
                                        label="Category Name"
                                        id="categoryname"
                                        name="categoryname"
                                        autoComplete=""
                                        placeholder="Category Name"
                                        value={categoryname}
                                        onChange={(e) => setCategoryname(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="">
                                <button onClick={addInputField}
                                    className="rounded-lg bg-white text-slate-700 py-3 px-8 text-center text-base font-semibold outline-none"
                                >
                                    Photo Type +
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4 content-start w-full px-3">
                                {categoryValues.map((categoryValue: CategoryDetailObj, index: number) => (
                                    <div key={categoryValue.categorydetailid}>
                                        <CategoryInputField
                                            id="phototype"
                                            name="phototype"
                                            value={categoryValue.categorydetailname}
                                            onChange={handleCatValueChange}
                                            index={index}
                                            deleteInputField={deleteInputField}
                                            deleteCategoryInputField={true}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex">
                                <div className="mr-3">
                                    <button onClick={submitButtonHandler}
                                        className="rounded-lg bg-gradient-to-r from-green-500 to-green-600  hover:bg-gradient-to-l hover:from-green-500 hover:to-green-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                    >
                                        Submit
                                    </button>
                                </div>
                                <div>
                                    <button onClick={() => setIsOpen(false)}
                                        className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-600  hover:bg-gradient-to-l hover:from-amber-500 hover:to-amber-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div className={showDelButton ? "flex ml-auto" : "flex ml-auto hidden"}>
                                    <ConfirmAlertbox
                                        buttonName="Delete"
                                        leftButtonAction={deleteAction}
                                        title="Are you sure?"
                                        description="Do you want to delete this record ?"
                                        buttonColour='bg-gradient-to-r from-red-500 to-red-600 hover:bg-gradient-to-l hover:from-red-500 hover:to-red-600'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
            </Modal>
        </div>
    )
}
export default CategoryAddNew
