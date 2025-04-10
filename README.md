# GitHub Profile Analyzer

A modern web application that provides detailed insights into GitHub user profiles. View repositories, contribution history, and user statistics in a clean, responsive interface.

![GitHub Profile Analyzer Screenshot]
_Add a screenshot of your application here_

## Features

- 🔍 Instant GitHub user profile search
- 📊 Interactive contribution heatmap with year selection
- 📚 Repository listing with stars and fork counts
- 📱 Fully responsive design
- 🎨 Modern UI with smooth interactions

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Components**: ShadcnUI
- **Styling**: Tailwind CSS
- **Data Visualization**: React Calendar Heatmap
- **API Integration**: GitHub REST & GraphQL APIs

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A GitHub Personal Access Token ([Create one here](https://github.com/settings/tokens))
  - Required scope: `read:user`

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/github-profile-analyzer.git
   cd github-profile-analyzer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   VITE_GITHUB_TOKEN=your_github_token_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository

2. Visit [Vercel](https://vercel.com) and import your repository

3. Add the environment variable:

   - Name: `VITE_GITHUB_TOKEN`
   - Value: Your GitHub Personal Access Token

4. Deploy!

### Deploying to Netlify

1. Push your code to a GitHub repository

2. Visit [Netlify](https://netlify.com) and import your repository

3. Configure the build settings:

   - Build command: `npm run build`
   - Publish directory: `dist`

4. Add the environment variable in Site settings > Build & deploy > Environment:
   - Name: `VITE_GITHUB_TOKEN`
   - Value: Your GitHub Personal Access Token

### Manual Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. The `dist` folder will contain the built application

3. Deploy the contents of `dist` to any static hosting service

## Development

- Run development server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`
- Lint code: `npm run lint`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CommitsHeatmap.tsx
│   ├── RepositoriesList.tsx
│   └── UserProfile.tsx
├── types/              # TypeScript interfaces
├── styles/            # Global styles and CSS modules
└── pages/             # Page components
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [ShadcnUI](https://ui.shadcn.com/) for the beautiful UI components
- [React Calendar Heatmap](https://github.com/kevinsqi/react-calendar-heatmap) for the contribution visualization
- GitHub API for providing the data

---

Built with ❤️ using React and TypeScript
