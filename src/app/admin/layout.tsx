'use client'

import { useSession } from "next-auth/react";

import { useAppSelector } from "@/lib/hooks";
import { Loader } from "@/components/loader";
import {Login, Sidebar} from "@/components/admin-panel";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const isLoading = useAppSelector((store) => store.loadingSlice);
  const { data: session } = useSession();

  // if (!session?.user) {
  //   return <Login />;
  // }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full h-full">
        {/* <Navbar /> */}
        <div className="bg-gray-200 p-4 h-[calc(100vh-64px)]">{children}</div>
      </div>
      {isLoading&&<Loader />}
    </div>
  )
};
export default AdminLayout;
