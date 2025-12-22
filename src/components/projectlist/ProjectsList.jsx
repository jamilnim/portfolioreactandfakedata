import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../../services/api";
import styles from "./ProjectsList.module.css";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!projects.length) return <p>No projects found.</p>;

  return (
    <>
    <div className="projectHeader">Project</div>
    <div className={styles.grid}>
      {projects.map((project) => {
        const imageUrl =
          project.cover?.formats?.small?.url || project.cover?.url;

        return (
          <div
            key={project.id}
            className={styles.card}
            onClick={() => navigate(`/projects/${project.slug}`)}
          >
            {imageUrl ? (
              <img
                src={`http://localhost:1337${imageUrl}`}
                alt={project.title}
              />
            ) : (
              <div className={styles.fallback}>No Image</div>
            )}
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
          </div>
        );
      })}
    </div>
    </>
  );
}
