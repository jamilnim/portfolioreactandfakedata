const BLOGS_URL = "/data/blogs.json";

/* ===============================
   NORMALIZER (unchanged shape)
================================ */

function normalizeBlog(item) {
  return {
    id: item.id,
    title: item.title,
    summary: item.summary,
    slug: item.slug,
    date: item.date || item.createdAt,
    body: item.body || [],
    category: item.category || "",

    mainImage: item.mainImage?.url || null,
    subImage: item.subImage?.url || null,
  };
}

/* ===============================
   ALL BLOGS
================================ */

export async function getBlogs() {
  try {
    const res = await fetch(BLOGS_URL);
    if (!res.ok) throw new Error("Failed to load blogs");

    const json = await res.json();
    if (!Array.isArray(json.data)) return [];

    return json.data.map(normalizeBlog);
  } catch (err) {
    console.error("❌ getBlogs failed:", err);
    return [];
  }
}

/* ===============================
   SINGLE BLOG BY SLUG
================================ */

export async function getBlogBySlug(slug) {
  try {
    const res = await fetch(BLOGS_URL);
    if (!res.ok) throw new Error("Failed to load blog");

    const json = await res.json();
    const blog = json.data.find((b) => b.slug === slug);

    return blog ? normalizeBlog(blog) : null;
  } catch (err) {
    console.error("❌ getBlogBySlug failed:", err);
    return null;
  }
}
