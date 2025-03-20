'use server';

export async function getPosts() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}
