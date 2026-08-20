"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import api from "@/shared/api/axios";
import { Blog } from "@/modules/cms/types/blog";
import MarkdownRenderer from "@/shared/components/MarkdownRenderer";

const BLOG_API = "http://localhost:3001/api/v1/blog";

export default function BlogDetail() {
    const params = useParams();
    const id = params?.id as string;
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchBlog = async () => {
            try {
                const response = await api.get(`${BLOG_API}/${id}`);
                setBlog(response.data);
            } catch (error) {
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <section className="flex items-center justify-center min-h-[50vh]">
                <p className="text-white text-lg">Cargando...</p>
            </section>
        );
    }

    if (!blog) {
        return (
            <section className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <p className="text-white text-lg">Blog no encontrado</p>
                <Link href="/blogs" className="text-sky-400 hover:underline">
                    Volver a blogs
                </Link>
            </section>
        );
    }

    return (
        <article className="w-full max-w-3xl mx-auto px-6 py-16">
            <Link href="/blogs" className="text-sky-400 hover:underline text-sm mb-6 inline-block">
                &larr; Volver a blogs
            </Link>

            {blog.coverImage && (
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full rounded-2xl mb-8 object-cover max-h-96"
                />
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{blog.title}</h1>

            <div className="flex items-center gap-4 mb-8 text-sm text-slate-400">
                {blog.createdAt && (
                    <time>
                        {new Date(blog.createdAt).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                )}
                {blog.tags.length > 0 && (
                    <div className="flex gap-1.5">
                        {blog.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-md bg-sky-900/30 px-2 py-0.5 text-xs text-sky-400"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-black/60 rounded-2xl p-8 backdrop-blur">
                <MarkdownRenderer content={blog.content} />
            </div>
        </article>
    );
}
