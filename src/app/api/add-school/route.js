import { supabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const imageFile = formData.get("image");

    if (!imageFile) {
      return new Response(JSON.stringify({ error: "No image uploaded" }), { status: 400 });
    }

    // Convert File → Buffer
    const bytes = await imageFile.arrayBuffer();
    const buffer = new Uint8Array(bytes);

    // Upload to Supabase Storage
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { data: storageData, error: storageError } = await supabase.storage
    .from("school-images")
    .upload(fileName, buffer, {
        contentType: imageFile.type,
        upsert: false,
    });


    if (storageError) throw storageError;

    // Get Public URL
    const { data: publicUrl } = supabase.storage
      .from("school-images")
      .getPublicUrl(fileName);

    // Insert into DB
    const { error: insertError } = await supabase.from("schools").insert([
      {
        name,
        address,
        city,
        state,
        contact,
        email_id,
        image_url: publicUrl.publicUrl,
      },
    ]);

    if (insertError) throw insertError;

    return new Response(JSON.stringify({ message: "School added successfully!" }), { status: 200 });
  } catch (err) {
    console.error("Upload Error:", err.message);
    return new Response(JSON.stringify({ error: "Upload failed" }), { status: 500 });
  }
}
