'use client';

import React, { useEffect, useState } from 'react';

type Repo = {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  description: string | null;
};

export default function GitHubHighlights({ username = 'ZeeshanZk09' }: { username?: string }) {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        if (!res.ok) throw new Error('GitHub API error');
        const data: Repo[] = await res.json();
        // filter those with stars or forks
        const highlights = data
          .filter((r) => r.stargazers_count > 0 || r.forks_count > 0)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6);
        if (mounted) setRepos(highlights);
      } catch (e: any) {
        if (mounted) setError(e?.message || 'Failed to fetch');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [username]);

  if (loading) return <div className='py-4'>Loading GitHub highlights…</div>;
  if (error) return <div className='py-4 text-red-600'>{error}</div>;
  if (!repos || repos.length === 0)
    return <div className='py-4'>No highlighted repositories yet.</div>;

  return (
    <section id='github-highlights' className='py-8'>
      <h4 className='text-xl font-clashDisplayRegular mb-3'>Community Highlights</h4>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {repos.map((r) => (
          <a
            key={r.id}
            href={r.html_url}
            target='_blank'
            rel='noreferrer'
            className='p-4 bg-white/90 rounded-lg shadow-sm block'
          >
            <div className='flex justify-between items-start mb-2'>
              <div className='font-semibold'>{r.name}</div>
              <div className='text-xs text-gray-600'>
                ⭐ {r.stargazers_count} • Forks {r.forks_count}
              </div>
            </div>
            <p className='text-sm text-gray-600'>{r.description ?? ''}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
