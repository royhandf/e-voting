import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Button from "@/Components/Button";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nim: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="flex justify-center items-center min-h-screen w-full bg-gray-100 dark:bg-gray-800">
                <div className="w-full max-w-md sm:max-w-lg bg-white dark:bg-gray-900 p-10 rounded-lg shadow-xl">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6">
                        Log in
                    </h2>

                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="nim" value="NIM" />
                            <TextInput
                                id="nim"
                                type="text"
                                name="nim"
                                value={data.nim}
                                className="mt-2 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData("nim", e.target.value)}
                            />
                            <InputError message={errors.nim} className="mt-2" />
                        </div>

                        <div className="mt-6">
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-2 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-6 flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                                Remember me
                            </span>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-purple-600 hover:underline dark:text-purple-400"
                                >
                                    Forgot your password?
                                </Link>
                            )}

                            <Button
                                className="bg-purple-600 hover:bg-purple-700 px-6 py-3 text-white rounded-md shadow-md focus:ring-2 focus:ring-purple-500 dark:bg-purple-700 dark:hover:bg-purple-800 w-full sm:w-auto"
                                processing={processing ? "true" : "false"}
                            >
                                Log in
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
