import React from "react";

export default async function getUserPosts(userId: string) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    { next: { revalidate: 60 } }
  );
  //by default next already caches the data inside the fetch { cache: 'fetch-cache } but if it is data that is changing constantly we may not want to cache the data so instead of always caching it and letting it remain the stale data we will make it dynamic by no caching (the value will be cache 'no-store' ). However there is incremental static regeneration ISR which is the best option where it checks to see if there is any update in the data , so here we put a revalidate value in it
  //in the above code we wrote that it should revalidate every 60seconds i.e show the page for 60seconds before it revalidates to check if there is any change in the data

  if (!res.ok) return undefined;

  return res.json();
}
