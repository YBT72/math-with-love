# MWL - Math With Love

## Project Structure
- /frontend - Next.js 14, TypeScript, Tailwind CSS
- /backend - Python FastAPI
- /backend/venv - Python virtual environment (not in git)
- /_old - Legacy visualizations (reference only)

## Tech Stack
- Frontend: Next.js 14, TypeScript, Tailwind, React Three Fiber, KaTeX
- Backend: Python 3.12, FastAPI, Uvicorn
- Database: Supabase (PostgreSQL)
- Auth: Supabase Auth
- Hosting: Vercel (frontend), Railway (backend)

## Three.js Coordinate System
- Math system: X=East, Y=Up, Z=South
- Conversion to Three.js: threeAngle = (azimuthDeg + 60) * (Math.PI / 180)
- ALWAYS store data in math coordinates
- ONLY convert to Three.js for rendering

## Development
- Frontend: cd frontend && npm run dev (runs on localhost:3000)
- Backend: cd backend && source venv/bin/activate && uvicorn main:app --reload (runs on localhost:8000)

## Code Rules
- All comments in English
- TypeScript strict mode
- No any types
- Russian UI strings go in /frontend/locales/ru.json
- Hebrew UI strings go in /frontend/locales/he.json

## Professor Yosi (Mascot)
Cartoon professor character — MWL guide and logo.
Assets location: `frontend/public/professor/`
- `yosi-present.png` — default, presenting vector arrow
- `yosi-happy.png` — correct answer reaction
- `yosi-thinking.png` — new problem / loading
- `yosi-encourage.png` — wrong answer, keep trying
- `yosi-icon.png` — head only, for avatar/favicon
Color palette derived from character: teal (#22D3EE), amber (#FBBF24)