const API_URL = "http://localhost:1337/api";

/* =====================================================
   PROJECTS (FLAT STRAPI DATA)
===================================================== */

function normalizeProject(item) {
  return {
    id: item.id,
    title: item.title || "No Title",
    slug: item.slug,
    summary: item.summary || "",
    description: Array.isArray(item.description) ? item.description : [],
    techStack: item.techStack || "",
    liveLink: item.liveLink || "",
    gitLink: item.gitLink || "",
    cover: item.cover || null,
  };
}

export async function getProjects() {
  const res = await fetch(`${API_URL}/projects?populate=cover`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  const json = await res.json();
  return (json.data || []).map(normalizeProject);
}

export async function getProjectBySlug(slug) {
  const res = await fetch(
    `${API_URL}/projects?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=cover`
  );
  if (!res.ok) throw new Error("Project not found");
  const json = await res.json();
  const item = json.data?.[0];
  if (!item) throw new Error("Project not found");
  return normalizeProject(item);
}

