"use client";

import FormSections from "@/shared/components/form/FormSections";
import Selects from "@/shared/components/form/Selects";
import { SubmitEvent, useEffect, useState } from "react";
import { techItem, Technology } from "../types/technology";
import api from "@/shared/api/axios";
import Form from "@/shared/components/form/Form";

export default function TechnologySection() {

    const [technology, setTechnology] = useState<techItem | null>({
        name: "",
        icon: null,
    });
    const [category, setCategory] = useState<string>('');

    const [technologyItem, setTechnologyItem] = useState<Technology[]>([]);

    const handleAddTechnology = () => {
        if (!category || !technology) return;

        setTechnologyItem((prev) => {
            const { technologies, isDuplicate } = addTechnology(prev, category, technology);
            if (isDuplicate) {
                alert("La tecnología ya existe en la categoría seleccionada.");
                return prev;
            }
            return technologies;
        })

    }

    const addTechnology = (technologies: Technology[], category: string, technology: techItem): { technologies: Technology[], isDuplicate: boolean } => {
        console.log("addTechnology invoked with:", { technologies, category, technology });
        const categoryIndex = technologies.findIndex(
            cat => cat.name === category
        );

        if (categoryIndex === -1) {
            return {
                isDuplicate: false,
                technologies: [
                    ...technologies,
                    {
                        name: category,
                        technologies: [
                            {
                                name: technology.name,
                                icon: technology.icon ?? null,
                            }
                        ],
                        tags: []
                    }
                ]
            };
        }

        const categoryItem = technologies[categoryIndex];

        if (categoryItem.technologies.includes(technology)) {
            return {
                isDuplicate: true,
                technologies
            };
        }

        return {
            isDuplicate: false,
            technologies: technologies.map((cat, index) =>
                index === categoryIndex
                    ? {
                        ...cat,
                        technologies: [
                            ...cat.technologies,
                            {
                                name: technology.name,
                                icon: technology.icon ?? null,
    
                            }
                        ]
                    }
                    : cat
            )
        };
    }

    useEffect(() => {
        addTechnology(technologyItem, category, technology as techItem);
    }, [category]);


    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("xd", technologyItem);
        const res = await api.post("http://localhost:3001/api/v1/technology/save", technologyItem)
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <FormSections title="Sección Tecnología">
                    <Selects
                        value={category}
                        label="Categoría de Tecnología"
                        onChange={(value) => setCategory(value)}
                        name="tech_category"
                        iconName="FaCode"
                        placeholder="Selecciona una categoría"
                        options={[
                            { label: "Lenguajes", value: "languages", iconName: "FaTerminal" },
                            { label: "Frameworks / Librerías", value: "frameworks", iconName: "FaReact" },
                            { label: "Herramientas", value: "tools", iconName: "FaTools" },
                            { label: "Servicios Cloud", value: "cloud", iconName: "FaCloud" },
                        ]}
                    />
                    <Selects
                        label="Tecnología"
                        name="technology"
                        value={technology?.name || ""}
                        onChange={(value) => setTechnology({name:value})}
                        placeholder="Selecciona una tecnología"
                        options={[
                            { label: "JavaScript", value: "javascript", iconName: "FaJs" },
                            { label: "TypeScript", value: "typescript", iconName: "BsTypescript" },
                            { label: "Python", value: "python", iconName: "FaPython" },
                            { label: "Java", value: "java", iconName: "FaJava" },
                        ]}
                    />
                    <div className="flex gap-4">
                        <button type="button" className="bg-red-400 text-white p-2 rounded-lg cursor-pointer hover:bg-red-500" onClick={() => handleAddTechnology()}>
                            Agregar Tecnología
                        </button>
                        <button type="submit" className="bg-green-400 text-white p-2 rounded-lg cursor-pointer hover:bg-green-500">
                            Enviar Tecnología
                        </button>
                    </div>
                </FormSections>
            </Form>

            <div className="">
                {technologyItem.length > 0 && (
                    <div className="mt-4 grid grid-cols-4 gap-4">
                        {technologyItem.map((cat, index) => (
                            <div key={index} className="bg-slate-200 border-2 border-gray-200 px-4 py-2 rounded-lg">
                                <h3 className="text-lg font-semibold">{cat.name}</h3>
                                <ul className="list-disc list-inside">
                                    {cat.technologies.map((tech, techIndex) => (
                                        <li key={techIndex}>{tech.name}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}