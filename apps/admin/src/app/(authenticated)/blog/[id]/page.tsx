import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { BlogForm } from "../blog-form";
import type { BlogPost } from "@/lib/types";

export default async function EditBlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (!data) notFound();

  return (
    <div>
      <h1 className="text-lg font-semibold mb-6">Edit post</h1>
      <BlogForm post={data as BlogPost} />
    </div>
  );
}
