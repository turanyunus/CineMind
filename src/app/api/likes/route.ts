import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { movieId, commentId, reviewId } = await request.json();

    if (!movieId && !commentId && !reviewId) {
      return NextResponse.json(
        { error: "Either movieId, commentId, or reviewId is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if like already exists
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: user.id,
        OR: [
          { movieId: movieId || undefined },
          { commentId: commentId || undefined },
          { reviewId: reviewId || undefined },
        ],
      },
    });

    if (existingLike) {
      // Unlike if already liked
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
      return NextResponse.json({ liked: false });
    }

    // Create new like
    await prisma.like.create({
      data: {
        userId: user.id,
        movieId: movieId || undefined,
        commentId: commentId || undefined,
        reviewId: reviewId || undefined,
      },
    });

    return NextResponse.json({ liked: true });
  } catch (error) {
    console.error("Like operation error:", error);
    return NextResponse.json(
      { error: "Failed to process like operation" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const movieId = searchParams.get("movieId");
    const commentId = searchParams.get("commentId");
    const reviewId = searchParams.get("reviewId");

    if (!movieId && !commentId && !reviewId) {
      return NextResponse.json(
        { error: "Either movieId, commentId, or reviewId is required" },
        { status: 400 }
      );
    }

    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ liked: false });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user) {
      return NextResponse.json({ liked: false });
    }

    const like = await prisma.like.findFirst({
      where: {
        userId: user.id,
        OR: [
          { movieId: movieId || undefined },
          { commentId: commentId || undefined },
          { reviewId: reviewId || undefined },
        ],
      },
    });

    return NextResponse.json({ liked: !!like });
  } catch (error) {
    console.error("Like check error:", error);
    return NextResponse.json(
      { error: "Failed to check like status" },
      { status: 500 }
    );
  }
}
