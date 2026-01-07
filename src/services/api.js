const DATA_URL = "/data/projects.json";

/* =====================================================
   NORMALIZER (UNCHANGED LOGIC)
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

/* =====================================================
   FAKE FETCH
===================================================== */

export async function getProjects() {
  const res = await fetch(DATA_URL);
  if (!res.ok) throw new Error("Failed to load projects");
  const json = await res.json();
  return (json.data || []).map(normalizeProject);
}

export async function getProjectBySlug(slug) {
  const res = await fetch(DATA_URL);
  if (!res.ok) throw new Error("Failed to load project");
  const json = await res.json();

  const item = json.data.find((p) => p.slug === slug);
  if (!item) throw new Error("Project not found");

  return normalizeProject(item);
}
