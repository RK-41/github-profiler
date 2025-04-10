import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { GitHubRepo } from '@/types'

interface RepositoriesListProps {
  repositories: GitHubRepo[]
}

export function RepositoriesList({ repositories }: RepositoriesListProps) {
  return (
    <div className="grid gap-4">
      <h3 className="text-xl font-semibold">Repositories</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repositories.map((repo) => (
          <Card key={repo.id} className="w-full">
            <CardHeader>
              <CardTitle>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500"
                >
                  {repo.name}
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">{repo.description}</p>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <span>⭐</span>
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>🔀</span>
                  <span>{repo.forks_count}</span>
                </div>
                {repo.language && (
                  <div className="flex items-center gap-1">
                    <span>📝</span>
                    <span>{repo.language}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 