import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../../services/api";
import styles from "./ProjectsList.module.css";

const ITEMS_PER_PAGE = 4;

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(0);
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

  const start = page * ITEMS_PER_PAGE;
  const visible = projects.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  return (
    <>
      <div className="projectHeader">Projects</div>

      <div className={styles.grid}>
        {visible.map((project) => {
          const imageUrl =
            project.cover?.formats?.small?.url || project.cover?.url;

          return (
            <div
              key={project.id}
              className={styles.card}
              onClick={() => navigate(`/projects/${project.slug}`)}
            >
              {imageUrl ? (
                <img src={imageUrl} alt={project.title} />
              ) : (
                <div className={styles.fallback}>No Image</div>
              )}
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 0}
        >
          ◀
        </button>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages - 1}
        >
          ▶
        </button>
      </div>
    </>
  );
}
