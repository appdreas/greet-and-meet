"use server";
import { createAdminClient } from "@/config/appwrite";
import { ID } from "node-appwrite";

async function createUser(previousState: unknown, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return {
      success: false,
      error: "Please fill in all fields",
      fieldData: {
        name,
        email,
        password,
      },
    };
  }

  if (password.length < 8) {
    return {
      success: false,
      error: "Password is too short",
      fieldData: {
        name,
        email,
        password,
      },
    };
  }

  const { account } = await createAdminClient();

  try {
    await account.create(ID.unique(), email, password, name);

    return {
      success: true,
    };
  } catch (error) {
    console.log("Failed to create user", error);
    return {
      success: false,
      error: "Failed to create user",
      fieldData: {
        name,
        email,
        password,
      },
    };
  }
}

export default createUser;
