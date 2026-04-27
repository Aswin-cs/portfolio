# Aswin's Interactive Portfolio

Welcome to my personal portfolio! This project is a highly interactive, 3D parallax web application built to showcase my skills, projects, and experience. It features immersive scrolling effects, physics-based animations, and a modern, responsive design.

## 🌟 Features

- **Immersive Parallax Layout**: Built with `@react-spring/parallax` to create depth and a multi-layered scrolling experience.
- **Physics-Based Animations**: Utilizes `react-spring` for smooth, natural-feeling animations, including hover effects, reveals, and carousels.
- **Custom UI Components**:
  - `BorderGlow`: Animated, glowing gradient borders for project cards.
  - `LogoLoop`: An infinite scrolling carousel for technology stack icons.
  - `SkillsTerminal`: A responsive, code-editor-style terminal showcasing technical skills.
  - `ProjectCards`: An auto-playing, interactive carousel highlighting key projects.
  - `GithubProfile`: A 3D-styled, floating call-to-action for collaboration.
- **Responsive Design**: Carefully crafted with `clamp()` and media queries to look stunning on both mobile devices and large desktop monitors.portfolio
- **Custom Silk Background**: A dynamic, animated background that sets a premium tone.

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Library**: [React](https://reactjs.org/)
- **Animations**: [`react-spring`](https://react-spring.dev/) & [`@react-spring/parallax`](https://react-spring.dev/docs/components/parallax)
- **Icons**: [FontAwesome](https://fontawesome.com/)
- **Styling**: Vanilla CSS (No heavy CSS frameworks, just pure custom styles!)
- **Typography**: 'Expletus Sans' via Google Fonts

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `app/page.js`: The main entry point containing the Parallax setup and layer orchestration.
- `app/globals.css`: Global styles, CSS variables, and typography settings.
- `app/Components/`: Contains all modular React components (e.g., `Backgrounds`, `ProjectCards`, `SkillsTerminal`, `GithubProfile`, `LogoLoop`).

## 🤝 Let's Collaborate

Feel free to reach out or check out my work on GitHub:
**GitHub**: [@Aswin-cs](https://github.com/Aswin-cs)

---

*This project is continuously evolving. Stay tuned for more updates!*
