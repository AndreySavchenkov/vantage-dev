import { sql } from "@vercel/postgres";
import { Building } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchBuildings() {
  noStore();

  try {
    console.log("Fetching buildings data...");

    const data = await sql<Building>`SELECT * FROM buildings`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch buildings data.");
  }
}
