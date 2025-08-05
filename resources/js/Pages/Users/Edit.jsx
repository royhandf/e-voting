import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || "",
        nim: user.nim || "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("users.update", user.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Data Pengguna" />
            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200 bg-green    ">
                Edit Data Pengguna
            </h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="name" value="Nama Pengguna" />
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

                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="w-full sm:w-1/2">
                            <InputLabel htmlFor="nim" value="NIM" />
                            <TextInput
                                id="nim"
                                type="number"
                                name="nim"
                                value={data.nim}
                                className="mt-1 block w-full"
                                onChange={(e) => setData("nim", e.target.value)}
                                required
                            />
                            <InputError message={errors.nim} className="mt-2" />
                        </div>

                        <div className="w-full sm:w-1/2">
                            <InputLabel
                                htmlFor="password"
                                value="Password Baru"
                            />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                placeholder="Kosongkan jika tidak diubah"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 space-x-4">
                        <Link
                            as="button"
                            type="button"
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
                            {processing ? "Menyimpan..." : "Simpan Perubahan"}
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
