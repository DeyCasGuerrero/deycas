"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useBlogs } from "../hooks/useBlogs";
import { Blog, BlogPayload } from "../types/blog";
import BlogListSection from "../ui/BlogListSection";
import BlogEditor from "../ui/BlogEditor";

export default function BlogModule() {
    const { blogs, loading, createBlog, updateBlog, deleteBlog } = useBlogs();
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleSave = async (payload: BlogPayload) => {
        if (editingBlog?._id) {
            await updateBlog(editingBlog._id, payload);
            setEditingBlog(null);
        } else {
            await createBlog(payload);
            setIsCreating(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Estás seguro de que quieres eliminar este blog?")) {
            await deleteBlog(id);
        }
    };

    const handleCancel = () => {
        setEditingBlog(null);
        setIsCreating(false);
    };

    if (isCreating || editingBlog) {
        return (
            <BlogEditor
                blog={editingBlog}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
                    <p className="text-muted-foreground">Gestiona tus artículos y publicaciones.</p>
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-sky-700 transition-colors"
                >
                    <FaPlus className="h-4 w-4" />
                    Nuevo Blog
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12 text-slate-500">Cargando blogs...</div>
            ) : (
                <BlogListSection
                    blogs={blogs}
                    onEdit={setEditingBlog}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}
