'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
};

export default function ProjectsGrid({ username = 'ZeeshanZk09' }: { username?: string }) {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSnippet, setSelectedSnippet] = useState<string | null>(null);
  const [snippetLoading, setSnippetLoading] = useState(false);
  const [snippetError, setSnippetError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchRepos() {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=12`);
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        const data: Repo[] = await res.json();
        // sort by stars, then updated
        data.sort((a, b) => b.stargazers_count - a.stargazers_count);
        if (mounted) setRepos(data);
      } catch (e) {
        if (mounted) setError((e instanceof Error && e?.message) || 'Failed to fetch repos');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchRepos();
    return () => {
      mounted = false;
    };
  }, [username]);

  if (loading) return <div className='py-8 text-center'>Loading projects…</div>;
  if (error) return <div className='py-8 text-center text-red-600'>{error}</div>;
  if (!repos || repos.length === 0)
    return <div className='py-8 text-center'>No public repositories found.</div>;

  return (
    <section id='projects-grid' className='py-12 px-10 sm:px-24'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-3xl font-clashDisplayRegular mb-6'>Project Showcase</h2>
        <p className='text-foreground/60 mb-6 max-w-3xl'>
          Select projects from my GitHub — click to view source or demo.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {repos.map((r) => (
            <article
              key={r.id}
              className='p-4 bg-white/90 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-lg shadow hover:shadow-md transition'
            >
              <h3 className='text-lg font-semibold mb-2'>{r.name}</h3>
              <p className='text-sm text-foreground/60 mb-3'>
                {r.description ?? 'No description provided.'}
              </p>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  {r.language && (
                    <span className='px-2 py-1 bg-gray-200 dark:bg-white/10 rounded-full text-xs'>
                      {r.language}
                    </span>
                  )}
                  <span className='text-xs text-foreground/50'>⭐ {r.stargazers_count}</span>
                </div>
                <div className='flex gap-2'>
                  <a
                    href={r.html_url}
                    target='_blank'
                    rel='noreferrer'
                    className='px-3 py-1 bg-[#047856] text-white rounded text-sm'
                  >
                    Repo
                  </a>
                  {r.homepage ? (
                    <a
                      href={r.homepage}
                      target='_blank'
                      rel='noreferrer'
                      className='px-3 py-1 border border-foreground/20 rounded text-sm'
                    >
                      Demo
                    </a>
                  ) : (
                    <Link
                      href='#projects'
                      className='px-3 py-1 border border-foreground/20 rounded text-sm'
                    >
                      Details
                    </Link>
                  )}

                  <button
                    type='button'
                    onClick={async () => {
                      setSnippetError(null);
                      setSelectedSnippet(null);
                      setSnippetLoading(true);
                      try {
                        const resp = await fetch(
                          `https://api.github.com/repos/${username}/${r.name}/readme`
                        );
                        if (!resp.ok) throw new Error(`readme fetch failed: ${resp.status}`);
                        const json = await resp.json();
                        const content = json?.content;
                        if (!content) throw new Error('No content in readme');
                        const decoded = atob(content);
                        setSelectedSnippet(decoded.slice(0, 2000));
                      } catch (err) {
                        setSnippetError(
                          (err instanceof Error && err?.message) || 'Failed to load snippet'
                        );
                      } finally {
                        setSnippetLoading(false);
                      }
                    }}
                    className='px-3 py-1 border border-foreground/20 rounded text-sm'
                  >
                    {snippetLoading ? 'Loading…' : 'Show Snippet'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className='max-w-7xl mx-auto mt-8'>
          {snippetError && <div className='text-red-600'>{snippetError}</div>}
          {selectedSnippet && (
            <section className='bg-gray-900 text-white p-4 rounded'>
              <h4 className='font-semibold mb-2'>README excerpt</h4>
              <pre className='whitespace-pre-wrap text-sm'>{selectedSnippet}</pre>
            </section>
          )}
        </div>
      </div>
    </section>
  );
}
