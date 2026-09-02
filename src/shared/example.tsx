// import { useCustomHook } from "./useCustomHook";

// export interface User {
//     id: number;
//     name: string;
//     username: string;
//     email: string;
// }

// export default function Example() {

//     const { loading, search, handleSearchChange, filteredUsers, handleDelete, error } = useCustomHook();

//     return (
//         <div>
//             <h1>Users</h1>

//             <input
//                 type="text"
//                 className="p-2 border-2 rounded-md"
//                 onChange={handleSearchChange}
//                 value={search}
//                 name="search"
//                 placeholder="Search users"
//             />

//             {loading && <p>Loading...</p>}

//             {error && <p className="text-red-500">{error}</p>}
//             {filteredUsers?.map((user, index) => (
//                 <div key={index} className="flex items-center justify-between p-2 border-b-2">
//                     <span>{user.name}</span>
//                     <span>{user.email}</span>
//                     <span>{user.userName}</span>
//                     <button  onClick={() => handleDelete(user._id)} className="bg-red-500 disabled:opacity-50 text-white px-2 py-1 rounded-md hover:bg-red-600">
//                         Delete
//                     </button>
//                 </div>
//             ))}
//         </div>
//     );
// }

import React, { useEffect, useMemo, useRef, useState } from "react";

export interface Task {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[] | []>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const taskCachedRef = useRef< Task[] | []>([]);

    useEffect(() => {

        const fetchTasks = async () => {
            try {
                setLoading(true);
                const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=20");
                const data = await res.json();
                setTasks(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
        fetchTasks();
    }, []);

    useEffect(() => {

        const handleKey = (e: KeyboardEvent) => {
            
            if (e.ctrlKey && e.key === "z") {
                e.preventDefault();
                console.log("Ctrl key pressed");

                const taskFromCache = taskCachedRef.current;

                if(taskFromCache.length === 0) {
                    console.error("No task in cache");
                    return;
                }

                setTasks((prev)=>[
                    ...prev,
                    taskFromCache[taskFromCache.length -1]
                ])

                taskCachedRef.current = taskFromCache.slice(0, taskFromCache.length - 1);

                console.log("task desde cache", taskFromCache);
            }

        }

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
            const matchesFilter = filter === "all" || (filter === "completed" && task.completed) || (filter === "pending" && !task.completed);
            return matchesSearch && matchesFilter;
        });
    }, [tasks, search, filter]);


    const toggleTask = (id: number) => {
        const task = tasks.find((task) => task.id === id);
        if (!task) return;
        console.log("Toggling task:", task);

        const updatedTask = { ...task, completed: !task.completed };

        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    };

    const deleteTask = (id: number) => {
        if (!window.confirm("¿Seguro que quieres eliminar esta tarea?")) return;
        
        const task = tasks.find((task) => task.id === id);
        if (!task) return;
        taskCachedRef.current = [...taskCachedRef.current, task];
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <div style={{ padding: 30 }}>
            <h1>Mis tareas</h1>

            <div className="p-4">
                <input
                    type="text"
                    placeholder="Buscar tarea..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">Todas</option>
                    <option value="completed">Completadas</option>
                    <option value="pending">Pendientes</option>
                </select>
            </div>

            <div style={{ marginTop: 20 }}>
                <strong>Total: {tasks.length}</strong>
                <span style={{ marginLeft: 20 }}>
                    Completadas: {filteredTasks.filter((task) => task.completed).length}
                </span>
                <span style={{ marginLeft: 20 }}>
                    Pendientes: {filteredTasks.filter((task) => !task.completed).length}
                </span>
            </div>

            {loading && <p>Cargando...</p>}

            {!loading && filteredTasks.length === 0 && (
                <p>No hay tareas.</p>
            )}

            <ul className="p-4 flex flex-col gap-2">
                {filteredTasks.map((task) => (
                    <li className="bg-yellow-100 border border-yellow-200" key={task.id} style={{ marginTop: 10 }}>
                        <span
                            style={{
                                textDecoration: task.completed
                                    ? "line-through"
                                    : "none",
                            }}
                        >
                            {task.title}
                        </span>

                        <button
                            style={{ marginLeft: 10 }}
                            onClick={() => toggleTask(task.id)}
                        >
                            {task.completed ? "Desmarcar" : "Completar"}
                        </button>

                        <button
                            style={{ marginLeft: 10 }}
                            onClick={() => deleteTask(task.id)}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
