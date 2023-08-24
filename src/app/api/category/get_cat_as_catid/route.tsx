import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
  const { searchParams } = new URL(request.url)
    let res;
    const categoryid: string = searchParams.get("categoryid") ?? "";
  const categoriesData = await prisma.categorydetails.findMany({
    where: {
      categoryid:parseInt(categoryid)
    },
  });

  if (categoriesData.length > 0) {
console.log(categoriesData,)

    res = { message: "SUCCESS", categoriesData }
  } else {
    res = { message: "FAIL" }
  }
  return NextResponse.json(res)
}
// export async function POST(request:Request) {
//   const {categoryid} = await request.json();

//   let res;
//   const categoriesData = await prisma.categorydetails.findMany({
//     where: {
//       categoryid:parseInt(categoryid)
//     },
//   });

//   if (categoriesData.length > 0) {
//     res = { message: "SUCCESS", categoriesData }
//   } else {
//     res = { message: "FAIL" }
//   }
//   return NextResponse.json(res)
// }
