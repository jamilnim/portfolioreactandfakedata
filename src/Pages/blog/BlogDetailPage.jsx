import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogBySlug } from "../../services/blogs";
import "./BlogDetailPage.css";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    async function fetchBlog() {
      const data = await getBlogBySlug(slug);
      setBlog(data);
    }
    fetchBlog();
  }, [slug]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="blog-detail">
      <h1>{blog.title}</h1>
      <span className="date">{blog.date}</span>

      {blog.mainImage && (
        <img className="main-image" src={blog.mainImage} alt={blog.title} />
      )}

      {/* BODY */}
      <div className="blog-body">
        {blog.body.map((block, index) => {
          if (block.type === "paragraph") {
            return (
              <p key={index}>
                {block.children.map((child, i) => child.text).join("")}
              </p>
            );
          }
          return null;
        })}
      </div>

      {blog.subImage && (
        <img className="sub-image" src={blog.subImage} alt="Extra" />
      )}
    </div>
  );
}
