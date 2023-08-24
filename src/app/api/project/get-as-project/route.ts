import { StaffObj } from "@/app/components/staff/types";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;

  const projectid: string = searchParams.get("projectid") ?? "";

  const project = await prisma.projects.findMany({
    where: {
      projectid: parseInt(projectid),
    },
  });

  if (project.length > 0) {
    const projectTasks = await prisma.projecttasks.findMany({
      where: {
        projectid: parseInt(projectid),
      },
    });
console.log("projectTasks",projectTasks,)
    if (projectTasks.length > 0) {
      res = { message: "SUCCESS", project, projectTasks };
    } else {
      res = { message: "FAIL" };
    }
  } else {
    res = { message: "FAIL" };
  }
  return NextResponse.json(res);
}

export async function POST(request: Request) {
  const {
    projectname,
    projectdescription,
    startdate,
    enddate,
    projectstatus,
    taskRowObjects,
  } = await request.json();
  let message: string = "SUCCESS";
  try {
    await prisma.$transaction(async (tx) => {
      // 1. addnew project .
      const project = await tx.projects.create({
        data: {
          projectname,
          projectdescription,
          startdate,
          enddate,
          projectstatus,
        },
      });

      // 2. Verify staff enterd
      if (!project.projectid) {
        throw new Error(`Project not enterd`);
      }

      const headerId: number = project.projectid;

      // 3. addnew tasks
      for (let i = 0; i < taskRowObjects.length; i++) {
        const element = taskRowObjects[i];
        await tx.projecttasks.create({
          data: {
            projectid: headerId,
            taskname: element.taskname,
            taskdescription: element.taskdescription,
            startdate: element.startdate,
            enddate: element.startdate,
          },
        });
      }

      return "";
    });
  } catch (error) {
    console.error("Error adding new project", error);
    message = "FAIL";
  }
  return NextResponse.json(message);
}

export async function PUT(request: Request) {
  const {
    staffid,
    staffname,
    contracttype,
    contactno,
    nic,
    password,
    username,
    userid,
    role,
  } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  let message: string = "SUCCESS";
  try {
    await prisma.$transaction(async (tx) => {
      // 1. update staff .
      const updateStaff = await tx.staff.updateMany({
        where: { staffid },
        data: {
          staffname,
          contracttype,
          contactno,
          nic,
        },
      });

      // 2. update user
      const updateUser = await tx.users.updateMany({
        where: { userid },
        data: {
          username,
          password: hashedPassword,
          role,
        },
      });

      return "";
    });

    // const updateStaff = await tx.staff.updateMany({
    //     where: { staffid },
    //     data: {
    //         staffname,
    //         contracttype,
    //         contactno,
    //         nic,
    //     },
    // });
  } catch (error) {
    console.error("Error updating staff:", error);
    message = "FAIL";
  }
  return NextResponse.json(message);
}

export async function DELETE(request: Request) {
  const { staffid, userid } = await request.json();
  let message: string = "SUCCESS";

  try {
    await prisma.$transaction(async (tx) => {
      // 1. delete staff .
      await tx.staff.delete({
        where: {
          staffid: staffid,
        },
      });

      // 2. delete user
      await tx.users.delete({
        where: {
          userid,
        },
      });

      return "";
    });

    // await prisma.staff.delete({
    //     where: {
    //         staffid: staffid
    //     },
    // })
  } catch (error) {
    console.error("Error deleting staff:", error);
    message = "FAIL";
  }

  return NextResponse.json(message);
}
