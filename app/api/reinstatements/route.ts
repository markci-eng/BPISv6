import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await fetch("http://192.168.23.136:5062/Reinstate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 },
    );
  }

  // This is for SQLITE.
  //   try {
  //     const body = await req.json();

  //     const stmt = db.prepare(`
  //       INSERT INTO ReinstateTransactions (
  //         LPANo, TrxMonth, RIType, StatusID, Notes, IsReported
  //       ) VALUES (
  //         @LPANo, @TrxMonth, @RIType, @StatusID, @Notes, @IsReported
  //       )
  //     `);

  //     stmt.run(body);

  //     return NextResponse.json({ success: true });
  //   } catch (error) {
  //     console.error(error);
  //     return NextResponse.json(
  //       { error: "Failed to create transaction" },
  //       { status: 500 },
  //     );
  //   }
}

export async function GET() {
  try {
    const res = await fetch("http://192.168.23.136:5062/Reinstate", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      // Handle HTTP errors
      return NextResponse.json(
        { error: `Server responded with ${res.status}` },
        { status: res.status },
      );
    }

    const data = await res.json(); // <-- parse JSON from response
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch transaction" },
      { status: 500 },
    );
  }

  //   This is for SQLITE
  //   try {
  //     const rows = db.prepare("SELECT * FROM ReinstateTransactions").all();
  //     return NextResponse.json(rows);
  //   } catch (error) {
  //     console.error(error);
  //     return NextResponse.json(
  //       { error: "Failed to fetch transactions" },
  //       { status: 500 },
  //     );
  //   }
}
