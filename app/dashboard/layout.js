import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import config from "@/config";
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";

export default async function LayoutPrivate({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (config.auth.loginUrl);
  }

  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
}
