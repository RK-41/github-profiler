import { Card } from "@/components/ui/card"
import { GitHubUser } from '@/types'

interface UserProfileProps {
  user: GitHubUser
}

interface StatItemProps {
  value: number
  label: string
}

function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="text-center p-2">
      <p className="text-xl md:text-2xl font-bold">{value.toLocaleString()}</p>
      <p className="text-gray-500 text-sm md:text-base">{label}</p>
    </div>
  )
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row p-4 md:p-6 gap-6 md:gap-8">
        {/* Left side - Avatar */}
        <div className="flex justify-center md:block shrink-0">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-32 h-32 md:w-52 md:h-52 rounded-full border-4 border-gray-100 shadow-md"
          />
        </div>

        {/* Right side - User info and stats */}
        <div className="flex-1 text-center md:text-left">
          {/* User info */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-1">{user.name || user.login}</h2>
            <p className="text-gray-500 text-base md:text-lg mb-2">@{user.login}</p>
            {user.bio && (
              <p className="text-gray-600 mb-4 text-sm md:text-base">{user.bio}</p>
            )}
            {user.html_url && (
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline inline-flex items-center gap-1 justify-center md:justify-start"
              >
                <span>View GitHub Profile</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 md:gap-8 bg-gray-50 rounded-lg p-3 md:p-4">
            <StatItem value={user.public_repos} label="Repositories" />
            <StatItem value={user.followers} label="Followers" />
            <StatItem value={user.following} label="Following" />
          </div>

          {/* Additional Info */}
          <div className="mt-4 space-y-2 text-sm md:text-base">
            {user.location && (
              <div className="flex items-center gap-2 justify-center md:justify-start text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{user.location}</span>
              </div>
            )}
            {user.company && (
              <div className="flex items-center gap-2 justify-center md:justify-start text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>{user.company}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
} 