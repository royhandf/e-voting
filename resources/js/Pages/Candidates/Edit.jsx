import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import QuillEditor from "@/Components/QuillEditor";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import FileInput from "@/Components/FileInput";

export default function Edit({ candidate, elections }) {
    const { data, setData, post, processing, errors } = useForm({
        name: candidate.name || "",
        photo_url: "",
        number: candidate.number || "",
        vision: candidate.vision || "",
        mission: candidate.mission || "",
        election_id: candidate.election_id || "",
        _method: "PUT",
    });

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("candidates.update", candidate.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Kandidat" />
            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Edit Kandidat
            </h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                <form
                    onSubmit={submit}
                    className="space-y-4"
                    encType="multipart/form-data"
                >
                    <div className="flex items-center space-x-5">
                        <div className="w-full sm:w-4/5">
                            <InputLabel htmlFor="name" value="Nama Kandidat" />
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        <div className="w-full sm:w-1/5">
                            <InputLabel htmlFor="number" value="Nomor Urut" />
                            <TextInput
                                id="number"
                                type="number"
                                name="number"
                                value={data.number}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("number", e.target.value)
                                }
                                min="1"
                                required
                            />
                            <InputError
                                message={errors.number}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div>
                        <InputLabel htmlFor="photo_url" value="Foto Kandidat" />

                        <FileInput
                            setData={setData}
                            initialPreview={candidate.photo_url}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            * Gunakan foto portrait (3:4).
                        </p>
                        <InputError
                            message={errors.photo_url}
                            className="mt-2"
                        />
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

                    <div className="flex justify-end pt-2 space-x-4">
                        <Link
                            as="button"
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                            href={route("candidates.index")}
                        >
                            Batal
                        </Link>
                        <Button
                            type="submit"
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                            // disabled={processing}
                        >
                            {/* {processing ? "Menyimpan..." : "Simpan Perubahan"} */}
                            Simpan Perubahan
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
