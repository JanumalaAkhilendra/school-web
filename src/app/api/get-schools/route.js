import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("schools")
    .select("id, name, address, city, image_url");

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
