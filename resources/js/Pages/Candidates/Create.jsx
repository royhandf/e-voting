import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import QuillEditor from "@/Components/QuillEditor";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import FileInput from "@/Components/FileInput";

export default function Create({ elections }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        photo: null,
        vision: "",
        mission: "",
        election_id: elections.length > 0 ? elections[0].id : "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("candidates.store"));
    };

    const handleValidation = (field, value) => {
        setData(field, value);

        setErrorsLocal((prev) => ({
            ...prev,
            [field]:
                !value || value.trim() === "<div><br></div>"
                    ? "Field ini wajib diisi"
                    : "",
        }));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Kandidat" />
            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Tambah Kandidat
            </h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <InputLabel htmlFor="name" value="Nama Kandidat" />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="photo" value="Foto Kandidat" />
                        <FileInput setData={setData} />
                        <p className="text-sm text-gray-500 mt-1">
                            * Gunakan foto portrait (3:4)
                        </p>

                        <InputError message={errors.photo} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="vision" value="Visi" />
                        <QuillEditor
                            value={data.vision}
                            onChange={(content) => setData("vision", content)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.vision} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="mission" value="Misi" />
                        <QuillEditor
                            value={data.mission}
                            onChange={(content) => setData("mission", content)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.mission} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="election_id" value="Pemilihan" />
                        <SelectInput
                            options={elections.map((election) => ({
                                value: election.id,
                                label: election.title,
                            }))}
                            value={data.election_id}
                            onChange={(e) =>
                                setData("election_id", e.target.value)
                            }
                            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-purple-500"
                        />
                        <InputError
                            message={errors.election_id}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex justify-end pt-2">
                        <Button
                            type="submit"
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                            disabled={processing}
                        >
                            {processing ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
