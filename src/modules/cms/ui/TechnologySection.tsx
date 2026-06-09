"use client";

import FormSections from "@/shared/components/form/FormSections";
import Selects from "@/shared/components/form/Selects";
import { useState } from "react";
import { Technology } from "../types/technology";

export default function TechnologySection() {

    const [technologies, setTechnologies] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<Technology>({
        name: '',
        tags: [],
        technologies: []
    });

    const handleAddTechnology = () => {
        console.log("Agregar tecnología:", selectedCategory.name, technologies);
        if(selectedCategory.name && technologies){
            setSelectedCategory((prev)=>{
 

                return{
                    ...prev,
                    name: prev.name,
                    technologies: [...prev.technologies, technologies],
                    tags: [...prev.tags, `${selectedCategory.name}-${technologies}`]
                }
            })
        }
    }


    return (
        <>
        <FormSections title="Sección Tecnología">
            <Selects 
                value={selectedCategory.name}
                label="Categoría de Tecnología"
                onChange={(value) => setSelectedCategory((prev) => ({ ...prev, name: value }))}
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
                value={technologies!}
                onChange={(value)=> setTechnologies(value)}
                placeholder="Selecciona una tecnología"
                options={[
                    { label: "JavaScript", value: "javascript", iconName: "FaJs" },
                    { label: "TypeScript", value: "typescript", iconName: "BsTypescript" },
                    { label: "Python", value: "python", iconName: "FaPython" },
                    { label: "Java", value: "java", iconName: "FaJava" },
                ]}
            />
            <button type="button" className="bg-red-400 text-white p-2 rounded-lg cursor-pointer hover:bg-red-500" onClick={() => handleAddTechnology()}>
                Agregar Tecnología
            </button>
        </FormSections>

        <div className="">
            {selectedCategory.technologies.length > 0 && (
                <div className="mt-4">
                    <h4 className="text-lg font-semibold mb-2">{selectedCategory.name}</h4>
                    <ul className="list-disc list-inside">
                        {selectedCategory.technologies.map((tech, index) => (
                            <li key={index}>{tech}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
        </>
    )
}