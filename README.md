# TWINii: Audience questions

The screen where a creator sees what their audience asked their TWINii, and flags answers that came back wrong.

React + TypeScript (Vite), mock data, no backend. My decisions are in [NOTES.md](NOTES.md).

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:5173. Use the dashed **Demo** switch (top right) to switch between 500, 5 and 0 questions.

## Files

```
src/
  App.tsx           page: state, hero stats, search / filter / sort, empty states, undo toast
  QuestionCard.tsx  one question + answer as chat bubbles, flagged state, search highlighting
  FlagDialog.tsx    flag popup (native <dialog>): reason + optional correction
  Pagination.tsx    per-page picker (10/25/50), "Showing 1–10 of 500", page numbers
  icons.tsx         small inline SVG icons and the TWINii logo
  mockData.ts       fake questions (deterministic)
  types.ts          Question and Flag types
  index.css         all styles
```
