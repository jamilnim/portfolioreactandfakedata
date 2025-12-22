import { Link } from "react-router-dom";
import "./BlogCard.css";

export default function BlogCard({ blog }) {
  return (
    <div className="blog-card">
      {blog.mainImage && (
        <img
          src={blog.mainImage}
          alt={blog.title}
          className="blog-card-img"
        />
      )}

      <div className="blog-card-content">
        <h3>{blog.title}</h3>
        <p>{blog.summary}</p>
        <span>{blog.date}</span>

        <Link to={`/blog/${blog.slug}`}>Read More</Link>
      </div>
    </div>
  );
}
