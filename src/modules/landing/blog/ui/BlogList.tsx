"use client";

import { useEffect, useState } from "react";
import api from "@/shared/api/axios";
import { Blog } from "@/modules/cms/types/blog";
import BlogCard from "./BlogCard";

const BLOG_API = "http://localhost:3001/api/v1/blog";

export default function BlogList() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await api.get(`${BLOG_API}/all`);
                const published = response.data.filter((b: Blog) => b.active);
                setBlogs(published);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <section className="flex items-center justify-center min-h-[50vh]">
                <p className="text-white text-lg">Cargando blogs...</p>
            </section>
        );
    }

    if (blogs.length === 0) {
        return (
            <section className="flex items-center justify-center min-h-[50vh]">
                <p className="text-white text-lg">Próximamente habrá contenido aquí.</p>
            </section>
        );
    }

    return (
        <section className="w-full max-w-7xl mx-auto px-6 py-16">
            <h1 className="text-5xl font-bold text-center text-blue-500 mb-4">Blogs</h1>
            <p className="text-center text-white mb-12 text-lg">
                Artículos, tutoriales y más.
            </p>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>
        </section>
    );
}
