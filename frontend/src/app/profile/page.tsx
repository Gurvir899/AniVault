import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ErrorMessage from "@/components/error-message";

export default async function ProfilePage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
        redirect("/login");
    }

    let user;
    let unauthorized = false;

    try {
        const res = await fetch(`${process.env.NEST_INTERNAL_URL}/auth/me`, {
            headers: { Cookie: `token=${token.value}` },
            cache: "no-store",
        });

        if (!res.ok) {
            if (res.status === 401) {
                unauthorized = true;
            } else {
                return <ErrorMessage />;
            }
        } else {
            user = await res.json();
        }
    } catch (err) {
        console.error("Profile page error:", err);
        return <ErrorMessage />;
    }

    if (unauthorized) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-sm px-6 py-8 border border-slate-200">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">Profile</h1>
                <div className="flex flex-col gap-3 text-sm text-slate-600">
                    <div className="flex justify-between">
                        <span>Email</span>
                        <span className="text-slate-900">{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>User ID</span>
                        <span className="text-slate-900">#{user.sub}</span>
                    </div>
                </div>
                <form action="/api/auth/logout" method="POST">
                    <button
                        type="submit"
                        className="mt-6 w-full border border-slate-300 text-slate-600 py-2 text-sm hover:bg-slate-50"
                    >
                        Sign out
                    </button>
                </form>
            </div>
        </div>
    );
}