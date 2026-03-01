import AnimationWrapper from '../utils/AnimationWrapper';
import {
  Code2,
  GitFork,
  Users,
  FolderGit2,
  Award,
  Briefcase,
  Calendar,
  Zap,
  Trophy,
  Heart,
  GitPullRequest,
  Target,
} from 'lucide-react';

const achievements = [
  {
    icon: FolderGit2,
    value: '37+',
    label: 'Public Repositories',
    description: 'Open-source projects on GitHub',
  },
  {
    icon: Users,
    value: '130+',
    label: 'GitHub Followers',
    description: 'Growing developer community',
  },
  {
    icon: Code2,
    value: '400+',
    label: 'Contributions',
    description: 'Commits, PRs, and reviews in the last year',
  },
  {
    icon: GitFork,
    value: '6',
    label: 'Pinned Projects',
    description: 'Highlighted full-stack applications',
  },
  {
    icon: Award,
    value: 'GIAIC',
    label: 'Student Developer',
    description: 'Governor Sindh IT Initiative — AI, Web 3.0 & Metaverse',
  },
  {
    icon: Briefcase,
    value: 'Zebotix',
    label: 'Founder',
    description: 'Software agency building modern web solutions',
  },
  {
    icon: Calendar,
    value: '3+',
    label: 'Years Experience',
    description: 'Full-stack development & modern web technologies',
  },
  {
    icon: Zap,
    value: '20+',
    label: 'Tech Stack',
    description: 'Modern frameworks, libraries, and tools mastered',
  },
  {
    icon: Trophy,
    value: '15+',
    label: 'Projects Delivered',
    description: 'Successful web applications & client solutions',
  },
  {
    icon: Heart,
    value: '50+',
    label: 'Community Help',
    description: 'Developer mentoring & problem-solving contributions',
  },
  {
    icon: GitPullRequest,
    value: 'Pull Shark',
    label: 'GitHub Achievement',
    description: 'Opened quality pull requests across repositories',
  },
  {
    icon: Target,
    value: 'YOLO',
    label: 'GitHub Badge',
    description: 'Successfully merged pull requests without review',
  },
];

async function fetchGitHubAchievements() {
  try {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      // If there's no server token configured, return null so we can fallback to static data
      console.warn('No GitHub token configured, using static achievements data');
      return null;
    }
    const statsQuery = `query ($login: String!) {
    user(login: $login) {
    repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
      totalCount
    }
    followers {
      totalCount
    }
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      totalRepositoryContributions
    }
    pinnedItems(first: 6, types: REPOSITORY) {
      totalCount
    }
    achievements: contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
    }
    repositoriesContributedTo(first: 100, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
      totalCount
    }
    starredRepositories {
      totalCount
    }
    watching {
      totalCount
    }
    bioHTML
    status {
      message
      emoji
    }
    }
    }`;

    const statsResp = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({ query: statsQuery, variables: { login: 'ZeeshanZk09' } }),
    });

    if (statsResp.ok) {
      const statsData = await statsResp.json();
      const user = statsData?.data?.user;
      if (user) {
        const githubStats = {
          repos: user.repositories.totalCount,
          followers: user.followers.totalCount,
          contributions:
            user.contributionsCollection.totalCommitContributions +
            user.contributionsCollection.totalPullRequestContributions +
            user.contributionsCollection.totalIssueContributions,
          pinnedItems: user.pinnedItems.totalCount,
        };
        console.log('GitHub Stats:', githubStats);
        return githubStats;
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching GitHub achievements:', error);
    return null;
  }
}
export default async function Achievements() {
  const githubData = await fetchGitHubAchievements();
  console.log('GitHub achievements:', githubData);

  // Create dynamic achievements based on real GitHub data or fallback to static data
  const dynamicAchievements = githubData
    ? [
        {
          icon: FolderGit2,
          value: `${githubData.repos}`,
          label: 'Public Repositories',
          description: 'Open-source projects on GitHub',
        },
        {
          icon: Users,
          value: `${githubData.followers}`,
          label: 'GitHub Followers',
          description: 'Growing developer community',
        },
        {
          icon: Code2,
          value: `${githubData.contributions}+`,
          label: 'Contributions',
          description: 'Commits, PRs, and reviews in the last year',
        },
        {
          icon: Calendar,
          value: '2+',
          label: 'Years Experience',
          description: 'Full-stack development & modern web technologies',
        },
        {
          icon: GitPullRequest,
          value: 'Pull Shark',
          label: 'GitHub Achievement',
          description: 'Opened quality pull requests across repositories',
        },
        {
          icon: Target,
          value: 'YOLO',
          label: 'GitHub Badge',
          description: 'Successfully merged pull requests without review',
        },
      ]
    : achievements;

  return (
    <AnimationWrapper>
      <section id='achievements' className='w-full py-16 px-6 sm:px-24'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-2xl sm:text-3xl font-clashDisplayRegular mb-2'>
            <span className='inline-block bg-gradient-to-r from-[#47e7b6] to-[#099f72] text-transparent bg-clip-text'>
              Achievements & Milestones
            </span>
          </h2>
          <p className='text-foreground/60 mb-8 max-w-3xl'>
            A snapshot of my journey — from open-source contributions to building real-world
            products and growing a developer community.
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {dynamicAchievements.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className='group relative p-6 rounded-xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-sm hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300'
                >
                  <div className='flex items-start gap-4'>
                    <div className='p-2 rounded-lg bg-[#047856]/20 text-[#06a475] group-hover:bg-[#047856]/30 transition-colors'>
                      <Icon className='w-6 h-6' />
                    </div>
                    <div>
                      <div className='text-2xl font-clashDisplayBold text-foreground'>
                        {item.value}
                      </div>
                      <div className='text-sm font-medium text-foreground/80'>{item.label}</div>
                      <p className='text-xs text-foreground/50 mt-1'>{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
}
