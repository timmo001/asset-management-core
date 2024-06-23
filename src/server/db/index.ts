import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { auth, clerkClient } from "@clerk/nextjs/server";

import * as schema from "~/server/db/schema";

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql, { schema });

export async function isUserAdmin(userId: string): Promise<boolean> {
  const fullUserdata = await clerkClient.users.getUser(userId);
  if (fullUserdata?.privateMetadata?.admin) return true;

  return false;
}

export async function isCurrentUserAdmin(): Promise<boolean> {
  const user = auth();
  if (!user.userId) return false;

  return await isUserAdmin(user.userId);
}
