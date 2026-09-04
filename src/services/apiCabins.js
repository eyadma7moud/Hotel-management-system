import { supabase } from "./supabase";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createCabin(cabin, id) {
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);

  let imagePath = cabin.image;
  let imageName;

  // 1. Upload new image FIRST (before touching the DB)
  if (!hasImagePath && cabin.image instanceof File) {
    imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabin.image);

    if (storageError) {
      console.error(storageError);
      throw new Error("There is an error with cabin image");
    }
  }

  // 2. Create / Edit cabin (only after the image is safely uploaded)
  let query = supabase.from("cabins");

  if (!id) {
    query = query.insert([{ ...cabin, image: imagePath }]);
  }

  if (id) {
    query = query.update({ ...cabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be updated");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
