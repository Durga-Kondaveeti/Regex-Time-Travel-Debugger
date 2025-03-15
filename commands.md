1. First create the project with vite:
```
# Create the project
npm create vite@latest regex-time-travel -- --template react-ts

# Navigate in
cd regex-time-travel

# Install dependencies
# regexpp: To parse the regex into an AST
# lucide-react: For UI icons (play, pause, step)
# clsx & tailwind-merge: For cleaner UI class logic
npm install regexpp lucide-react clsx tailwind-merge

# Install Tailwind CSS (Standard Vite setup)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. Got an error with tailwind
```
% npx tailwindcss init -p
npm error could not determine executable to run
npm error A complete log of this run can be found in: /Users/dk/.npm/_logs/2025-12-26T02_47_31_460Z-debug-0.log
```

3. Solved it with
```
# This command failed with npm error could not determine executable to run (npx couldn't pick an executable for the package version it chose).
npx tailwindcss init -p

#Succeeded Force npx to use Tailwind v3 and run the init command to generate the config files.
npx -y tailwindcss@3 init -p


npm install -D @tailwindcss/postcss
npm install -D tailwindcss postcss autoprefixer
kill $(lsof -t -i:5173) 2>/dev/null || true && npm run dev
```