import { StaffObj } from "@/app/components/staff/types";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;

  // const tmpPageNumber: any = searchParams.get("page-number");
  // const searchStaffName: any = searchParams.get("search-staff-name");
  // const searchDesignation: any = searchParams.get("search-desigantion");
  // const currentPage: any = parseInt(tmpPageNumber);

  // const postsPerPage = 10; // Number of posts per page
  // const offset = (currentPage - 1) * postsPerPage;

  let totalProjectCount: any;

  try {
    // console.log("searchStaffName",searchStaffName,)
    await prisma.$transaction(async (tx) => {
      totalProjectCount = await tx.projects.count();

      res = { message: "SUCCESS", totalProjectCount };

      return "";
    });
  } catch (error) {
    console.log("error", error);
    res = { message: "FAIL" };
  }

  return NextResponse.json(res);
}
