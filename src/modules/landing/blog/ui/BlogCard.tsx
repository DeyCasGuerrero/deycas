import Link from "next/link";
import { Blog } from "@/modules/cms/types/blog";

type BlogCardProps = {
    blog: Blog;
};

export default function BlogCard({ blog }: BlogCardProps) {
    return (
        <Link href={`/blogs/${blog._id}`} className="group block">
            <article className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur overflow-hidden transition-all hover:shadow-lg hover:border-sky-300 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-sky-700">
                {blog.coverImage && (
                    <div className="aspect-video overflow-hidden">
                        <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                    </div>
                )}
                <div className="p-5">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {blog.title}
                    </h2>
                    {blog.subtitle && (
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                            {blog.subtitle}
                        </p>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                        {blog.tags.length > 0 && (
                            <div className="flex gap-1.5 flex-wrap">
                                {blog.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-md bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        {blog.createdAt && (
                            <time className="text-xs text-slate-400 dark:text-slate-500">
                                {new Date(blog.createdAt).toLocaleDateString("es-ES", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </time>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );
}
