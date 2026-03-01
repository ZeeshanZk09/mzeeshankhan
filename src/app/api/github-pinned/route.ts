import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const login = searchParams.get('login') || 'ZeeshanZk09';
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      // If there's no server token configured, return an empty list so clients
      // can fallback to unauthenticated REST calls without hitting a 500.
      return NextResponse.json(
        { repos: [], warning: 'Server GitHub token not configured' },
        { status: 200 }
      );
    }

    const query = `query ($login: String!) {\n  user(login: $login) {\n    pinnedItems(first: 6, types: REPOSITORY) {\n      nodes {\n        ... on Repository {\n          id\n          name\n          description\n          url\n          homepageUrl\n          stargazerCount\n          primaryLanguage { name }\n          updatedAt\n          isFork\n        }\n      }\n    }\n  }\n}`;

    const resp = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({ query, variables: { login } }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      // Return a 200 with empty repos so frontend falls back to the REST API.
      return NextResponse.json(
        { repos: [], error: 'GraphQL fetch failed', detail: text },
        { status: 200 }
      );
    }

    const json = await resp.json();
    console.log('my-pin-repos-json-response: ', json);
    type GraphRepoNode = {
      isFork?: boolean;
      id: string;
      name: string;
      description: string | null;
      url: string;
      homepageUrl?: string | null;
      stargazerCount?: number;
      primaryLanguage?: { name?: string } | null;
      updatedAt?: string;
    };

    const nodes: GraphRepoNode[] = json?.data?.user?.pinnedItems?.nodes ?? [];
    const mapped = nodes
      .filter((n) => !n.isFork)
      .map((n) => ({
        id: n.id,
        name: n.name,
        description: n.description,
        html_url: n.url,
        homepage: n.homepageUrl ?? null,
        language: n.primaryLanguage?.name ?? null,
        stargazers_count: n.stargazerCount ?? 0,
        updated_at: n.updatedAt,
        fork: n.isFork,
      }));

    return NextResponse.json({ repos: mapped });
  } catch (err) {
    // Don't surface server 500s for client-side fallbacks — return empty repos
    // with an error message so the frontend can proceed.
    return NextResponse.json(
      { repos: [], error: (err as Error).message || 'Unknown error' },
      { status: 200 }
    );
  }
}
