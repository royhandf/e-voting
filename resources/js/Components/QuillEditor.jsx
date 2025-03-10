import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function QuillEditor({ value, onChange, ...props }) {
    return (
        <ReactQuill value={value} onChange={onChange} theme="snow" {...props} />
    );
}
