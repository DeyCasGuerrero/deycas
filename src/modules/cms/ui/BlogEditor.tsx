"use client";

import { FormEvent, SubmitEvent, useEffect, useState } from "react";
import Input from "@/shared/components/form/Input";
import TextArea from "@/shared/components/form/TextArea";
import Form from "@/shared/components/form/Form";
import FormSections from "@/shared/components/form/FormSections";
import MarkdownRenderer from "@/shared/components/MarkdownRenderer";
import { Blog, BlogPayload } from "../types/blog";

type BlogEditorProps = {
    blog?: Blog | null;
    onSave: (payload: BlogPayload) => Promise<void>;
    onCancel: () => void;
};

export default function BlogEditor({ blog, onSave, onCancel }: BlogEditorProps) {
    const [title, setTitle] = useState(blog?.title ?? "");
    const [subtitle, setSubtitle] = useState(blog?.subtitle ?? "");
    const [content, setContent] = useState(blog?.content ?? "");
    const [coverImage, setCoverImage] = useState(blog?.coverImage ?? "");
    const [tagsInput, setTagsInput] = useState(blog?.tags.join(", ") ?? "");
    const [active, setActive] = useState(blog?.active ?? false);
    const [saving, setSaving] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setSubtitle(blog.subtitle);
            setContent(blog.content);
            setCoverImage(blog.coverImage ?? "");
            setTagsInput(blog.tags.join(", "));
            setActive(blog.active);
        }
    }, [blog]);

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true);
        const tags = tagsInput
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);
        await onSave({ title, subtitle, content, coverImage, tags, active });
        setSaving(false);
    };

    return (
        <Form title={blog ? "Editar Blog" : "Crear Blog"} description="Escribe tu contenido en Markdown" onSubmit={handleSubmit}>
            <FormSections title="Información General">
                <Input
                    label="Título"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Mi increíble blog post"
                    required
                />
                <TextArea
                    label="Subtítulo"
                    name="subtitle"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Una breve descripción del blog..."
                    required
                />
                <Input
                    label="Imagen de portada (URL)"
                    name="coverImage"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://ejemplo.com/imagen.jpg"
                />
                <Input
                    label="Tags (separados por coma)"
                    name="tags"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="javascript, react, nextjs"
                />
            </FormSections>

            <FormSections title="Contenido (Markdown)">
                <div className="flex items-center gap-2 mb-2">
                    <button
                        type="button"
                        onClick={() => setShowPreview(false)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            !showPreview
                                ? "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                                : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                    >
                        Editar
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowPreview(true)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            showPreview
                                ? "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400"
                                : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                    >
                        Vista previa
                    </button>
                </div>

                {showPreview ? (
                    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900 min-h-[300px]">
                        {content ? (
                            <MarkdownRenderer content={content} />
                        ) : (
                            <p className="text-slate-400 italic">Escribe algo para ver la vista previa...</p>
                        )}
                    </div>
                ) : (
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="# Hello World&#10;&#10;Escribe tu contenido en **Markdown** aquí..."
                        className="min-h-[300px] w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 font-mono outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
                        required
                    />
                )}
            </FormSections>

            <FormSections title="Configuración">
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Publicado</span>
                </label>
            </FormSections>

            <div className="flex gap-3 pt-2">
                <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-50 transition-colors"
                >
                    {saving ? "Guardando..." : blog ? "Actualizar" : "Crear Blog"}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-xl border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                >
                    Cancelar
                </button>
            </div>
        </Form>
    );
}
