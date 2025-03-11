import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function QuillEditor({ value, onChange, }) {
    return (
        <ReactQuill value={value} onChange={onChange} theme="snow"  />
    );
}
