import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostsTableProps {
  posts: Post[];
  isLoading: boolean;
}

export function PostsTable({ posts, isLoading }: PostsTableProps) {
  if (isLoading) {
    return (
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Content</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-5 w-10" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-full max-w-[300px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-lg border">
        <p className="text-muted-foreground">No posts found</p>
      </div>
    );
  }

  return (
    <div className="animate-blur-in w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.id}</TableCell>
              <TableCell className="font-medium">
                {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
              </TableCell>
              <TableCell className="max-w-[400px] truncate">
                {post.body.charAt(0).toUpperCase() + post.body.slice(1)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
