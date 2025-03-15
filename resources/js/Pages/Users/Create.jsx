import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import QuillEditor from "@/Components/QuillEditor";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import FileInput from "@/Components/FileInput";

export default function Create({ elections }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        nim: "",
        password: "",
        role: "user",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("candidates.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Kandidat" />
            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Tambah Kandidat
            </h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                <form onSubmit={submit} className="space-y-4">
                    

                        <div>
                        <div className="w-full sm:w-4/5">
                            <InputLabel htmlFor="name" value="Nama Pengguna" />
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
                        </div>
                        

                        <div className="w-full sm:w-1/5">
                            <InputLabel htmlFor="nim" value="NIM" />
                            <TextInput
                                id="nim"
                                type="number"
                                name="nim"
                                value={data.nim}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("nim", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.nim}
                                className="mt-2"
                            />
                        </div>

                        <div className="w-full sm:w-1/5">
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="text"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div>
                        <InputLabel htmlFor="role" value="Role" />
                        <SelectInput
                            options={[
                                {
                                    value: "admin",
                                    label: "Admin",
                                },
                                {
                                    value: "user",
                                    label: "User",
                                },
                            ]}
                            value={data.role}
                            onChange={(e) => setData("role", e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-purple-500"
                        />

                        <InputError message={errors.role} className="mt-2" />
                        </div>

                    

                    <div className="flex justify-end pt-2 space-x-4">
                        <Link
                            as="button"
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                            href={route("users.index")}
                        >
                            Batal
                        </Link>
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
