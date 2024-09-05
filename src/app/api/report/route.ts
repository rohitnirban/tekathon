import dbConnect from "@/lib/dbConnect";
import ReportModel from "@/models/Report";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    await dbConnect();

    try {
        console.log(request.body);
        const report = new ReportModel(request.body);
        await report.save();
        return NextResponse.json(
            {
                status: true,
                message: "Report Saved Successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                status: false,
                message: "Error in report saving",
            },
            { status: 500 }
        );
    }
}
