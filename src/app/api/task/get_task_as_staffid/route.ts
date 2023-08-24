import { TaskObj } from "@/app/components/task/types";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    let res;

    const staffid: string = searchParams.get("staffid") ?? "";
    const status: string = searchParams.get("status") ?? "";
    // console.log("status",status,)
    let rawQuery;
    if (!status) {
        rawQuery = Prisma.sql`SELECT t.taskid, t.clientname, t.location,t.categoryid,c.categoryname FROM tasks AS t LEFT JOIN categories AS c ON t.categoryid = c.categoryid WHERE t.staffid = ${staffid};`;
    } else {
        // console.log("run thissssss",)
        rawQuery = Prisma.sql`SELECT t.taskid, t.clientname, t.location,t.categoryid,c.categoryname FROM tasks AS t LEFT JOIN categories AS c ON t.categoryid = c.categoryid WHERE t.staffid = ${staffid} AND status = ${status};`;
    }
    const tasks: TaskObj[] = await prisma.$queryRaw(rawQuery);


    // const tasks = await prisma.tasks.findMany({
    //     where: { staffid: parseInt(staffid) },
    //     select: { taskid: true, },
    // });

    if (tasks.length > 0) {
        res = { message: "SUCCESS", tasks }
    } else {
        res = { message: "FAIL" }
    }
    return NextResponse.json(res)
}

export async function PUT(request: Request) {
    const { taskid } = await request.json();
    let message: string = "SUCCESS"
    try {
        const updateTask = await prisma.tasks.update({
            where: {taskid: parseInt(taskid) },
            data: {
                status:"Completed"
            },
        });
    } catch (error) {
        console.error('Error updating task', error);
        message = "FAIL"
    }
    return NextResponse.json(message)
}