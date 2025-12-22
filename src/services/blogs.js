const STRAPI_URL = "http://localhost:1337";
const BLOG_API = `${STRAPI_URL}/api/blogs`;

function normalizeBlog(item) {
  return {
    id: item.id,
    title: item.title,
    summary: item.summary,
    slug: item.slug,
    date: item.date || item.createdAt,
    body: item.body || [],
    category: item.category,

    mainImage: item.mainImage?.url
      ? STRAPI_URL + item.mainImage.url
      : null,

    subImage: item.subImage?.url
      ? STRAPI_URL + item.subImage.url
      : null,
  };
}

// 🔹 All blogs
export async function getBlogs() {
  try {
    const res = await fetch(`${BLOG_API}?populate=*`);
    const json = await res.json();

    if (!Array.isArray(json.data)) return [];

    return json.data.map(normalizeBlog);
  } catch (err) {
    console.error("❌ getBlogs failed:", err);
    return [];
  }
}

// 🔹 Single blog by slug
export async function getBlogBySlug(slug) {
  try {
    const res = await fetch(
      `${BLOG_API}?filters[slug][$eq]=${slug}&populate=*`
    );
    const json = await res.json();

    if (!json.data?.length) return null;

    return normalizeBlog(json.data[0]);
  } catch (err) {
    console.error("❌ getBlogBySlug failed:", err);
    return null;
  }
}
