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

    console.log("[getUserProfile] Fetching profile for:", userId);
    console.log("[getUserProfile] Cookie header:", cookieHeader);

    const response = await fetch(API.users.profile(userId), {
      headers: {
        Cookie: cookieHeader,
      },
      credentials: "include",
      cache: "no-store",
    });

    console.log("[getUserProfile] Response status:", response.status);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      return null;
    }

    const data = await response.json();
    console.log("[getUserProfile] Response data:", data);
    return data?.user ? data : null;
  } catch (error) {
    console.error("[getUserProfile] Error:", error);
    return null;
  }
}

async function getCurrentSession() {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    console.log("[getCurrentSession] Fetching session");
    console.log("[getCurrentSession] Cookie header:", cookieHeader);

    const response = await fetch(API.users.session, {
      headers: {
        Cookie: cookieHeader,
      },
      credentials: "include",
      cache: "no-store",
    });

    console.log("[getCurrentSession] Response status:", response.status);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    console.log("[getCurrentSession] Session data:", data);
    return data;
  } catch (error) {
    console.error("[getCurrentSession] Error:", error);
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

  console.log("[PROFILE_PAGE] userId:", userId);

  const session = await getCurrentSession();
  console.log("[PROFILE_PAGE] session:", session);

  const profile = await getUserProfile(userId);
  console.log("[PROFILE_PAGE] profile:", profile);

  const _isOwnProfile = session?.user?.id === userId;

  return (
    <div className="min-h-screen bg-background">
      <ProfileContent profile={profile} isOwn={_isOwnProfile} />
    </div>
  );
}
