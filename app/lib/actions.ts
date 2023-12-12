"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export type State = {
  errors?: {
    city?: string[] | undefined;
    address?: string[] | undefined;
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  city: z
    .string({
      required_error: "City is required",
      invalid_type_error: "City must be a string",
    })
    .min(2, { message: "Must be 2 or more characters long" }),
  address: z
    .string({
      required_error: "Address is required",
      invalid_type_error: "Address must be a string",
    })
    .min(2, { message: "Must be 2 or more characters long" }),
});

const CreateBuilding = FormSchema.omit({ id: true });

export async function createBuilding(
  prevState: State,
  formData: FormData
): Promise<State> {
  // Validate form using Zod
  const validatedFields = CreateBuilding.safeParse({
    city: formData.get("city"),
    address: formData.get("address"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Building.",
    };
  }

  // Prepare data for insertion into the database
  const { address, city } = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO buildings (address, city)
      VALUES (${address}, ${city})
    `;

    revalidatePath("/");

    return {
      errors: {
        city: undefined, // Update with actual values
        address: undefined, // Update with actual values
      },
      message: undefined, // Update with actual message
    };
  } catch (err) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }
}
