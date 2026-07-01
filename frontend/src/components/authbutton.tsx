import { cookies } from "next/headers";
import Link from "next/link";

export default async function AuthButton() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (token) {
        return (
            <Link href="/profile" className="text-slate-300 hover:text-sky-400 text-sm flex-shrink-0">
                Profile
            </Link>
        );
    }

    return (
        <Link href="/login" className="text-slate-300 hover:text-sky-400 text-sm flex-shrink-0">
            Sign in
        </Link>
    );
}