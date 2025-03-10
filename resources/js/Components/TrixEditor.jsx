import { useEffect, useRef } from "react";
import "trix/dist/trix.css";
import "trix";

export default function TrixEditor({ value = "", onChange }) {
    const editorRef = useRef(null);

    useEffect(() => {
        const editor = editorRef.current;

        if (editor) {
            editor.editor.loadHTML(value || "");
        }

        const handleChange = (event) => {
            onChange(event.target.innerHTML);
        };

        editor.addEventListener("trix-change", handleChange);

        return () => {
            editor.removeEventListener("trix-change", handleChange);
        };
    }, [onChange, value]);

    return (
        <div>
            <input id="trix-input" type="hidden" value={value || ""} />
            <trix-editor ref={editorRef} input="trix-input"></trix-editor>
        </div>
    );
}
