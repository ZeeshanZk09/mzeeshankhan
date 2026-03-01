import { app_url } from '@/lib/constants';
import RecentProjectsClient from './RecentProjectsClient';

type Repo = {
  // GitHub GraphQL node IDs are strings, REST ids are numbers — accept both
  id: number | string;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at?: string;
  fork?: boolean;
};

export default async function RecentProjects({
  username = 'ZeeshanZk09',
}: {
  readonly username?: string;
}) {
  // Server-side fetch to improve performance and avoid repeated client requests.
  try {
    const url = new URL(`${app_url}/api/github-pinned?login=${encodeURIComponent(username)}`);
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error('GitHub fetch failed', res.status);
      return <RecentProjectsClient data={[]} />;
    }

    const { repos } = await res.json();
    const sorted = (repos as Repo[]).slice(0, 6);

    return <RecentProjectsClient data={sorted} />;
  } catch (err) {
    console.error('RecentProjects server fetch error', err);
    return <RecentProjectsClient data={[]} />;
  }
}
