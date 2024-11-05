import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import dynamic from 'next/dynamic';

// Import ProfileForm dynamically with no SSR
const ProfileForm = dynamic(() => import('@/components/ProfileForm'), {
  ssr: false
});

export default async function Dashboard() {
  await connectMongo();
  const session = await getServerSession(authOptions);
  const user = await User.findById(session.user.id);

  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        {/* Render the ProfileForm component */}
        <ProfileForm user={user} />
      </section>
    </main>
  );
}
