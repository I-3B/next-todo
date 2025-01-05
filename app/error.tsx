"use client";
import { useSession } from "next-auth/react";
import { Logout } from "./(protected)/(index)/logout";

export default function ServerError(e: { error: Error }) {
  const session = useSession();
  return (
    <div>
      {session.data && (
        <p className="flex items-center justify-end p-3">
          {session.data?.user.email} <Logout />
        </p>
      )}
      <p className="mt-10 text-center text-xl text-destructive">
        Error: {e.error.message ?? "Something Went Wrong"}
      </p>
    </div>
  );
}
