"use client";

import React from "react";
import Form from "../../../shared/components/form/Form";
import FormSections from "../../../shared/components/form/FormSections";
import Input from "../../../shared/components/form/Input";
import Selects from "../../../shared/components/form/Selects";
import TextArea from "../../../shared/components/form/TextArea";
import { FileInput } from "@/shared/components/form/FileInput";

export default function PageModule() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const payload = Object.fromEntries(data.entries());
        console.log("Form submitted:", payload);
    };

    return (
        <div>
            <Form title="Editar Home Page" description="Modifica el contenido de la página principal" onSubmit={handleSubmit}>

                <FormSections title="Background">
                    <FileInput label="Elige el archivo" name="background" accept=".jpg,.jpeg,.png"></FileInput>
                </FormSections>

                <FormSections title="Sección Hero / Sobre Mí">
                    <Input name="hero_image" label="Imagen de Perfil (URL)" placeholder="https://..." />
                    <Input name="hero_welcome" label="Mensaje de Bienvenida" placeholder="Hey, Hello there!" />
                    <Input name="hero_name" label="Nombre" placeholder="I'm Deyvis Castillo" />
                    <Input name="hero_role" label="Rol / Profesión" placeholder="A System Engineer and software developer" />
                    <TextArea name="about_me_description" label="Descripción 'Sobre Mí'" placeholder="Escribe tu biografía aquí..." />
                </FormSections>

                <FormSections title="Sección Tecnología">
                    <Selects
                        label="Categoría de Tecnología"
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
                        placeholder="Selecciona una tecnología"
                        options={[
                            { label: "JavaScript", value: "javascript", iconName: "FaJs" },
                            { label: "TypeScript", value: "typescript", iconName: "BsTypescript" },
                            { label: "Python", value: "python", iconName: "FaPython" },
                            { label: "Java", value: "java", iconName: "FaJava" },
                        ]}
                    />
                </FormSections>

                <FormSections title="Sección Trabajo (Working)">
                    <Input name="working_title" label="Título de la Sección" placeholder="Working" />
                    <Input name="company_image" label="Imagen de Empresa (URL)" placeholder="https://..." />
                    <Input name="company_name" label="Nombre de la Empresa" placeholder="Allen DostMen" />
                    <Input name="company_role" label="Puesto en la Empresa" placeholder="Software Engineer at Allen Dost Men LLC" />
                </FormSections>

                <div className="mt-6 flex justify-end">
                    <button type="submit" className="rounded-full bg-sky-600 text-white px-5 py-2 hover:bg-sky-700 transition-colors">
                        Guardar Cambios
                    </button>
                </div>
            </Form>
        </div>
    );
}