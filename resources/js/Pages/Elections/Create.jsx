import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TrixEditor from "@/Components/TrixEditor";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        status: "pending",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("elections.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Pemilihan" />
            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Tambah Pemilihan
            </h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <InputLabel htmlFor="title" value="Judul Pemilihan" />
                        <TextInput
                            id="title"
                            type="text"
                            name="title"
                            value={data.title}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("title", e.target.value)}
                            required
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="description" value="Deskripsi" />
                        <TrixEditor
                            value={data.description}
                            onChange={(content) =>
                                setData("description", content)
                            }
                        />

                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="start_date"
                            value="Tanggal Mulai"
                        />
                        <TextInput
                            id="start_date"
                            type="datetime-local"
                            name="start_date"
                            value={data.start_date}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("start_date", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.start_date}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="end_date"
                            value="Tanggal Selesai"
                        />
                        <TextInput
                            id="end_date"
                            type="datetime-local"
                            name="end_date"
                            value={data.end_date}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("end_date", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.end_date}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="status" value="Status" />
                        <SelectInput
                            options={[
                                {
                                    value: "pending",
                                    label: "Pending",
                                },
                                { value: "active", label: "Active" },
                                {
                                    value: "canceled",
                                    label: "Canceled",
                                },
                                {
                                    value: "closed",
                                    label: "Closed",
                                },
                            ]}
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-purple-500"
                        />

                        <InputError message={errors.status} className="mt-2" />
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
