import FormSections from "@/shared/components/form/FormSections";
import Selects from "@/shared/components/form/Selects";

export default function TechnologySection() {
    return (
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
    )
}