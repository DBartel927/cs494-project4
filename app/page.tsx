'use client'

import { useProfileContext } from "@/context/profileContext";

export default function Home() {

  const { user } = useProfileContext()

  
  return (
    <main>
      <div>Hello {user ? user.email : "World"}!</div>
    </main>
  );
}
