'use client';
import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { PostsTable, Post } from '@/components/dashboard/PostsTable';
import { SearchFilters } from '@/components/dashboard/SearchFilters';
import { Pagination } from '@/components/dashboard/Pagination';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getPosts } from '@/server-actions/fetch-posts';

const Dashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getPosts();
        setPosts(data);
        setFilteredPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPosts(posts);
      setCurrentPage(1);
      return;
    }

    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = posts.filter((post) => {
      if (filterBy === 'id') {
        return post.id.toString().includes(lowercasedSearch);
      } else if (filterBy === 'title') {
        return post.title.toLowerCase().includes(lowercasedSearch);
      } else {
        return (
          post.title.toLowerCase().includes(lowercasedSearch) ||
          post.body.toLowerCase().includes(lowercasedSearch) ||
          post.id.toString().includes(lowercasedSearch)
        );
      }
    });

    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterBy, posts]);

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilterBy('all');
  };

  const totalPages = Math.ceil(filteredPosts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <div className="bg-primary/10 text-primary mb-2 inline-block rounded-full px-3 py-1 text-xs font-medium">
            Dashboard
          </div>
          <h1 className="mb-1 text-3xl font-bold tracking-tight">Posts</h1>
          <p className="text-muted-foreground">
            View and manage posts from the API
          </p>
        </div>

        {error ? (
          <Alert variant="destructive">
            <Info className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <>
            <SearchFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filterBy={filterBy}
              onFilterChange={setFilterBy}
              onClear={handleClearSearch}
            />

            <div className="bg-card rounded-lg border">
              <PostsTable posts={paginatedPosts} isLoading={isLoading} />

              <div className="border-t px-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  pageSize={pageSize}
                  onPageSizeChange={handlePageSizeChange}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
