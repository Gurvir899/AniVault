import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ErrorMessage from "@/components/error-message";

export default async function ProfilePage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
        redirect("/login");
    }

    let sub: number | null = null;
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
            const me = await res.json();
            sub = me.sub;
        }
    } catch (err) {
        console.error("Profile redirect error:", err);
        return <ErrorMessage />;
    }

    if (unauthorized) {
        redirect("/login");
    }

    redirect(`/users/${sub}`);
}
