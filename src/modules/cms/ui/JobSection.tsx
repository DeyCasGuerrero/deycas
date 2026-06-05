import FormSections from "@/shared/components/form/FormSections";
import Input from "@/shared/components/form/Input";

export default function JobSection() {
    return (
        <FormSections title="Sección Trabajo (Working)">
            <Input name="working_title" label="Título de la Sección" placeholder="Working" />
            <Input name="company_image" label="Imagen de Empresa (URL)" placeholder="https://..." />
            <Input name="company_name" label="Nombre de la Empresa" placeholder="Allen DostMen" />
            <Input name="company_role" label="Puesto en la Empresa" placeholder="Software Engineer at Allen Dost Men LLC" />
        </FormSections>
    )
}