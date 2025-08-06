import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Button from "@/Components/Button";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { HiOutlineUser, HiOutlineLockClosed } from "react-icons/hi";
import { toast } from "react-toastify";

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nim: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onSuccess: () => {
                toast.success("Anda telah berhasil masuk!");
            },
            onError: (errors) => {
                if (errors.auth) {
                    toast.error(errors.auth);
                }
            },
            onFinish: () => {
                reset("password");
            },
        });
    };

    return (
        <>
            <Head title="Log in" />
            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="hidden lg:flex w-1/2 items-center justify-center bg-purple-800 p-12 text-white relative overflow-hidden">
                    <div className="z-10">
                        <h1 className="text-5xl font-extrabold tracking-tight">
                            Sistem E-Voting
                        </h1>
                        <p className="mt-4 text-lg text-purple-200 max-w-md">
                            Selamat datang! Silakan masuk untuk menggunakan hak
                            pilih Anda secara aman dan transparan.
                        </p>
                    </div>
                    <div className="absolute -bottom-32 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8 z-0 border-purple-400"></div>
                    <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8 z-0 border-purple-400"></div>
                </div>

                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                    <div className="w-full max-w-md">
                        <div className="text-center lg:text-left mb-10">
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                                Masuk ke Akun Anda
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">
                                Gunakan NIM dan password Anda.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel
                                    htmlFor="nim"
                                    value="NIM (Nomor Induk Mahasiswa)"
                                    className="font-semibold"
                                />
                                <div className="relative mt-2">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <HiOutlineUser className="text-gray-400" />
                                    </span>
                                    <TextInput
                                        id="nim"
                                        type="text"
                                        name="nim"
                                        value={data.nim}
                                        className="block w-full pl-10 pr-3 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("nim", e.target.value)
                                        }
                                        placeholder="Masukkan NIM Anda"
                                    />
                                </div>
                                <InputError
                                    message={errors.nim}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                    className="font-semibold"
                                />
                                <div className="relative mt-2">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <HiOutlineLockClosed className="text-gray-400" />
                                    </span>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="block w-full pl-10 pr-3 py-3 border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        placeholder="Masukkan password"
                                    />
                                </div>
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <Button
                                    className="w-full justify-center text-base py-3 px-4 border border-transparent rounded-lg shadow-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:bg-purple-700 dark:hover:bg-purple-800 transition-transform transform hover:scale-105"
                                    disabled={processing}
                                >
                                    {processing ? "Memproses..." : "Log In"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
