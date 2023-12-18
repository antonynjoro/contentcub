"use server";
import prisma from "../libs/prismadb";

/**
 * Fetches the client's data including full name and image URL from the database.
 * @param {string} clientId - The ID of the client.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the client's full name and image URL.
 */
export async function fetchClientData(clientId) {
  try {
    const userData = await prisma.client.findUnique({
      where: {
        id: clientId,
      },
      select: {
        firstName: true,
        lastName: true,
        attributes: true,
      },
    });

    return {
      fullName: `${userData.firstName} ${userData.lastName}`,
      imageUrl: userData.attributes.image_url,
    };
  } catch (error) {
    console.error("Error fetching client data:", error);
    throw error;
  }
}

/**
 * Fetches the user's data including full name and image URL from the database.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the user's full name and image URL.
 */
export async function fetchUserData(userId) {
  try {
    const userData = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        firstName: true,
        lastName: true,
        attributes: true,
      },
    });
    return {
      fullName: `${userData.firstName} ${userData.lastName}`,
      imageUrl: userData.attributes.image_url,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}
