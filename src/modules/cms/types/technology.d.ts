import { BaseResponse } from "./base";

export interface Technology extends BaseResponse {
    name: string;
    technologies: techItem[];
    tags: string[];
    active?: boolean;
}

export interface techItem {
    name: string;
    icon?: string | null;
    active?: boolean;
}

export const TECH_NAME = Object.freeze({
    JavaScript: "JavaScript",
    TypeScript: "TypeScript",
    React: "React",
    NextJS: "Next.js",
    NodeJS: "Node.js",
    Express: "Express",
}) 

export type techName = typeof TECH_NAME[keyof typeof TECH_NAME];