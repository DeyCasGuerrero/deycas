"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownRendererProps = {
    content: string;
    className?: string;
};

export default function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
    return (
        <div className={className}>
            <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4">{children}</h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-6 mb-3">{children}</h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-5 mb-2">{children}</h3>
                    ),
                    p: ({ children }) => (
                        <p className="text-slate-700 dark:text-slate-300 leading-7 mb-4">{children}</p>
                    ),
                    a: ({ href, children }) => (
                        <a href={href} className="text-sky-600 dark:text-sky-400 hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>
                    ),
                    ul: ({ children }) => (
                        <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 mb-4 space-y-1">{children}</ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal list-inside text-slate-700 dark:text-slate-300 mb-4 space-y-1">{children}</ol>
                    ),
                    li: ({ children }) => (
                        <li className="leading-6">{children}</li>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-sky-500 pl-4 italic text-slate-500 dark:text-slate-400 my-4">{children}</blockquote>
                    ),
                    code: ({ className, children }) => {
                        const isInline = !className;
                        if (isInline) {
                            return (
                                <code className="bg-slate-100 dark:bg-slate-800 text-rose-500 dark:text-rose-400 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
                            );
                        }
                        return (
                            <code className={`${className} block bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-sm font-mono mb-4`}>{children}</code>
                        );
                    },
                    pre: ({ children }) => (
                        <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-sm font-mono mb-4">{children}</pre>
                    ),
                    img: ({ src, alt }) => (
                        <img src={src} alt={alt} className="max-w-full rounded-xl my-4" />
                    ),
                    hr: () => (
                        <hr className="border-slate-200 dark:border-slate-700 my-8" />
                    ),
                    table: ({ children }) => (
                        <div className="overflow-x-auto mb-4">
                            <table className="min-w-full border border-slate-200 dark:border-slate-700 rounded-lg">{children}</table>
                        </div>
                    ),
                    th: ({ children }) => (
                        <th className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2 text-left font-semibold text-slate-900 dark:text-white">{children}</th>
                    ),
                    td: ({ children }) => (
                        <td className="border border-slate-200 dark:border-slate-700 px-4 py-2 text-slate-700 dark:text-slate-300">{children}</td>
                    ),
                }}
            >
                {content}
            </Markdown>
        </div>
    );
}
