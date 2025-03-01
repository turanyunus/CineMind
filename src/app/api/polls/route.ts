import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Create a new poll
export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { movieId, question, options } = await request.json();

    if (!movieId || !question || !options || options.length < 2) {
      return NextResponse.json(
        { error: "Movie ID, question and at least 2 options are required" },
        { status: 400 }
      );
    }

    // Set poll end date to 7 days from now
    const endsAt = new Date();
    endsAt.setDate(endsAt.getDate() + 7);

    const poll = await prisma.poll.create({
      data: {
        movieId,
        question,
        options,
        endsAt,
      },
      include: {
        votes: {
          select: {
            optionIndex: true,
          },
        },
      },
    });

    return NextResponse.json(poll);
  } catch (error) {
    console.error("Poll creation error:", error);
    return NextResponse.json(
      { error: "Failed to create poll" },
      { status: 500 }
    );
  }
}

// Get polls for a movie
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const movieId = searchParams.get("movieId");

    if (!movieId) {
      return NextResponse.json(
        { error: "Movie ID is required" },
        { status: 400 }
      );
    }

    const polls = await prisma.poll.findMany({
      where: {
        movieId,
        endsAt: {
          gt: new Date(), // Only active polls
        },
      },
      include: {
        votes: {
          select: {
            optionIndex: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculate vote percentages
    const pollsWithStats = polls.map(
      (poll: { votes: { optionIndex: number }[]; options: string[] }) => {
        const totalVotes = poll.votes.length;
        const voteCounts = poll.options.map((_: string, index: number) => {
          return poll.votes.filter(
            (vote: { optionIndex: number }) => vote.optionIndex === index
          ).length;
        });
        const votePercentages = voteCounts.map((count: number) =>
          totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0
        );

        return {
          ...poll,
          totalVotes,
          voteCounts,
          votePercentages,
        };
      }
    );

    return NextResponse.json(pollsWithStats);
  } catch (error) {
    console.error("Polls fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch polls" },
      { status: 500 }
    );
  }
}

// Vote on a poll
export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { pollId, optionIndex } = await request.json();

    if (typeof pollId !== "string" || typeof optionIndex !== "number") {
      return NextResponse.json(
        { error: "Poll ID and option index are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if poll exists and is still active
    const poll = await prisma.poll.findUnique({
      where: { id: pollId },
    });

    if (!poll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    if (poll.endsAt < new Date()) {
      return NextResponse.json({ error: "Poll has ended" }, { status: 400 });
    }

    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return NextResponse.json(
        { error: "Invalid option index" },
        { status: 400 }
      );
    }

    // Check if user has already voted
    const existingVote = await prisma.pollVote.findFirst({
      where: {
        pollId,
        userId: user.id,
      },
    });

    if (existingVote) {
      // Update existing vote
      await prisma.pollVote.update({
        where: { id: existingVote.id },
        data: { optionIndex },
      });
    } else {
      // Create new vote
      await prisma.pollVote.create({
        data: {
          pollId,
          userId: user.id,
          optionIndex,
        },
      });
    }

    // Return updated poll stats
    const updatedPoll = await prisma.poll.findUnique({
      where: { id: pollId },
      include: {
        votes: {
          select: {
            optionIndex: true,
          },
        },
      },
    });

    if (!updatedPoll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    const totalVotes = updatedPoll.votes.length;
    const voteCounts = updatedPoll.options.map((_: string, index: number) => {
      return updatedPoll.votes.filter(
        (vote: { optionIndex: number }) => vote.optionIndex === index
      ).length;
    });
    const votePercentages = voteCounts.map((count: number) =>
      totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0
    );

    return NextResponse.json({
      ...updatedPoll,
      totalVotes,
      voteCounts,
      votePercentages,
    });
  } catch (error) {
    console.error("Vote error:", error);
    return NextResponse.json(
      { error: "Failed to process vote" },
      { status: 500 }
    );
  }
}
