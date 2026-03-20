import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProfileContent from "./ProfileContent";
import { UserProfileData } from "@/lib/types";
import { API } from "@/lib/api";

interface ProfilePageProps {
  params: Promise<{ userId: string }>;
}

async function getUserProfile(userId: string): Promise<UserProfileData | null> {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(API.users.profile(userId), {
      headers: {
        Cookie: cookieHeader,
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      return null;
    }

    const data = await response.json();
    return data?.user ? data : null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

async function getCurrentSession() {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(API.users.session, {
      headers: {
        Cookie: cookieHeader,
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  try {
    const { userId } = await params;
    const profile = await getUserProfile(userId);

    if (!profile?.user) {
      return {
        title: "User Not Found | Versus",
      };
    }

    return {
      title: `${profile.user.name || "User"}'s Profile | Versus`,
    };
  } catch {
    return {
      title: "Profile | Versus",
    };
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { userId } = await params;

  const session = await getCurrentSession();
  const profile = await getUserProfile(userId);

  if (!profile?.user) {
    notFound();
  }

  const _isOwnProfile = session?.user?.id === userId;

  return (
    <div className="min-h-screen bg-background">
      <ProfileContent profile={profile} isOwn={_isOwnProfile} />
    </div>
  );
}
