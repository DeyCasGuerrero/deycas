"use client";
import api from "@/shared/api/axios";
import FormSections from "@/shared/components/form/FormSections";
import Input from "@/shared/components/form/Input";
import TextArea from "@/shared/components/form/TextArea";
import { useEffect, useState } from "react";

interface HeroData {
    title: string;
    name: string;
    rol: string;
    description: string;
}

export default function HeroSection() {

    const [heroData, setHeroData] = useState<HeroData | null>(null);

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const res = await api.get("http://localhost:3001/api/v1/mainSection/get");
                console.log("Data fetched:", res.data);
                setHeroData(res.data);
            } catch (error) {
                console.error("Error fetching hero data:", error);
            }
        }
        
        fetchData();
    },[])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setHeroData((prev)=>{
            if (!prev) return prev; 
            return{
                ...prev,
                [name]: value
            }
        })
    }
    
    return (
        <FormSections title="Sección Hero">
            <Input onChange={handleChange} value={heroData?.title || ""} name="title" label="Mensaje de Bienvenida" placeholder="Hey, Hello there!" />
            <Input onChange={handleChange} value={heroData?.name || ""} name="name" label="Nombre" placeholder="I'm Deyvis Castillo" />
            <Input onChange={handleChange} value={heroData?.rol || ""} name="rol" label="Rol / Profesión" placeholder="A System Engineer and software developer" />
            <TextArea onChange={handleChange} value={heroData?.description || ""} name="description" label="Descripción 'Sobre Mí'" placeholder="Escribe tu biografía aquí..." />
        </FormSections>
    )
}