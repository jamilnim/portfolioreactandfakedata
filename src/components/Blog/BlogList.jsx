import { useEffect, useState } from "react";
import { getBlogs } from "../../services/blogs";
import BlogCard from "./BlogCard";
import "./BlogCard.css";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      const data = await getBlogs();
      setBlogs(data);
    }
    fetchBlogs();
  }, []);

  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
