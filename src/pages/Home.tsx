import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { UserData } from '@/types'
import { CommitsHeatmap } from '@/components/CommitsHeatmap'
import { RepositoriesList } from '@/components/RepositoriesList'
import { UserProfile } from '@/components/UserProfile'

export default function Home() {
  const [username, setUsername] = useState('RK-41')
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchGitHubData = async () => {
    if (!username) return

    setLoading(true)
    try {
      // Fetch basic user info
      const userResponse = await fetch(`https://api.github.com/users/${username}`)
      const userData = await userResponse.json()

      // Fetch repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
      const reposData = await reposResponse.json()

      setUserData({ ...userData, repositories: reposData })
    } catch (error) {
      console.error('Error fetching GitHub data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-8">GitHub Profile Analyzer</h1>

      <div className="flex gap-2 max-w-md mx-auto mb-8">
        <Input
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && fetchGitHubData()}
        />
        <Button onClick={fetchGitHubData} disabled={loading} className='cursor-pointer'>
          {loading ? 'Loading...' : 'Analyze'}
        </Button>
      </div>

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