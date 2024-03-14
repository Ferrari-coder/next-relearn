import React from "react";
import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import { Suspense } from "react";
import UserPosts from "./components/UserPosts";
import Link from "next/link";
import type { Metadata } from "next";
import getAllUsers from "@/lib/getAllUsers";
import { notFound } from "next/navigation";


//so when next tries to get a dynamic page that doesnt exist instead of generating an error we can just have a 404 page instead 

type Params = {
  params: {
    userId: string;
  };
};

export async function generateMetadata({
  params: { userId },
}: Params): Promise<Metadata> {
  const userData: Promise<User> = getUser(userId);
  const user: User = await userData;

  if (!user.name) {
    return { 
      title: "User not found"
    }
  }
  
  return {
    title: user.name,
    description: `This is the page of ${user.name}`,
  };
}

export default async function UserPage({ params: { userId } }: Params) {
  const userData: Promise<User> = getUser(userId);
  const userPostsData: Promise<Post[]> = getUserPosts(userId);

  //const [user, userPosts] = await Promise.all([userData, userPostsData]);
  //this code simply means we are starting both data fetching data at the same time and we are awaiting till both data ave been fetched

  const user = await userData;

  if (!user.name) return notFound()

  return (
    <>
      <h2>{user.name}</h2>
      <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        <UserPosts promise={userPostsData} />
      </Suspense>

      <button>
        <Link href="/users">Back to all users</Link>
      </button>
    </>
  );
}

export async function generateStaticParams() {
  //for this code we are providing this static parameters in advance for nextjs so it knows what the data is going to be and alladat so next js will statically generate those para,eters in advance without the server side rendering so now it'll be ssg not ssr
  const usersData: Promise<User[]> = getAllUsers();
  const users = await usersData;

  return users.map((user) => ({ userId: user.id.toString() }));
}
