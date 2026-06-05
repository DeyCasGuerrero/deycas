"use client";

import { SubmitEvent } from "react";
import Form from "../../../shared/components/form/Form";
import FormSections from "../../../shared/components/form/FormSections";
import { FileInput } from "@/shared/components/form/FileInput";
import HeroSection from "../ui/HeroSection";
import JobSection from "../ui/JobSection";
import TechnologySection from "../ui/TechnologySection";

export default function PageModule() {
    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
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
                <HeroSection></HeroSection>
                <TechnologySection></TechnologySection>
                <JobSection></JobSection>
            </Form>
        </div>
    );
}