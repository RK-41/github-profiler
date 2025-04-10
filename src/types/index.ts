export interface GitHubUser {
	login: string;
	name: string | null;
	avatar_url: string;
	public_repos: number;
	followers: number;
	following: number;
	html_url: string;
}

export interface GitHubRepo {
	id: number;
	name: string;
	description: string | null;
	html_url: string;
	stargazers_count: number;
	forks_count: number;
	language: string | null;
}

export interface UserData extends GitHubUser {
	repositories: GitHubRepo[];
}

export interface GitHubEventPayload {
	size: number;
}

export interface GitHubEvent {
	type: string;
	created_at: string;
	payload: GitHubEventPayload;
}

export interface ContributionDay {
	contributionCount: number;
	date: string;
}

export interface ContributionWeek {
	contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
	totalContributions: number;
	weeks: ContributionWeek[];
}

export interface ContributionsCollection {
	contributionCalendar: ContributionCalendar;
}

export interface GitHubGraphQLResponse {
	data?: {
		user?: {
			contributionsCollection: ContributionsCollection;
		};
	};
}
