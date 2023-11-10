"use server"

import prisma from "../../../libs/prismadb";

// Assuming TypeScript, add types for the parameters
export async function createUser(
  externalId: string, 
  email: string, 
  firstName: string, 
  lastName: string, 
  attributes: any // Replace 'any' with a more specific type if possible
) {
  try {
    // Input validation (basic example)
    if (!email.includes('@')) {
      throw new Error("Invalid email address");
    }

    // Create a new user in the database
    const user = await prisma.user.create({
      data: {
        externalId,
        email,
        firstName,
        lastName,
        // Handle optional attributes appropriately
        attributes: attributes || {}, // Default to an empty object if attributes is undefined
      },
    });

    return user;
  } catch (error) {
    // Error handling
    console.error("Failed to create user:", error);
    throw error; // Rethrow the error after logging or handling it
  }
}
