export interface PublicProfile {
    id: number;
    username: string;
    createdAt: string;
}

export default async function getPublicProfile(id: string | number): Promise<PublicProfile | null> {
    const res = await fetch(
        `${process.env.NEST_INTERNAL_URL}/users/${id}`,
        { cache: 'no-store' }
    );

    if (!res.ok) {
        if (res.status === 404) {
            return null;
        }
        throw new Error(`Failed to fetch profile ${id}: ${res.status}`);
    }

    return res.json();
}
