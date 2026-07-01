import { cookies } from "next/headers";
import getPublicProfile from "@/api/users";
import { getPostsByUser } from "@/api/posts";
import Avatar from "@/components/avatar";
import ProfileTabs from "@/components/profiletabs";
import ErrorMessage from "@/components/error-message";

async function getCurrentUserId(token: string): Promise<number | null> {
    try {
        const res = await fetch(`${process.env.NEST_INTERNAL_URL}/auth/me`, {
            headers: { Cookie: `token=${token}` },
            cache: "no-store",
        });
        if (!res.ok) {
            return null;
        }
        const me = await res.json();
        return me.sub;
    } catch {
        return null;
    }
}

export default async function UserProfilePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    try {
        const profile = await getPublicProfile(id);
        if (!profile) {
            return <h1 className="px-6 py-8 text-slate-500">User not found.</h1>;
        }

        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        const [posts, currentUserId] = await Promise.all([
            getPostsByUser(id),
            token ? getCurrentUserId(token.value) : Promise.resolve(null),
        ]);

        const isOwner = currentUserId === profile.id;

        return (
            <div className="px-4 lg:px-24 py-8 max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Avatar username={profile.username} />
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">{profile.username}</h1>
                        <p className="text-xs text-slate-400">
                            Joined {new Date(profile.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <ProfileTabs posts={posts} isOwner={isOwner} />
            </div>
        );
    } catch (err) {
        console.error("Profile page error:", err);
        return <ErrorMessage />;
    }
}
