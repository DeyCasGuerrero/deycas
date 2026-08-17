"use client"

import { useAuth } from "@/context/auth-context"
import Link from "next/link"

export default function Home() {
    const {user}= useAuth()
    return (
        <div>
            Hello {user?.username}! Welcome to the CMS Dashboard.
            <Link href="/cms/blogs">Go to Blogs</Link>
        </div>
    )
}