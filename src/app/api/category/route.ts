import { CategoryObj } from "@/app/components/category/types";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    let res;
    // const selectedCol = searchParams.get('page');
    // console.log("searchParams", searchParams)
    // const selectedColumns: string = searchParams.get("columns") ?? "";
    // let selectedColumnsObj: Prisma.staffSelect<DefaultArgs> | null = null;
    // if (selectedColumns) {
    //     selectedColumnsObj = JSON.parse(selectedColumns);
    // }
    try {
        const categoriesData = await prisma.categories.findMany({});
        if (categoriesData.length > 0) {
            for (let i = 0; i < categoriesData.length; i++) {
                const element : CategoryObj= categoriesData[i];
                const categoryDetailData = await prisma.categorydetails.findMany({
                    where: {
                        categoryid: element.categoryid
                    },
                });
                element.categoryValues = categoryDetailData;
            }
            res = { message: "SUCCESS", categoriesData }
        } else {
            res = { message: "FAIL" }
        }
    } catch (error) {
        console.error('Error category:', error);
        res = { message: "FAIL" }
    }

    return NextResponse.json(res)
}

export async function POST(request: Request) {
    const { categoryname, categoryValues } = await request.json();
    let message: string = "SUCCESS"
    try {
        await prisma.$transaction(async (tx) => {
            // 1. addnew category for geader table.
            const newCategoty = await tx.categories.create({
                data: {
                    categoryname
                },
            });

            // 2. Verify category enterd
            if (!newCategoty.categoryid) {
                throw new Error(`Category not enterd`)
            }

            const headerId: number = newCategoty.categoryid
            // 3. addnew category details for geader table.
            for (let i = 0; i < categoryValues.length; i++) {
                const element = categoryValues[i];
                await tx.categorydetails.create({
                    data: {
                        categoryid: headerId,
                        categorydetailname: element.categorydetailname,
                    },
                });
            }

            return ""
        })
    } catch (error) {
        console.error('Error adding new staff:', error);
        message = "FAIL"
    }
    return NextResponse.json(message)
}

export async function PUT(request: Request) {
    const { categoryid, categoryname, categoryValues } = await request.json();
    let message: string = "SUCCESS"

    try {
        await prisma.$transaction(async (tx) => {
            // 1. update category.
            const updateCategory = await tx.categories.updateMany({
                where: { categoryid },
                data: {
                  categoryname
                },
              });

            // 2. update category details.
            for (let i = 0; i < categoryValues.length; i++) {
                const element = categoryValues[i];
                if (element.categorydetailid) {
                  const tmpCatDetailId = element.categorydetailid;
                  await tx.categorydetails.updateMany({
                    where: { categorydetailid: tmpCatDetailId },
                    data: {
                      categorydetailname: element.categorydetailname
                    },
                  });
                } else {
                  await prisma.categorydetails.create({
                    data: {
                      categoryid: categoryid,
                      categorydetailname: element.categorydetailname,
                    },
                  });
                }
            
              }

            return ""
        })
    } catch (error) {
        console.error('Error updating category:', error);
        message = "FAIL"
    }
    return NextResponse.json(message)
}

export async function DELETE(request: Request) {
    const { categoryid, categoryValues } = await request.json();

    let message: string = "SUCCESS"

    try {
        await prisma.$transaction(async (tx) => {
            // 1. delete category.
            await tx.categories.delete({
                where: {
                  categoryid
                },
              })

            // 2. delete category details.
            for (let i = 0; i < categoryValues.length; i++) {
                const element = categoryValues[i];
                await tx.categorydetails.delete({
                    where: {
                      categorydetailid : element.categorydetailid
                    },
                })
            }
            return ""
        })
    } catch (error) {
        console.error('Error deleting category', error);
        message = "FAIL"
    }


    return NextResponse.json(message)
}
