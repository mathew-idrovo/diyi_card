import db from "./db";

export async function getUsers() {
  try {
    return await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Unable to fetch users");
  }
}
