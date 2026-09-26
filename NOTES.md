# Notes on the decisions I made

## The main job
A creator opens this screen to check what their TWINii has been telling people, and to catch anything wrong. Each question is shown **as a chat**: the audience question on the left, and the TWINii's reply on the right, labelled "Your TWINii". That's how the audience saw it, so it's the quickest way for the creator to judge whether the reply sounds like them. **Flag answer** is on every card.

## Look and feel
- A dark hero sums up the page at a glance: total questions, this week, and how many are flagged.
- The "twin" idea runs through the design: the logo, the two glows in the hero, and the empty-state art are all two overlapping circles.
- Plus Jakarta Sans for the interface, with Instrument Serif italics for a bit of personality in headings. Violet stands for the TWINii and red/pink for flags, so a flagged card stands out when scanning a long list.
- On phones, the flag popup turns into a bottom sheet.

## 5, 500, or none
- **5 questions:** a plain list of cards with nothing hidden.
- **500 questions:** search, an All / Flagged filter, and newest/oldest sort. The list is split into pages, with a "Show 10 / 25 / 50 per page" picker and "Showing 1–10 of 500" on the left, and page numbers on the right (1 … 4 5 6 … 50), so the creator always knows where they are and can jump anywhere. Changing the page size keeps the question they were looking at on screen. Changing search, filter or sort goes back to page 1. The toolbar sticks to the top while scrolling. Long answers collapse to three lines, and "Read full answer" only appears when text is actually cut off at the current screen width.
- **None yet:** the empty state explains what will appear here and gives one action, copying the TWINii link. Sharing the link is the only way to get questions, so that's the only useful next step.
- There are also "no matches" (with a Clear search button) and "nothing flagged" states, so the page is never just blank.

## Finding the answer they're worried about
A creator usually remembers a topic ("that answer about creator earnings"), not a date, so search is the main tool. It looks through questions, answers and asker names, and highlights every match. If the match is inside a collapsed answer, the answer opens automatically so the match isn't hidden.

## Flagging
- **Flag answer** opens a popup that repeats the question and the TWINii's answer, so the creator can see exactly what they're correcting while they write.
- They pick a **reason** (one tap) and can add a **correction** ("What should your TWINii have said?"). The correction is optional so flagging stays quick when scanning lots of answers.
- **After saving:** a toast confirms it with an **Undo** button, and the card turns red with a reason badge and shows the correction. The flag can be edited or removed later. If there's no correction, the card asks for one, because a correction is what actually lets the TWINii improve.
- The **Flagged** tab doubles as a to-do list of answers that need attention.
- I assumed flags and corrections feed back into the TWINii, and the copy says so. I'd check with the team what really happens after a flag before shipping that wording.

## Technical choices
- React + TypeScript with Vite, and plain CSS with no UI library, to keep it small and easy to change live.
- The popup is the browser's native `<dialog>`, so the backdrop, keeping focus inside the popup, and closing with Escape all come built in, with no extra library.
- All data state lives in `App.tsx`. Filtering, search and sorting are worked out on each render, which is instant for 500 items.
- The mock data is deterministic, so the list looks the same on every reload. The dashed **Demo** switch is only there so reviewers can move between 500, 5 and 0 questions.
- Accessibility basics: real form controls with labels, `aria-pressed` on the filter tabs, visible focus rings, a `role="status"` toast, and animations switched off for people who prefer reduced motion.

## What I'd do with more time
- **Real API:** server-side search and paging, and instant flag updates that roll back if the save fails.
- **A "Reviewed / looks good" state**, so creators can track what they've checked, not only what's wrong.
- **Put likely problems first:** group repeated questions (the same wrong answer given 40 times matters more than a one-off), and show a confidence signal if the model provides one.
- **Context:** open the full conversation behind a question.
- **Tell the creator when a correction has been applied** to their TWINii, so the loop feels closed.
- Date-range filter, bulk flagging, and keeping search and filters in the URL so a view can be shared or bookmarked.
- A dark mode, tests for filtering and the flag flow (React Testing Library), and a proper screen-reader pass.
