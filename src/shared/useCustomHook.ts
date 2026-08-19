import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { mapper, UserMapped } from "./helper";


export function useCustomHook() {
    // const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());
    const [usersMapped, setUsersMapped] = useState<UserMapped[] | []>([]);
    const [search, setSearch] = useState<string>("");
    const [debouncedSearch, setDebouncedSearch] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const userCached = useRef<Map<number, { index: number, user: UserMapped }>>(new Map());

    useEffect(() => {
        setLoading(true);
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => {
                if (data.length === 0) {
                    setError("No users found");
                    throw new Error("No users found");
                }
                setUsersMapped(mapper(data));
            })
            .catch((error) => {
                throw new Error("Error fetching users: ");
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    useEffect(() => {
        const debouncedSearch = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(debouncedSearch);
    }, [search]);


    const filteredUsers = useMemo(() => {
        if (!debouncedSearch && debouncedSearch?.trim() === "") return usersMapped;
        return usersMapped.filter((user) => user.name.toLocaleLowerCase().includes(debouncedSearch.toLocaleLowerCase()));
    }, [debouncedSearch, usersMapped]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }


    const handleDelete = async (id: number) => {
        // setDeletingIds((prev) => {
        //     const next = new Set(prev);
        //     next.add(id);
        //     return next;
        // });
        const userToDelete = usersMapped.find((user) => user._id === id);
        const indexUser = usersMapped.findIndex((user) => user._id === id);

        if (indexUser === -1 || !userToDelete) {
            setError("User not found");
            return;
        } else {
            userCached.current.set(userToDelete._id, { index: indexUser, user: userToDelete });
        }

        setUsersMapped((prev) => prev.filter((user) => user._id !== id));
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.dcom/users/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) {
                setError("Failed to delete user");
                throw new Error("Failed to delete user");
            }
            setError(null);
        } catch (error) {
            const cached = userCached.current.get(id);

            if (cached) {
                setUsersMapped((prev) => {
                    const next = [...prev];
                    next.splice(cached.index, 0, cached.user);
                    return next;
                    
                });

                userCached.current.delete(id);
            }
            setError("Error deleting user");
            throw new Error("Error deleting user: ");
        } finally {
            // setDeletingIds((prev) => {
            //     const next = new Set(prev);
            //     next.delete(id);
            //     return next;
            // });
        }
    }

    return {
        usersMapped,
        loading,
        search,
        handleSearchChange,
        filteredUsers,
        handleDelete,
        error,
        // deletingIds
    }
}

