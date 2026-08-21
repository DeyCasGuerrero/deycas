"use client";

import { useCallback, useEffect, useState } from "react";
import api from "@/shared/api/axios";
import { Blog, BlogPayload } from "../types/blog";

const BLOG_API = "http://localhost:3001/api/v1/blog";

export function useBlogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get(`${BLOG_API}`);
            setBlogs(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const getBlog = useCallback(async (id: string): Promise<Blog | null> => {
        try {
            const response = await api.get(`${BLOG_API}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching blog:", error);
            return null;
        }
    }, []);



    const createBlog = useCallback(async (payload: BlogPayload): Promise<Blog | null> => {
        try {
            const response = await api.post(`${BLOG_API}/create`, payload);
            setBlogs((prev) => [...prev, response.data]);
            return response.data;
        } catch (error) {
            console.error("Error creating blog:", error);
            return null;
        }
    }, []);

    const updateBlog = useCallback(async (id: string, payload: Partial<BlogPayload>): Promise<Blog | null> => {
        try {
            const response = await api.put(`${BLOG_API}/update`, { id, ...payload });
            setBlogs((prev) => prev.map((b) => (b._id === id ? response.data : b)));
            return response.data;
        } catch (error) {
            console.error("Error updating blog:", error);
            return null;
        }
    }, []);

    const deleteBlog = useCallback(async (id: string): Promise<boolean> => {
        try {
            await api.delete(`${BLOG_API}/${id}`);
            setBlogs((prev) => prev.filter((b) => b._id !== id));
            return true;
        } catch (error) {
            console.error("Error deleting blog:", error);
            return false;
        }
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    return {
        blogs,
        loading,
        fetchBlogs,
        getBlog,
        createBlog,
        updateBlog,
        deleteBlog,
    };
}
