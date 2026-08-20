"use client";

import { Blog } from "../types/blog";
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";

type BlogListSectionProps = {
    blogs: Blog[];
    onEdit: (blog: Blog) => void;
    onDelete: (id: string) => void;
};

export default function BlogListSection({ blogs, onEdit, onDelete }: BlogListSectionProps) {
    if (blogs.length === 0) {
        return (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <p className="text-lg">No hay blogs creados</p>
                <p className="text-sm mt-1">Crea tu primer blog para comenzar</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {blogs?.map((blog) => (
                <div
                    key={blog._id}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                >
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                                {blog.title}
                            </h3>
                            {blog.active ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                    <FaEye className="h-3 w-3" />
                                    Publicado
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                    <FaEyeSlash className="h-3 w-3" />
                                    Borrador
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                            {blog.subtitle || "Sin subtítulo"}
                        </p>
                        {blog.tags.length > 0 && (
                            <div className="flex gap-1 mt-2 flex-wrap">
                                {blog.tags.map((tag) => (
                                    <span key={tag} className="rounded-md bg-sky-100 px-1.5 py-0.5 text-xs text-sky-700 dark:bg-sky-900/30 dark:text-sky-400">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                        <button
                            onClick={() => onEdit(blog)}
                            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-sky-600 dark:hover:bg-slate-800 dark:hover:text-sky-400 transition-colors"
                            title="Editar"
                        >
                            <FaEdit className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => onDelete(blog._id)}
                            className="p-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors"
                            title="Eliminar"
                        >
                            <FaTrash className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
