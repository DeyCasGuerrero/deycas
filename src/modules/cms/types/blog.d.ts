export interface Blog {
    _id: string;
    title: string;
    subtitle: string;
    tags: string[];
    content: string;
    coverImage?: string;
    active: boolean;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export type BlogPayload = Omit<Blog, "_id" | "userId" | "createdAt" | "updatedAt">;
