import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const params = new URL(req.url).searchParams;
  const key = params.get("key");

  if (!key) {
    return new Response(JSON.stringify({ message: "No key provided." }));
  }

  const store = getStore("images");

  const image = await store.get(key, {
    type: "blob",
  });

  if (!image) {
    return new Response(
      JSON.stringify({ message: "No image exists with that key." }),
    );
  }

  const response = new Response(image, {
    headers: {
      "content-type": "image/png",
    },
  });

  return response;
};
