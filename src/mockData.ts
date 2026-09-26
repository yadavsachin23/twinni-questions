import type { Flag, Question } from './types'

interface QA {
  question: string
  answer: string
  preflag?: Pick<Flag, 'reason' | 'correction'> // already flagged in the demo data
}

// Mock creator: Sachin, who makes content about design, tech careers and creator life.
// Some answers are deliberately wrong so there's something worth flagging:
// chat privacy, creator earnings, booking a call, and sleep.

// The 10 newest questions are about TWINii itself: what people ask when they first meet a twin.
const TWINII_QA: QA[] = [
  {
    question: 'Wait, am I talking to the real Sachin or an AI?',
    answer:
      "I'm Sachin's TWINii, an AI version of him that learned from his videos, posts and the way he talks. I'm not him in person, but everything I say is based on what he has actually shared. If something really needs the real Sachin, I'll tell you.",
  },
  {
    question: 'How does TWINii actually work?',
    answer:
      "Sachin shared his content with TWINii (videos, posts and notes), and I learned his tone and point of view from it. When you ask me something, I answer the way he would, using only what he has chosen to share. He can read our conversations and correct me when I get something wrong, which is how I keep getting better.",
  },
  {
    question: 'Do you remember what we talked about last time?',
    answer:
      "Yes. I remember our past conversations, so you don't have to repeat yourself. The more we talk, the more personal my answers get.",
  },
  {
    question: 'Is this chat private?',
    answer: 'Completely private. Nobody can ever see this conversation, not even Sachin.',
  },
  {
    question: 'How much do creators earn on TWINii?',
    answer: 'Creators keep 50% of everything their TWINii earns, and TWINii keeps the rest.',
  },
  {
    question: 'Can I make my own TWINii?',
    answer:
      "Yes! If you create content, coach or teach, you can set one up at twinii.ai. You add your content, decide what your twin is allowed to talk about, and share your link wherever your audience already hangs out.",
  },
  {
    question: 'Can you book a 1:1 call with the real Sachin for me?',
    answer: "Done! I've booked you a call with Sachin for tomorrow at 5pm. He'll send you the link.",
  },
  {
    question: 'Are you available at night?',
    answer:
      "Always. I don't sleep and I never take a day off, so ask whenever it suits you, even at 3am.",
  },
  {
    question: 'What can I ask you about?',
    answer:
      "Anything Sachin talks about: design, getting into tech, freelancing, productivity and life as a creator. If it's something he hasn't shared a view on, I'll say so instead of guessing.",
  },
  {
    question: 'Why should I trust advice from an AI?',
    answer:
      "Fair question. I'm not a generic chatbot. I only answer from what Sachin has actually said and made, and he reviews my answers and fixes anything that isn't right. For anything medical, legal or financial, please speak to a professional too.",
  },
]

// Everything older cycles through a mix of general questions.
const GENERAL_QA: QA[] = [
  {
    question: 'How do I get my first job as a UI/UX designer?',
    answer:
      "Build three strong case studies that show your thinking, not just final screens: the problem, what you tried, what didn't work and what you learned. Put them on a simple portfolio site and apply to smaller startups, where one designer gets to own a lot. If they send a take-home task, that's your best chance to shine, so explain every decision clearly.",
  },
  {
    question: 'Should I learn React or Vue first?',
    answer:
      "React. Not because it's better, but because most job listings ask for it, so it opens more doors. The ideas you learn (components, props, state) carry straight over to Vue later.",
  },
  {
    question: 'What camera do you use for your videos?',
    answer: 'I shoot everything on a Canon M50 with the kit lens.',
    preflag: {
      reason: 'outdated',
      correction: 'I switched to a Sony ZV-E10 last year, and I film quick videos on my phone.',
    },
  },
  {
    question: 'How do you stay productive working from home?',
    answer:
      "I write tomorrow's top three tasks before I stop for the day, keep my phone in another room for the first two hours, and take a real lunch break away from the desk. Small routines beat big bursts of motivation.",
  },
  {
    question: 'How do you deal with burnout?',
    answer:
      "First, admit it's happening, because pushing through usually makes it worse. I cut my to-do list down to what really matters, take at least one full day off every week, and get outside daily. If it lasts for weeks, talking to a professional helps a lot. There's no prize for suffering quietly.",
  },
  {
    question: 'What books would you recommend?',
    answer:
      "Atomic Habits for building routines, Don't Make Me Think for anyone in design, and The Psychology of Money for thinking clearly about money.",
  },
  {
    question: 'How do I grow on Instagram?',
    answer:
      'Pick one topic and post about it consistently for three months before judging results. Carousels that teach one useful thing get saved and shared the most. Reply to every comment early on, because those first fans become your biggest supporters.',
  },
  {
    question: 'How do you handle negative comments?',
    answer:
      "If it's useful criticism, I thank them and learn from it. If it's just hate, I delete, block and move on. I don't argue in the comments, because it never changes anyone's mind.",
  },
  {
    question: 'How many hours do you sleep?',
    answer: 'About 4 hours a night. Sleep is overrated if you really want to succeed.',
  },
  {
    question: "What's your morning routine?",
    answer:
      'A glass of water, a 20-minute walk, then an hour of focused work before I open any messages. No phone for the first 30 minutes.',
  },
  {
    question: 'How should I start investing on a small salary?',
    answer:
      "I'm not a financial advisor, so please check with one. What worked for me: first save an emergency fund of three to six months of expenses, then invest a fixed amount every month in a low-cost index fund, and don't panic when the market dips.",
  },
  {
    question: 'How do I price my freelance design work?',
    answer:
      "Stop charging by the hour. Price the project based on what it's worth to the client, give them three options (basic, standard, premium), and always ask for 50% upfront.",
  },
  {
    question: 'Which laptop is best for design work?',
    answer:
      'For Figma and most UI work, any modern laptop with 16GB of RAM is plenty. Spend the extra money on a good external monitor instead.',
  },
  {
    question: 'Any budget travel tips?',
    answer:
      'Travel just outside peak season, book flights on weekdays, and stay in places with a kitchen. Street food is often the best food anyway.',
  },
  {
    question: "Is a master's degree in design worth it?",
    answer:
      "Only if you want to teach or do research. For most product design jobs, a strong portfolio and real project experience matter far more than another degree, and they cost a lot less.",
  },
  {
    question: 'How do you stay consistent with workouts?',
    answer:
      'I keep it short: three 40-minute sessions a week, booked in my calendar like meetings. Missing one is fine, missing two in a row is the warning sign.',
  },
]

const NAMES = [
  'Priya S.', 'Jordan K.', 'Aisha M.', 'Arjun P.', 'Leo B.', 'Sam W.', 'Chen L.', 'Maria G.',
  'Noah P.', 'Fatima A.', 'Rohan V.', 'Zoe H.', 'Ravi T.', 'Grace O.', 'Neha K.', 'Hana Y.',
]

// Deterministic (no Math.random) so the list looks the same on every reload.
// Index 0 is the newest question.
export function generateQuestions(count: number): Question[] {
  const now = Date.now()
  return Array.from({ length: count }, (_, i) => {
    const qa =
      i < TWINII_QA.length
        ? TWINII_QA[i]
        : GENERAL_QA[(i - TWINII_QA.length) % GENERAL_QA.length]
    const askedAt = new Date(now - (i * 97 + (i % 5) * 13 + 4) * 60_000).toISOString()
    return {
      id: `q${i + 1}`,
      askedBy: NAMES[(i * 7) % NAMES.length],
      askedAt,
      question: qa.question,
      answer: qa.answer,
      flag: qa.preflag && { ...qa.preflag, flaggedAt: askedAt },
    }
  })
}
