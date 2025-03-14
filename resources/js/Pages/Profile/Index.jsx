import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Button from "@/Components/Button";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function Index({ auth }) {
    const { data, setData, put, processing, errors } = useForm({
        name: auth.user.name,
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route("profile.update"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Berhasil!",
                    text: "Profil berhasil diperbarui.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            },
            onError: () => {
                Swal.fire({
                    title: "Gagal!",
                    text: "Terjadi kesalahan saat memperbarui profil.",
                    icon: "error",
                    confirmButtonText: "Coba Lagi",
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Profil Saya" />
            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Profil Saya
            </h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <InputLabel htmlFor="name" value="Nama" />
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
                        <InputLabel htmlFor="nim" value="NIM" />
                        <TextInput
                            id="nim"
                            type="text"
                            name="nim"
                            value={auth.user.nim}
                            className="mt-1 block w-full bg-gray-100 cursor-not-allowed"
                            disabled
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="password"
                            value="New Password (Opsional)"
                        />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="Kosongkan jika tidak ingin mengubah"
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Konfirmasi Password"
                        />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            placeholder="Masukkan ulang password baru jika diubah"
                        />
                    </div>

                    <div className="flex justify-end pt-2 space-x-4">
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
