import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjectBySlug } from "../services/api";
import "./ProjectPage.css";

export default function ProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProjectBySlug(slug)
      .then(setProject)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p>Loading project...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!project) return <p>Project not found.</p>;

  const coverUrl =
    project.cover?.formats?.medium?.url || project.cover?.url;

  return (
    <div className="project-detail-container">
      <h1>{project.title}</h1>

      {coverUrl ? (
        <img src={coverUrl} alt={project.title} className="project-detail-cover" />
      ) : (
        <div className="fallback">No Image</div>
      )}

      <p className="summary">{project.summary}</p>

      <div className="project-description">
        {project.description.map((block, index) => (
          <p key={index}>
            {block.children?.map((child) => child.text).join("")}
          </p>
        ))}
      </div>

      <p className="tech">
        <strong>Tech Stack:</strong> {project.techStack}
      </p>

      <div className="links">
        {project.liveLink && (
          <a href={project.liveLink} target="_blank">Live</a>
        )}
        {project.gitLink && (
          <a href={project.gitLink} target="_blank">GitHub</a>
        )}
      </div>
    </div>
  );
}
