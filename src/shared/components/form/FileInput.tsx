import { ChangeEvent, useEffect, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";


export interface FileInputProps {
    name: string;
    label: string;
    placeholder?: string;
    accept?: string;
}


export function FileInput(fileInputProps: FileInputProps) {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    useEffect(()=>{
        if (!selectedFile) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);

        return()=>{
            URL.revokeObjectURL(url);
        }
    },[ selectedFile ])

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("Selected file:", e.target.files);
        const file = e.target.files ? e.target.files[0] : null;
        setSelectedFile(file);
    }
    

    const handleSubmit = () => {

    }

    return (
        <div className="p-4 bg-white rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center">
            <label htmlFor={fileInputProps.name} className="block text-sm font-medium text-gray-700">
                {fileInputProps.label}
            </label>
            {previewUrl ? (
                <div className="mt-2 max-h-40 relative">
                    <MdCancel className="absolute top-0 right-0 text-red-500 cursor-pointer" onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                    }} />
                    <img src={previewUrl} alt="Selected" className="max-h-40 max-w-full object-contain" />
                </div>
            ):(
            <FaFileAlt className="text-gray-400 mt-2" size={40} />
            )}
            <input
                type="file"
                id={fileInputProps.name}
                name={fileInputProps.name}
                accept={fileInputProps.accept}
                onChange={handleFileChange}
                className="mt-2 p-2 block w-75  rounded-md border border-gray-400 text-center focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                placeholder={fileInputProps.placeholder}
            />
        </div>
    )

}