import { supabase } from "./supabase";

export async function getGuests({ filter, sortBy, page, pageSize }) {
  let query = supabase.from("guests").select("*", { count: "exact" });

  // FILTER
  if (filter) {
    query = query.eq(filter.field, filter.value);
  }

  // SORT
  const sortOptions = {
    "sort-by-latest": { field: "created_at", ascending: false },
    "sort-by-name-asc": { field: "fullName", ascending: true },
    "sort-by-name-desc": { field: "fullName", ascending: false },
    "sort-by-nationality-asc": { field: "nationality", ascending: true },
  };

  if (sortBy) {
    const { field, ascending } = sortOptions[sortBy] || {};
    if (field) {
      query = query.order(field, { ascending });
    }
  }

  // PAGINATION
  if (page) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Guests could not be loaded");
  }

  return { data, count };
}

export async function createGuest(guest, id) {
  // 2. Create / Edit guest
  let query = supabase.from("guests");

  if (!id) {
    query = query.insert([{ ...guest }]);
  }

  if (id) {
    query = query.update({ ...guest }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  return data;
}

export async function deleteGuest(id) {
  const { data, error } = await supabase.from("guests").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be deleted");
  }

  return data;
}
