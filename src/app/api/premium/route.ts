import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    console.log("Premium subscription request received");
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Burada gerçek ödeme entegrasyonu yapılacak
    // Şimdilik sadece premium rolü ve bitiş tarihi atayalım
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        role: "PREMIUM",
        premiumUntil: oneMonthFromNow,
      },
      select: {
        role: true,
        premiumUntil: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Premium subscription error:", error);
    return NextResponse.json(
      { error: "Failed to process premium subscription" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: {
        role: true,
        premiumUntil: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isPremium =
      user.role === "PREMIUM" &&
      user.premiumUntil &&
      user.premiumUntil > new Date();

    return NextResponse.json({
      isPremium,
      premiumUntil: user.premiumUntil,
    });
  } catch (error) {
    console.error("Premium status check error:", error);
    return NextResponse.json(
      { error: "Failed to check premium status" },
      { status: 500 }
    );
  }
}
