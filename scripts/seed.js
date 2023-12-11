const { db } = require("@vercel/postgres");
const { buildings } = require("../app/lib/placeholder-data");

async function seedBuildings(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS buildings (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        address VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "buildings" table`);

    const insertedBuildings = await Promise.all(
      buildings.map(async (building) => {
        return client.sql`
        INSERT INTO buildings (id, address, city)
        VALUES (${building.id}, ${building.address}, ${building.city})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedBuildings.length} buildings`);

    return {
      createTable,
      buildings: insertedBuildings,
    };
  } catch (error) {
    console.error("Error seeding buildings:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedBuildings(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
