import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Edit({ election }) {
    const { data, setData, put, processing, errors } = useForm({
        title: election.title,
        start_date: election.start_date,
        end_date: election.end_date,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("elections.update", election.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Pemilihan" />
            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Edit Pemilihan
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

                    <div className="flex justify-end pt-2">
                        <Button
                            type="submit"
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                            disabled={processing}
                        >
                            {processing ? "Menyimpan..." : "Simpan Perubahan"}
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
