import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Edit({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || "",
        nim: user.nim || "",
        password: user.password || "",
        role: user.role || "",

    });

    const submit = (e) => {
        e.preventDefault();
        put(route("users.update", user.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Data Pengguna" />
            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Edit Data Pengguna
            </h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <InputLabel htmlFor="name" value="Edit Nama" />
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
                        <InputLabel htmlFor="name" value="Edit NIM Pengguna" />
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

                    <div>
                        <InputLabel htmlFor="name" value="Edit Password Pengguna" />
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
                        <InputLabel htmlFor="role" value="Edit Role" />
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
