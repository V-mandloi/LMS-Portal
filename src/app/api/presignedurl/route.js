import { generatePresignedUrl } from "@/app/utils/awsS3";

export async function GET(req) {
  const key = req.nextUrl.searchParams.get("key");
  const type = req.nextUrl.searchParams.get("type");

  if (!key || !type) {
    return new Response("Key and type are required", { status: 400 });
  }

  try {
    let url;
    if (type === "get") {
      url = await generatePresignedUrl(key);
    } else if (type === "put") {
      url = await uploadPresignedUrl(key);
    } else {
      return new Response("Invalid type", { status: 400 });
    }

    return new Response(JSON.stringify({ url }), { status: 200 });
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
