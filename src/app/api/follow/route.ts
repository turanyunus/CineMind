import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { targetUserId } = await request.json();

    if (!targetUserId) {
      return NextResponse.json(
        { error: "Target user ID is required" },
        { status: 400 }
      );
    }

    const follower = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!follower) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if already following
    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: follower.id,
        followingId: targetUserId,
      },
    });

    if (existingFollow) {
      // Unfollow if already following
      await prisma.follow.delete({
        where: { id: existingFollow.id },
      });
      return NextResponse.json({ following: false });
    }

    // Create new follow relationship
    await prisma.follow.create({
      data: {
        followerId: follower.id,
        followingId: targetUserId,
      },
    });

    return NextResponse.json({ following: true });
  } catch (error) {
    console.error("Follow operation error:", error);
    return NextResponse.json(
      { error: "Failed to process follow operation" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const targetUserId = searchParams.get("targetUserId");

    if (!targetUserId) {
      return NextResponse.json(
        { error: "Target user ID is required" },
        { status: 400 }
      );
    }

    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ following: false });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user) {
      return NextResponse.json({ following: false });
    }

    const follow = await prisma.follow.findFirst({
      where: {
        followerId: user.id,
        followingId: targetUserId,
      },
    });

    return NextResponse.json({ following: !!follow });
  } catch (error) {
    console.error("Follow check error:", error);
    return NextResponse.json(
      { error: "Failed to check follow status" },
      { status: 500 }
    );
  }
}

// Get followers or following list
export async function PUT(request: Request) {
  try {
    const { userId, type } = await request.json();

    if (!userId || !type) {
      return NextResponse.json(
        { error: "User ID and type are required" },
        { status: 400 }
      );
    }

    if (!["followers", "following"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid type. Must be 'followers' or 'following'" },
        { status: 400 }
      );
    }

    const users = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        followers:
          type === "followers"
            ? {
                select: {
                  follower: {
                    select: {
                      id: true,
                      name: true,
                      image: true,
                    },
                  },
                },
              }
            : undefined,
        following:
          type === "following"
            ? {
                select: {
                  following: {
                    select: {
                      id: true,
                      name: true,
                      image: true,
                    },
                  },
                },
              }
            : undefined,
      },
    });

    const result =
      type === "followers"
        ? users?.followers.map(
            (f: {
              follower: {
                id: string;
                name: string | null;
                image: string | null;
              };
            }) => f.follower
          )
        : users?.following.map(
            (f: {
              following: {
                id: string;
                name: string | null;
                image: string | null;
              };
            }) => f.following
          );

    return NextResponse.json(result || []);
  } catch (error) {
    console.error("Follow list error:", error);
    return NextResponse.json(
      { error: "Failed to fetch follow list" },
      { status: 500 }
    );
  }
}
