"use client";

import React from "react";
import { createBuilding } from "../lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";

export default function CreateBuildingForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createBuilding, initialState);

  console.log(`state-> ${state?.errors?.address}`);

  return (
    <form action={dispatch} className="w-[22rem] flex flex-col gap-5 mt-8">
      <div>
        <Input id="city" name="city" type="text" placeholder="Enter city" />
        {state?.errors?.city &&
          state.errors.city.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <div>
        <Input
          id="address"
          name="address"
          type="text"
          placeholder="Enter address"
        />
        {state?.errors?.address &&
          state.errors.address.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        {state?.message && (
          <p className="mt-2 text-sm text-red-500">{state.message}</p>
        )}
      </div>
      <Button type="submit">Create Building</Button>
    </form>
  );
}
