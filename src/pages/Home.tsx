import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { UserData } from '@/types'
import { CommitsHeatmap } from '@/components/CommitsHeatmap'
import { RepositoriesList } from '@/components/RepositoriesList'
import { UserProfile } from '@/components/UserProfile'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function Home() {
  const [username, setUsername] = useState('RK-41')
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchGitHubData = async () => {
    if (!username) {
      setError('Please enter a GitHub username')
      return
    }

    setLoading(true)
    setError(null)
    setUserData(null)

    try {
      // Fetch basic user info
      const userResponse = await fetch(`https://api.github.com/users/${username}`)
      if (!userResponse.ok) {
        if (userResponse.status === 404) {
          throw new Error('User not found. Please check the username and try again.')
        }
        if (userResponse.status === 403) {
          throw new Error('API rate limit exceeded. Please try again later.')
        }
        throw new Error(`GitHub API error: ${userResponse.statusText}`)
      }
      const userData = await userResponse.json()

      // Fetch repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
      if (!reposResponse.ok) {
        throw new Error('Failed to fetch repositories. Please try again.')
      }
      const reposData = await reposResponse.json()

      setUserData({ ...userData, repositories: reposData })
    } catch (error) {
      console.error('Error fetching GitHub data:', error)
      setError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">GitHub Profile Analyzer</h1>

      <div className="flex gap-2 max-w-md mx-auto mb-8">
        <Input
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            setError(null) // Clear error when user types
          }}
          onKeyPress={(e) => e.key === 'Enter' && fetchGitHubData()}
          className={error ? 'border-red-500' : ''}
        />
        <Button
          onClick={fetchGitHubData}
          disabled={loading}
          className='cursor-pointer'
        >
          {loading ? 'Loading...' : 'Analyze'}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="max-w-md mx-auto mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {userData && (
        <div className="grid gap-6">
          <UserProfile user={userData} />
          <CommitsHeatmap username={userData.login} />
          <Card>
            <CardContent className="grid gap-6">
              <RepositoriesList repositories={userData.repositories} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 