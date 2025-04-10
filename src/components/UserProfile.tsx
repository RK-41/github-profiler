import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
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
    <div className="text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-gray-500">{label}</p>
    </div>
  )
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-2xl">{user.name || user.login}</h2>
            <p className="text-gray-500">@{user.login}</p>
            {user.html_url && (
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline"
              >
                View GitHub Profile
              </a>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <StatItem value={user.public_repos} label="Repositories" />
          <StatItem value={user.followers} label="Followers" />
          <StatItem value={user.following} label="Following" />
        </div>
      </CardContent>
    </Card>
  )
} 