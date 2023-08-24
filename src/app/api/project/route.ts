import { StaffObj } from "@/app/components/staff/types";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res;

  const project = await prisma.projects.findMany({});

  if (project.length > 0) {
    res = { message: "SUCCESS", project };
  } else {
    res = { message: "FAIL" };
  }
  return NextResponse.json(res);
}


