import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const store = getStore("images");
  const images = await store.list();

  return new Response(JSON.stringify({ images: images?.blobs || [] }));
};
