import { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import '@/styles/CommitsHeatmap.css';
import { Tooltip } from 'react-tooltip';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ContributionWeek } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CommitData {
  date: string;
  count: number;
}

interface CommitsHeatmapProps {
  username: string;
}

interface HeatmapValue {
  date: string;
  count: number;
}

export function CommitsHeatmap({ username }: CommitsHeatmapProps) {
  const [commitData, setCommitData] = useState<CommitData[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalContributions, setTotalContributions] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Generate available years (from current year back to 2008 when GitHub started)
  const currentYear = new Date().getFullYear();
  const availableYears = Array.from(
    { length: currentYear - 2007 },
    (_, i) => currentYear - i
  );

  useEffect(() => {
    const fetchContributionData = async () => {
      if (!username) return;

      const token = import.meta.env.VITE_GITHUB_TOKEN;
      if (!token) {
        setError('GitHub token is not configured. Please add VITE_GITHUB_TOKEN to your .env file.');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const query = `
          query($username: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $username) {
              contributionsCollection(from: $from, to: $to) {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }
        `;

        // Set date range for the selected year
        const fromDate = new Date(selectedYear, 0, 1).toISOString(); // January 1st
        const toDate = new Date(selectedYear, 11, 31).toISOString(); // December 31st

        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: {
              username,
              from: fromDate,
              to: toDate
            },
          }),
        });

        const data = await response.json();

        if (data.errors) {
          throw new Error(data.errors[0]?.message || 'GitHub API error');
        }

        if (!data.data?.user) {
          throw new Error('User not found or API token missing/invalid');
        }

        const calendar = data.data.user.contributionsCollection.contributionCalendar;

        const contributions = calendar.weeks.flatMap((week: ContributionWeek) =>
          week.contributionDays.map(day => ({
            date: day.date,
            count: day.contributionCount,
          }))
        );

        setCommitData(contributions);
        setTotalContributions(calendar.totalContributions);
      } catch (error) {
        console.error('Error fetching contribution data:', error);
        if (error instanceof Error && error.message.includes('API token')) {
          setError('Invalid GitHub token. Please check your VITE_GITHUB_TOKEN in .env file.');
        } else {
          setError(error instanceof Error ? error.message : 'Failed to fetch contribution data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContributionData();
  }, [username, selectedYear]);

  // Get date range for the selected year
  const startDate = new Date(selectedYear, 0, 1);
  const endDate = new Date(selectedYear, 11, 31);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Contribution Activity</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-normal text-gray-500">
              {totalContributions.toLocaleString()} contributions in
            </span>

            <Select
              value={selectedYear.toString()}
              onValueChange={(value) => setSelectedYear(parseInt(value))}
            >
              <SelectTrigger className="w-[100px] cursor-pointer">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {availableYears.reverse().map((year) => (
                  <SelectItem
                    key={year}
                    value={year.toString()}
                    className='cursor-pointer'
                  >
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">Loading contribution data...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : (
          <>
            <CalendarHeatmap
              startDate={startDate}
              endDate={endDate}
              values={commitData}
              classForValue={(value: HeatmapValue | null) => {
                if (!value) return 'color-empty';
                const count = value.count;
                if (count > 10) return 'color-scale-4';
                if (count > 7) return 'color-scale-3';
                if (count > 4) return 'color-scale-2';
                if (count > 0) return 'color-scale-1';
                return 'color-empty';
              }}
              tooltipDataAttrs={(value: HeatmapValue | null) => {
                if (!value || !value.date) return null;
                return {
                  'data-tooltip-id': 'commit-tooltip',
                  'data-tooltip-content': `${value.date}: ${value.count} contributions`,
                };
              }}
            />
            <Tooltip id="commit-tooltip" />
          </>
        )}
      </CardContent>
    </Card>
  );
} 
