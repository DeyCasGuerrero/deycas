import { useEffect, useState } from "react";
import { useCustomHook } from "./useCustomHook";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

export default function Example() {

    const { loading, search, handleSearchChange, filteredUsers, handleDelete, error } = useCustomHook();

    return (
        <div>
            <h1>Users</h1>

            <input
                type="text"
                className="p-2 border-2 rounded-md"
                onChange={handleSearchChange}
                value={search}
                name="search"
                placeholder="Search users"
            />

            {loading && <p>Loading...</p>}

            {error && <p className="text-red-500">{error}</p>}
            {filteredUsers?.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-2 border-b-2">
                    <span>{user.name}</span>
                    <span>{user.email}</span>
                    <span>{user.userName}</span>
                    <button  onClick={() => handleDelete(user._id)} className="bg-red-500 disabled:opacity-50 text-white px-2 py-1 rounded-md hover:bg-red-600">
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}