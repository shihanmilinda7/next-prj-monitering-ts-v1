import { TaskObj } from "@/app/components/task/types";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    let res;
    
    // const staffid: string = searchParams.get("staffid") ?? "";
    // let selectedColumnsObj: Prisma.staffSelect<DefaultArgs> | null = null;


    // const staff = await prisma.tasks.findMany({
    //     select: selectedColumnsObj,
    // });

    // const tasks = await prisma.tasks.findMany({});
    const rawQuery = Prisma.sql`SELECT t.*,s.staffname,c.categoryname FROM tasks AS t LEFT JOIN staff AS s ON t.staffid = s.staffid LEFT JOIN categories AS c ON t.categoryid = c.categoryid`;
    const tasks : TaskObj[] = await prisma.$queryRaw(rawQuery);

    if (tasks.length > 0) {
        res = { message: "SUCCESS", tasks }
    } else {
        res = { message: "FAIL" }
    }
    return NextResponse.json(res)
}

export async function POST(request: Request) {
    const { staffid, clientname, categoryid, location, visitcount } = await request.json();
    let message: string = "SUCCESS"

    console.log("TYPEOF", typeof(visitcount))
    try {
        await prisma.$transaction(async (tx) => {
            // 1. addnew task .
            const task = await tx.tasks.create({
                data: {
                    staffid:parseInt(staffid),
                    clientname,
                    categoryid:parseInt(categoryid),
                    location,
                    visitcount:parseInt(visitcount),
                    status:"Not Completed"
                },
            });
            return ""
        })

    } catch (error) {
        console.error('Error adding new task:', error);
        message = "FAIL"
    }
    //   return NextResponse.json({message:"SUCCESS",newUser})
    return NextResponse.json(message)
}

export async function PUT(request: Request) {
    const { taskid, staffid, clientname, categoryid, location, visitcount } = await request.json();
    let message: string = "SUCCESS"
    try {
        const updateTask = await prisma.tasks.updateMany({
            where: { taskid },
            data: {
                staffid:parseInt(staffid), 
                clientname, 
                categoryid:parseInt(categoryid), 
                location, 
                visitcount:parseInt(visitcount)
            },
        });
    } catch (error) {
        console.error('Error updating task', error);
        message = "FAIL"
    }
    return NextResponse.json(message)
}

export async function DELETE(request: Request) {
    const { taskid } = await request.json();

    let message: string = "SUCCESS"

    try {
        await prisma.tasks.delete({
            where: {
                taskid
            },
        })
    } catch (error) {
        console.error('Error deleting task', error);
        message = "FAIL"
    }


    return NextResponse.json(message)
}

// export async function GET(request: Request) {
//     const { searchParams } = new URL(request.url)
//     let res;
    
//     const staffid: string = searchParams.get("staffid") ?? "";
//     console.log(searchParams,staffid);


//     // const tasks = await prisma.tasks.findMany({});
//     const rawQuery = Prisma.sql`SELECT t.*,s.staffname,c.categoryname FROM tasks AS t LEFT JOIN staff AS s ON t.staffid = s.staffid INNER JOIN categories AS c ON t.categoryid = c.categoryid`;
//     const tasks : TaskObj[] = await prisma.$queryRaw(rawQuery);

//     if (tasks.length > 0) {
//         res = { message: "SUCCESS", tasks }
//     } else {
//         res = { message: "FAIL" }
//     }
//     return NextResponse.json(res)
// }