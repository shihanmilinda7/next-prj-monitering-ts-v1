import { TaskObj } from "@/app/components/task/types";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    let res;

    const taskid: string = searchParams.get("taskid") ?? "";

    try {
        const taskPhotos = await prisma.taskphotos.findMany({
            where: {
                taskid: parseInt(taskid)
            },
        });

        res = { message: "SUCCESS", taskPhotos }
    } catch (error) {
        res = { message: "FAIL" }

    }
    return NextResponse.json(res)
}

export async function POST(request: Request) {
    const { taskid, tmpCategoryId, tmpCategoryDetailId, capturedDataURL, taskphotoid } = await request.json();
    let message: string = "SUCCESS"
    try {
        await prisma.$transaction(async (tx) => {
            
            
            if (taskphotoid) {
                console.log("request",taskphotoid,)
                await tx.taskphotos.update({
                    where: { taskphotoid },
                    data: {
                        photodataurl: capturedDataURL
                    },
                  });
            } else {
                // 1. addnew task .
                await tx.taskphotos.create({
                    data: {
                        taskid,
                        categoryid: tmpCategoryId,
                        categorydetailid: tmpCategoryDetailId,
                        photodataurl: capturedDataURL
                    },
                });
                return ""
            }
        })

    } catch (error) {
        console.error('Error adding new task photo', error);
        message = "FAIL"
    }
    //   return NextResponse.json({message:"SUCCESS",newUser})
    return NextResponse.json(message)
}

export async function DELETE(request: Request) {
    const { taskphotoid} = await request.json();
    let message: string = "SUCCESS"

    try {
        await prisma.$transaction(async (tx) => {
            // 1. delete staff .
            await tx.taskphotos.delete({
                where: {
                    taskphotoid
                },
            })
            return ""
        })
    } catch (error) {
        console.error('Error deleting taskphoto:', error);
        message = "FAIL"
    }


    return NextResponse.json(message)
}
