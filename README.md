# Chuck Norris Forever

A modern web app that displays random Chuck Norris quotes with a clean, centered interface, dark mode support, smooth hover interactions, and randomly loaded Chuck Norris images.

## Features

- Random quote on every page load
- Random Chuck Norris image loaded from local assets
- Copy quote action
- Dark and light mode toggle
- Responsive layout for desktop and mobile
- Minimal interface with subtle motion and hover controls

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- Radix UI Tooltip

## Getting Started

### Requirements

- [Bun](https://bun.sh/)

### Install dependencies

```bash
bun install
```

### Run in development

```bash
bun run dev
```

### Build for production

```bash
bun run build
```

### Preview the production build

```bash
bun run preview
```

## Project Structure

```text
src/
  components/
  data/
  lib/
  App.tsx
  main.tsx
public/
  images/
transcripts/
  frases-chuck-norris.txt
```

## Notes

- The app uses a consolidated local list of quotes stored in `transcripts/frases-chuck-norris.txt`.
- Chuck Norris images are loaded from the local `public/images` folder.

## Tribute

This project is a tribute to the actor Chuck Norris.
