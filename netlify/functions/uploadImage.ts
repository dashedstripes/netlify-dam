import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";
import * as multipart from "parse-multipart-data";

export default async (req: Request, context: Context) => {
  if (!req.body) {
    return new Response(JSON.stringify({ message: "Upload failed" }));
  }

  const contentType = req.headers.get("Content-Type");
  const boundary = contentType?.split("boundary=")[1];

  if (!boundary) {
    return new Response(
      JSON.stringify({ message: "Unable to parse boundary" }),
    );
  }

  let data = Buffer.alloc(0);

  const reader = req.body.getReader();

  let text = "";
  let result = await reader.read();

  while (!result.done) {
    data = Buffer.concat([data, result.value]);
    result = await reader.read();
  }

  const files = multipart.parse(data, boundary);

  let parsedData = new Map();

  for (const file of files) {
    if (file.name === "fileName") {
      const value = new TextDecoder().decode(file.data);
      parsedData.set(file.name, value);
    } else {
      parsedData.set(file.name, file.data);
    }
  }

  const images = getStore("images");
  await images.set(parsedData.get("fileName"), parsedData.get("file"));

  return new Response(JSON.stringify({ message: "Upload successful" }));
};
