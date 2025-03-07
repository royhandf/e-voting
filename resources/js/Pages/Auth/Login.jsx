import GuestLayout from "@/Layouts/GuestLayout";
import { Label, Input, Button } from "@windmill/react-ui";
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

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <Label>
                        <span>NIM</span>
                        <Input
                            type="text"
                            name="nim"
                            value={data.nim}
                            className="mt-1"
                            autoComplete="username"
                            onChange={(e) => setData("nim", e.target.value)}
                        />
                    </Label>
                    {errors.nim && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.nim}
                        </p>
                    )}
                </div>

                <div>
                    <Label>
                        <span>Password</span>
                        <Input
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                    </Label>
                    {errors.password && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.password}
                        </p>
                    )}
                </div>

                <div className="flex items-center">
                    <Label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                            className="form-checkbox h-3 w-3 text-blue-600"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </Label>
                </div>

                <div className="flex items-center justify-between">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-sm text-gray-600 hover:underline"
                        >
                            Forgot your password?
                        </Link>
                    )}
                    <Button type="submit" disabled={processing}>
                        Log in
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
