import { useEffect, useState } from "react";

export default function FileInput({ setData, initialPreview = null }) {
    const [fileName, setFileName] = useState("No file chosen");
    const [preview, setPreview] = useState(initialPreview);

    useEffect(() => {
        setPreview(initialPreview);
    }, [initialPreview]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setFileName(file.name);
            setData("photo_url", file);

            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setFileName("No file chosen");
            setPreview(initialPreview);
        }
    };

    return (
        <div>
            {preview && (
                <div className="mb-3">
                    <img
                        src={preview}
                        alt="Preview Kandidat"
                        className="w-32 h-32 object-cover rounded-md border mt-2"
                    />
                </div>
            )}

            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mt-1  dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600">
                <label className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm cursor-pointer transition dark:bg-purple-500 dark:hover:bg-purple-400">
                    Choose File
                    <input
                        type="file"
                        name="photo_url"
                        accept="image/png, image/jpeg, image/jpg"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>

                <span className="px-4 py-2 text-gray-600 dark:text-gray-300 text-sm">
                    {fileName}
                </span>
            </div>
        </div>
    );
}
