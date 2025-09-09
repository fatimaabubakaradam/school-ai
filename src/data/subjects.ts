export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Topic {
  id: number;
  title: string;
  description: string;
  notes: string;
  questions: Question[];
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  textColor: string;
  description: string;
  icon: string;
  difficulty: string;
  topics: Topic[];
}

// Mathematics questions
const mathQuestions: Question[] = [
  {
    id: 1,
    question: 'What is the value of x in the equation 2x + 5 = 15?',
    options: ['x = 5', 'x = 10', 'x = 7.5', 'x = 2.5'],
    correctAnswer: 0,
    explanation: 'To solve 2x + 5 = 15, subtract 5 from both sides: 2x = 10, then divide by 2: x = 5.'
  },
  {
    id: 2,
    question: 'What is the area of a rectangle with length 8 cm and width 5 cm?',
    options: ['40 cm²', '26 cm²', '13 cm²', '80 cm²'],
    correctAnswer: 0,
    explanation: 'Area of rectangle = length × width = 8 × 5 = 40 cm².'
  },
  {
    id: 3,
    question: 'Simplify: 3² + 4² = ?',
    options: ['25', '49', '14', '7'],
    correctAnswer: 0,
    explanation: '3² + 4² = 9 + 16 = 25. This follows the Pythagorean theorem pattern.'
  },
  {
    id: 4,
    question: 'What is 15% of 200?',
    options: ['30', '25', '35', '20'],
    correctAnswer: 0,
    explanation: '15% of 200 = (15/100) × 200 = 0.15 × 200 = 30.'
  },
  {
    id: 5,
    question: 'If y = 2x + 3, what is y when x = 4?',
    options: ['11', '8', '9', '10'],
    correctAnswer: 0,
    explanation: 'Substitute x = 4 into y = 2x + 3: y = 2(4) + 3 = 8 + 3 = 11.'
  }
];

// English questions
const englishQuestions: Question[] = [
  {
    id: 1,
    question: 'Which of the following is a noun?',
    options: ['Beautiful', 'Happiness', 'Quickly', 'Running'],
    correctAnswer: 1,
    explanation: 'Happiness is a noun (a thing/concept). Beautiful is an adjective, quickly is an adverb, and running can be a verb or gerund.'
  },
  {
    id: 2,
    question: 'What is the past tense of "go"?',
    options: ['Goed', 'Went', 'Gone', 'Going'],
    correctAnswer: 1,
    explanation: 'The past tense of "go" is "went". "Gone" is the past participle, and "going" is the present participle.'
  },
  {
    id: 3,
    question: 'Which sentence is grammatically correct?',
    options: ['Me and John went to school', 'John and I went to school', 'John and me went to school', 'I and John went to school'],
    correctAnswer: 1,
    explanation: 'The correct form is "John and I went to school". Use "I" as the subject, not "me". Also, mention others before yourself.'
  },
  {
    id: 4,
    question: 'What is a metaphor?',
    options: ['A direct comparison using "like" or "as"', 'A direct comparison without "like" or "as"', 'An exaggeration', 'A sound effect'],
    correctAnswer: 1,
    explanation: 'A metaphor is a direct comparison without using "like" or "as". A simile uses "like" or "as", hyperbole is exaggeration, and onomatopoeia is sound effects.'
  },
  {
    id: 5,
    question: 'Which is the correct plural of "child"?',
    options: ['Childs', 'Children', 'Childes', 'Childs\''],
    correctAnswer: 1,
    explanation: '"Children" is the correct irregular plural of "child". Not all nouns follow the regular -s or -es pattern.'
  }
];

// Physics questions
const physicsQuestions: Question[] = [
  {
    id: 1,
    question: 'What is the unit of force?',
    options: ['Joule', 'Newton', 'Watt', 'Pascal'],
    correctAnswer: 1,
    explanation: 'Newton (N) is the SI unit of force. Joule is energy, Watt is power, and Pascal is pressure.'
  },
  {
    id: 2,
    question: 'What is the speed of light in vacuum?',
    options: ['3 × 10⁸ m/s', '3 × 10⁶ m/s', '3 × 10⁹ m/s', '3 × 10⁷ m/s'],
    correctAnswer: 0,
    explanation: 'The speed of light in vacuum is approximately 3 × 10⁸ meters per second (300,000 km/s).'
  },
  {
    id: 3,
    question: 'According to Newton\'s first law, an object at rest will:',
    options: ['Stay at rest unless acted upon by a force', 'Start moving on its own', 'Accelerate gradually', 'Change direction'],
    correctAnswer: 0,
    explanation: 'Newton\'s first law (law of inertia) states that an object at rest stays at rest unless acted upon by an external force.'
  },
  {
    id: 4,
    question: 'What type of energy does a moving car possess?',
    options: ['Potential energy', 'Kinetic energy', 'Chemical energy', 'Nuclear energy'],
    correctAnswer: 1,
    explanation: 'A moving car possesses kinetic energy, which is the energy of motion. KE = ½mv².'
  },
  {
    id: 5,
    question: 'What happens to the frequency of a wave if its wavelength increases?',
    options: ['Frequency decreases', 'Frequency increases', 'Frequency stays the same', 'Frequency doubles'],
    correctAnswer: 0,
    explanation: 'Frequency and wavelength are inversely related: f = c/λ. As wavelength increases, frequency decreases.'
  }
];

// Default questions for other subjects
const defaultQuestions: Question[] = [
  {
    id: 1,
    question: 'This is a sample question for this topic. What is the correct answer?',
    options: ['Option A - This is correct', 'Option B - This is incorrect', 'Option C - This is incorrect', 'Option D - This is incorrect'],
    correctAnswer: 0,
    explanation: 'Option A is correct because it demonstrates the proper understanding of the concept being tested.'
  },
  {
    id: 2,
    question: 'Which of the following best describes the main concept of this topic?',
    options: ['Incorrect description', 'Correct description of the main concept', 'Partially correct but incomplete', 'Completely wrong'],
    correctAnswer: 1,
    explanation: 'The second option correctly describes the main concept with all essential elements included.'
  },
  {
    id: 3,
    question: 'What is the most important principle to remember about this topic?',
    options: ['Secondary principle', 'Minor detail', 'The fundamental principle', 'An exception to the rule'],
    correctAnswer: 2,
    explanation: 'The fundamental principle is the most important concept that underlies all other aspects of this topic.'
  },
  {
    id: 4,
    question: 'How does this topic relate to real-world applications?',
    options: ['It has no practical use', 'It has limited applications', 'It has some applications', 'It has widespread practical applications'],
    correctAnswer: 3,
    explanation: 'This topic has widespread practical applications in many areas of daily life and professional fields.'
  },
  {
    id: 5,
    question: 'What should you focus on when studying this topic?',
    options: ['Memorizing facts only', 'Understanding concepts and applications', 'Just reading through once', 'Skipping difficult parts'],
    correctAnswer: 1,
    explanation: 'Understanding concepts and their applications is more valuable than just memorizing facts, as it leads to better retention and problem-solving ability.'
  }
];

const getQuestionsForSubject = (subjectId: string): Question[] => {
  switch (subjectId) {
    case 'mathematics':
    case 'further-mathematics':
      return mathQuestions;
    case 'english':
    case 'literature-in-english':
      return englishQuestions;
    case 'physics':
      return physicsQuestions;
    default:
      return defaultQuestions;
  }
};

const getNotesForTopic = (subjectId: string, topicTitle: string): string => {
  const notesMap: Record<string, Record<string, string>> = {
    mathematics: {
      'Algebra and Linear Equations': `
# Algebra and Linear Equations

## Key Concepts:
- **Variables**: Letters that represent unknown numbers (x, y, z)
- **Coefficients**: Numbers multiplied by variables (in 3x, the coefficient is 3)
- **Constants**: Numbers without variables

## Linear Equations:
A linear equation has the form: ax + b = c

### Steps to Solve:
1. **Isolate the variable term**: Move constants to one side
2. **Divide by the coefficient**: Get x by itself

### Example:
Solve: 2x + 5 = 15
- Step 1: 2x = 15 - 5 = 10
- Step 2: x = 10 ÷ 2 = 5

## Important Formulas:
- **Slope-intercept form**: y = mx + b
- **Point-slope form**: y - y₁ = m(x - x₁)
- **Standard form**: Ax + By = C

## Practice Tips:
- Always check your answer by substituting back
- Keep equations balanced (what you do to one side, do to the other)
- Work step by step, don't skip steps
      `,
      'Quadratic Equations': `
# Quadratic Equations

## Standard Form:
ax² + bx + c = 0 (where a ≠ 0)

## Methods to Solve:

### 1. Factoring
- Find two numbers that multiply to ac and add to b
- Factor and set each factor to zero

### 2. Quadratic Formula
x = (-b ± √(b² - 4ac)) / 2a

### 3. Completing the Square
- Make perfect square trinomial
- Take square root of both sides

## The Discriminant:
Δ = b² - 4ac
- If Δ > 0: Two real solutions
- If Δ = 0: One real solution
- If Δ < 0: No real solutions

## Graphing:
- Parabola opens up if a > 0, down if a < 0
- Vertex: x = -b/2a
- Axis of symmetry: x = -b/2a
      `
    },
    english: {
      'Grammar and Parts of Speech': `
# Grammar and Parts of Speech

## The 8 Parts of Speech:

### 1. Nouns
- **Person**: teacher, student, John
- **Place**: school, Nigeria, home
- **Thing**: book, car, happiness
- **Idea**: love, freedom, democracy

### 2. Pronouns
Replace nouns: I, you, he, she, it, we, they

### 3. Verbs
- **Action verbs**: run, jump, think
- **Linking verbs**: is, am, are, was, were
- **Helping verbs**: have, has, will, would

### 4. Adjectives
Describe nouns: big, beautiful, intelligent

### 5. Adverbs
Describe verbs, adjectives, or other adverbs: quickly, very, well

### 6. Prepositions
Show relationships: in, on, at, by, with, for

### 7. Conjunctions
Connect words/phrases: and, but, or, because, although

### 8. Interjections
Express emotion: Oh! Wow! Alas! Hurray!

## Grammar Rules:
- Subject-verb agreement
- Proper tense consistency
- Correct pronoun usage
      `,
      'Sentence Structure': `
# Sentence Structure

## Basic Sentence Elements:

### Subject
- Who or what the sentence is about
- Can be a noun or pronoun
- Example: **The student** reads every day.

### Predicate
- What the subject does or is
- Contains the verb
- Example: The student **reads every day**.

## Types of Sentences:

### 1. Simple Sentences
- One independent clause
- Example: "I love reading."

### 2. Compound Sentences
- Two independent clauses joined by conjunction
- Example: "I love reading, and I read every day."

### 3. Complex Sentences
- One independent + one dependent clause
- Example: "I love reading because it expands my mind."

### 4. Compound-Complex Sentences
- Two independent + one dependent clause
- Example: "I love reading because it's fun, and I read every day."

## Sentence Patterns:
1. Subject + Verb (S + V)
2. Subject + Verb + Object (S + V + O)
3. Subject + Verb + Complement (S + V + C)
4. Subject + Verb + Indirect Object + Direct Object (S + V + IO + DO)
      `
    },
    physics: {
      'Mechanics and Motion': `
# Mechanics and Motion

## Key Concepts:

### Distance vs Displacement
- **Distance**: Total path traveled (scalar)
- **Displacement**: Change in position (vector)

### Speed vs Velocity
- **Speed**: Distance/time (scalar)
- **Velocity**: Displacement/time (vector)

### Acceleration
- Rate of change of velocity
- a = (v - u)/t
- Units: m/s²

## Newton's Laws of Motion:

### First Law (Inertia)
An object at rest stays at rest, an object in motion stays in motion, unless acted upon by an external force.

### Second Law
F = ma
Force equals mass times acceleration

### Third Law
For every action, there is an equal and opposite reaction.

## Kinematic Equations:
1. v = u + at
2. s = ut + ½at²
3. v² = u² + 2as
4. s = (u + v)t/2

Where:
- u = initial velocity
- v = final velocity
- a = acceleration
- t = time
- s = displacement
      `,
      'Heat and Temperature': `
# Heat and Temperature

## Temperature vs Heat:

### Temperature
- Measure of average kinetic energy of particles
- Measured in Celsius (°C), Kelvin (K), Fahrenheit (°F)
- Intensive property (doesn't depend on amount)

### Heat
- Energy transferred due to temperature difference
- Measured in Joules (J) or calories (cal)
- Extensive property (depends on amount)

## Temperature Scales:
- **Celsius**: Water freezes at 0°C, boils at 100°C
- **Kelvin**: Absolute scale, 0 K = -273.15°C
- **Fahrenheit**: Water freezes at 32°F, boils at 212°F

## Conversion Formulas:
- C to K: K = C + 273.15
- C to F: F = (9/5)C + 32
- F to C: C = (5/9)(F - 32)

## Heat Transfer Methods:

### 1. Conduction
- Heat transfer through direct contact
- Common in solids
- Example: Metal spoon in hot soup

### 2. Convection
- Heat transfer through fluid movement
- Common in liquids and gases
- Example: Boiling water, wind

### 3. Radiation
- Heat transfer through electromagnetic waves
- Doesn't need a medium
- Example: Sun's heat reaching Earth
      `
    }
  };

  const subjectNotes = notesMap[subjectId];
  if (subjectNotes && subjectNotes[topicTitle]) {
    return subjectNotes[topicTitle];
  }

  // Default notes for topics without specific content
  return `
# ${topicTitle}

## Overview
This topic covers the fundamental concepts and principles of ${topicTitle.toLowerCase()}. Understanding these concepts is essential for mastering this subject area.

## Key Learning Objectives
By the end of this module, you should be able to:
- Understand the basic principles of ${topicTitle.toLowerCase()}
- Apply these concepts to solve problems
- Relate the concepts to real-world situations
- Demonstrate mastery through practice questions

## Important Concepts
- **Concept 1**: Foundation principle that underlies this topic
- **Concept 2**: Key relationship between different elements
- **Concept 3**: Practical applications and examples
- **Concept 4**: Common misconceptions to avoid

## Study Tips
1. **Read actively**: Take notes and ask questions
2. **Practice regularly**: Work through example problems
3. **Connect concepts**: Link new ideas to what you already know
4. **Test yourself**: Use the quiz feature to check understanding
5. **Review frequently**: Revisit difficult concepts

## Real-World Applications
This topic has many practical applications in:
- Daily life situations
- Professional careers
- Further academic study
- Problem-solving scenarios

## Next Steps
After mastering this topic, you'll be ready to:
- Move on to more advanced concepts
- Apply this knowledge in practical situations
- Build upon these foundations in related subjects
  `;
};

const additionalQuestions: Question[] = [
  {
    id: 6,
    question: 'Sample question 6 for this topic',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: 1,
    explanation: 'This is a sample explanation for the correct answer.'
  },
  {
    id: 7,
    question: 'Sample question 7 for this topic',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: 2,
    explanation: 'This is a sample explanation for the correct answer.'
  },
  {
    id: 8,
    question: 'Sample question 8 for this topic',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: 3,
    explanation: 'This is a sample explanation for the correct answer.'
  },
  {
    id: 9,
    question: 'Sample question 9 for this topic',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: 0,
    explanation: 'This is a sample explanation for the correct answer.'
  },
  {
    id: 10,
    question: 'Sample question 10 for this topic',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: 1,
    explanation: 'This is a sample explanation for the correct answer.'
  }
];

export const subjects: Subject[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    description: 'Master mathematical concepts and problem-solving techniques',
    icon: '🔢',
    difficulty: 'Intermediate',
    topics: [
      { id: 1, title: 'Algebra and Linear Equations', description: 'Solving equations and inequalities', notes: getNotesForTopic('mathematics', 'Algebra and Linear Equations'), questions: getQuestionsForSubject('mathematics') },
      { id: 2, title: 'Quadratic Equations', description: 'Solving quadratic equations using various methods', notes: getNotesForTopic('mathematics', 'Quadratic Equations'), questions: getQuestionsForSubject('mathematics') },
      { id: 3, title: 'Geometry and Mensuration', description: 'Areas, volumes, and geometric properties', notes: getNotesForTopic('mathematics', 'Geometry and Mensuration'), questions: getQuestionsForSubject('mathematics') },
      { id: 4, title: 'Trigonometry', description: 'Trigonometric ratios and identities', notes: getNotesForTopic('mathematics', 'Trigonometry'), questions: getQuestionsForSubject('mathematics') },
      { id: 5, title: 'Statistics and Probability', description: 'Data analysis and probability calculations', notes: getNotesForTopic('mathematics', 'Statistics and Probability'), questions: getQuestionsForSubject('mathematics') },
      { id: 6, title: 'Logarithms and Exponentials', description: 'Properties of logarithms and exponential functions', notes: getNotesForTopic('mathematics', 'Logarithms and Exponentials'), questions: getQuestionsForSubject('mathematics') },
      { id: 7, title: 'Sequences and Series', description: 'Arithmetic and geometric progressions', notes: getNotesForTopic('mathematics', 'Sequences and Series'), questions: getQuestionsForSubject('mathematics') },
      { id: 8, title: 'Coordinate Geometry', description: 'Points, lines, and curves in coordinate plane', notes: getNotesForTopic('mathematics', 'Coordinate Geometry'), questions: getQuestionsForSubject('mathematics') },
      { id: 9, title: 'Calculus Fundamentals', description: 'Basic differentiation and integration', notes: getNotesForTopic('mathematics', 'Calculus Fundamentals'), questions: getQuestionsForSubject('mathematics') }
    ]
  },
  {
    id: 'english',
    name: 'English Language',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    description: 'Develop strong communication and literary skills',
    icon: '📝',
    difficulty: 'Beginner',
    topics: [
      { id: 1, title: 'Grammar and Parts of Speech', description: 'Understanding word types and functions', notes: getNotesForTopic('english', 'Grammar and Parts of Speech'), questions: getQuestionsForSubject('english') },
      { id: 2, title: 'Sentence Structure', description: 'Building and analyzing sentences', notes: getNotesForTopic('english', 'Sentence Structure'), questions: getQuestionsForSubject('english') },
      { id: 3, title: 'Vocabulary Development', description: 'Building vocabulary and word usage', notes: getNotesForTopic('english', 'Vocabulary Development'), questions: getQuestionsForSubject('english') },
      { id: 4, title: 'Reading Comprehension', description: 'Understanding and analyzing texts', notes: getNotesForTopic('english', 'Reading Comprehension'), questions: getQuestionsForSubject('english') },
      { id: 5, title: 'Writing Skills', description: 'Essay writing and composition', notes: getNotesForTopic('english', 'Writing Skills'), questions: getQuestionsForSubject('english') },
      { id: 6, title: 'Punctuation and Mechanics', description: 'Proper punctuation and writing conventions', notes: getNotesForTopic('english', 'Punctuation and Mechanics'), questions: getQuestionsForSubject('english') },
      { id: 7, title: 'Literature Analysis', description: 'Understanding literary devices and themes', notes: getNotesForTopic('english', 'Literature Analysis'), questions: getQuestionsForSubject('english') },
      { id: 8, title: 'Oral Communication', description: 'Speaking and presentation skills', notes: getNotesForTopic('english', 'Oral Communication'), questions: getQuestionsForSubject('english') },
      { id: 9, title: 'Language Varieties', description: 'Formal vs informal language usage', notes: getNotesForTopic('english', 'Language Varieties'), questions: getQuestionsForSubject('english') }
    ]
  },
  {
    id: 'physics',
    name: 'Physics',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    description: 'Explore the fundamental laws of nature',
    icon: '⚡',
    difficulty: 'Advanced',
    topics: [
      { id: 1, title: 'Mechanics and Motion', description: 'Forces, motion, and mechanical systems', notes: getNotesForTopic('physics', 'Mechanics and Motion'), questions: getQuestionsForSubject('physics') },
      { id: 2, title: 'Heat and Temperature', description: 'Thermal physics and heat transfer', notes: getNotesForTopic('physics', 'Heat and Temperature'), questions: getQuestionsForSubject('physics') },
      { id: 3, title: 'Light and Optics', description: 'Behavior of light and optical instruments', notes: getNotesForTopic('physics', 'Light and Optics'), questions: getQuestionsForSubject('physics') },
      { id: 4, title: 'Sound and Waves', description: 'Wave properties and sound phenomena', notes: getNotesForTopic('physics', 'Sound and Waves'), questions: getQuestionsForSubject('physics') },
      { id: 5, title: 'Electricity and Magnetism', description: 'Electric circuits and magnetic fields', notes: getNotesForTopic('physics', 'Electricity and Magnetism'), questions: getQuestionsForSubject('physics') },
      { id: 6, title: 'Atomic Physics', description: 'Atomic structure and radioactivity', notes: getNotesForTopic('physics', 'Atomic Physics'), questions: getQuestionsForSubject('physics') },
      { id: 7, title: 'Energy and Work', description: 'Forms of energy and conservation laws', notes: getNotesForTopic('physics', 'Energy and Work'), questions: getQuestionsForSubject('physics') },
      { id: 8, title: 'Pressure and Fluids', description: 'Fluid mechanics and pressure', notes: getNotesForTopic('physics', 'Pressure and Fluids'), questions: getQuestionsForSubject('physics') },
      { id: 9, title: 'Modern Physics', description: 'Quantum mechanics and relativity', notes: getNotesForTopic('physics', 'Modern Physics'), questions: getQuestionsForSubject('physics') }
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    description: 'Understand matter and chemical reactions',
    icon: '⚗️',
    difficulty: 'Intermediate',
    topics: [
      { id: 1, title: 'Atomic Structure', description: 'Structure of atoms and electron configuration', notes: getNotesForTopic('chemistry', 'Atomic Structure'), questions: getQuestionsForSubject('chemistry') },
      { id: 2, title: 'Chemical Bonding', description: 'Types of bonds and molecular structure', notes: getNotesForTopic('chemistry', 'Chemical Bonding'), questions: getQuestionsForSubject('chemistry') },
      { id: 3, title: 'Chemical Reactions', description: 'Types of reactions and balancing equations', notes: getNotesForTopic('chemistry', 'Chemical Reactions'), questions: getQuestionsForSubject('chemistry') },
      { id: 4, title: 'Acids, Bases, and pH', description: 'Properties of acids and bases', notes: getNotesForTopic('chemistry', 'Acids, Bases, and pH'), questions: getQuestionsForSubject('chemistry') },
      { id: 5, title: 'States of Matter', description: 'Solid, liquid, gas phases and transitions', notes: getNotesForTopic('chemistry', 'States of Matter'), questions: getQuestionsForSubject('chemistry') },
      { id: 6, title: 'Solutions and Concentration', description: 'Mixtures, solutions, and concentration calculations', notes: getNotesForTopic('chemistry', 'Solutions and Concentration'), questions: getQuestionsForSubject('chemistry') },
      { id: 7, title: 'Organic Chemistry', description: 'Carbon compounds and organic reactions', notes: getNotesForTopic('chemistry', 'Organic Chemistry'), questions: getQuestionsForSubject('chemistry') },
      { id: 8, title: 'Electrochemistry', description: 'Chemical reactions and electricity', notes: getNotesForTopic('chemistry', 'Electrochemistry'), questions: getQuestionsForSubject('chemistry') },
      { id: 9, title: 'Environmental Chemistry', description: 'Chemical processes in environment', notes: getNotesForTopic('chemistry', 'Environmental Chemistry'), questions: getQuestionsForSubject('chemistry') }
    ]
  },
  {
    id: 'biology',
    name: 'Biology',
    color: 'from-teal-500 to-green-500',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-700',
    description: 'Discover the world of living organisms',
    icon: '🧬',
    difficulty: 'Intermediate',
    topics: [
      { id: 1, title: 'Cell Biology', description: 'Structure and function of cells', notes: getNotesForTopic('biology', 'Cell Biology'), questions: getQuestionsForSubject('biology') },
      { id: 2, title: 'Genetics and Heredity', description: 'DNA, genes, and inheritance patterns', notes: getNotesForTopic('biology', 'Genetics and Heredity'), questions: getQuestionsForSubject('biology') },
      { id: 3, title: 'Evolution and Natural Selection', description: 'Theory of evolution and adaptation', notes: getNotesForTopic('biology', 'Evolution and Natural Selection'), questions: getQuestionsForSubject('biology') },
      { id: 4, title: 'Ecology and Environment', description: 'Ecosystems and environmental interactions', notes: getNotesForTopic('biology', 'Ecology and Environment'), questions: getQuestionsForSubject('biology') },
      { id: 5, title: 'Human Biology', description: 'Human body systems and physiology', notes: getNotesForTopic('biology', 'Human Biology'), questions: getQuestionsForSubject('biology') },
      { id: 6, title: 'Plant Biology', description: 'Plant structure and photosynthesis', notes: getNotesForTopic('biology', 'Plant Biology'), questions: getQuestionsForSubject('biology') },
      { id: 7, title: 'Microbiology', description: 'Bacteria, viruses, and microorganisms', notes: getNotesForTopic('biology', 'Microbiology'), questions: getQuestionsForSubject('biology') },
      { id: 8, title: 'Classification', description: 'Taxonomy and classification of organisms', notes: getNotesForTopic('biology', 'Classification'), questions: getQuestionsForSubject('biology') },
      { id: 9, title: 'Biotechnology', description: 'Modern applications of biology', notes: getNotesForTopic('biology', 'Biotechnology'), questions: getQuestionsForSubject('biology') }
    ]
  },
  {
    id: 'agricultural-science',
    name: 'Agricultural Science',
    color: 'from-amber-500 to-yellow-500',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    description: 'Master farming and agricultural practices',
    icon: '🌾',
    difficulty: 'Intermediate',
    topics: [
      { id: 1, title: 'Crop Production', description: 'Principles of crop cultivation', notes: getNotesForTopic('agricultural-science', 'Crop Production'), questions: getQuestionsForSubject('agricultural-science') },
      { id: 2, title: 'Soil Science', description: 'Soil composition and fertility', notes: getNotesForTopic('agricultural-science', 'Soil Science'), questions: getQuestionsForSubject('agricultural-science') },
      { id: 3, title: 'Animal Husbandry', description: 'Livestock management and care', notes: getNotesForTopic('agricultural-science', 'Animal Husbandry'), questions: getQuestionsForSubject('agricultural-science') },
      { id: 4, title: 'Farm Management', description: 'Planning and organizing farm operations', notes: getNotesForTopic('agricultural-science', 'Farm Management'), questions: getQuestionsForSubject('agricultural-science') },
      { id: 5, title: 'Plant Diseases and Pests', description: 'Disease and pest management', notes: getNotesForTopic('agricultural-science', 'Plant Diseases and Pests'), questions: getQuestionsForSubject('agricultural-science') },
      { id: 6, title: 'Agricultural Economics', description: 'Economic principles in agriculture', notes: getNotesForTopic('agricultural-science', 'Agricultural Economics'), questions: getQuestionsForSubject('agricultural-science') },
      { id: 7, title: 'Food Processing', description: 'Processing and preserving agricultural products', notes: getNotesForTopic('agricultural-science', 'Food Processing'), questions: getQuestionsForSubject('agricultural-science') },
      { id: 8, title: 'Sustainable Agriculture', description: 'Environmentally friendly farming practices', notes: getNotesForTopic('agricultural-science', 'Sustainable Agriculture'), questions: getQuestionsForSubject('agricultural-science') },
      { id: 9, title: 'Agricultural Technology', description: 'Modern farming technologies', notes: getNotesForTopic('agricultural-science', 'Agricultural Technology'), questions: getQuestionsForSubject('agricultural-science') }
    ]
  },
  {
    id: 'further-mathematics',
    name: 'Further Mathematics',
    color: 'from-indigo-500 to-blue-500',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    description: 'Advanced mathematical concepts and techniques',
    icon: '📐',
    difficulty: 'Advanced',
    topics: [
      { id: 1, title: 'Advanced Algebra', description: 'Complex algebraic operations', notes: getNotesForTopic('further-mathematics', 'Advanced Algebra'), questions: getQuestionsForSubject('further-mathematics') },
      { id: 2, title: 'Matrices and Determinants', description: 'Matrix operations and linear systems', notes: getNotesForTopic('further-mathematics', 'Matrices and Determinants'), questions: getQuestionsForSubject('further-mathematics') },
      { id: 3, title: 'Complex Numbers', description: 'Operations with complex numbers', notes: getNotesForTopic('further-mathematics', 'Complex Numbers'), questions: getQuestionsForSubject('further-mathematics') },
      { id: 4, title: 'Vectors', description: 'Vector operations and applications', notes: getNotesForTopic('further-mathematics', 'Vectors'), questions: getQuestionsForSubject('further-mathematics') },
      { id: 5, title: 'Differential Equations', description: 'Solving differential equations', notes: getNotesForTopic('further-mathematics', 'Differential Equations'), questions: getQuestionsForSubject('further-mathematics') },
      { id: 6, title: 'Advanced Calculus', description: 'Advanced differentiation and integration', notes: getNotesForTopic('further-mathematics', 'Advanced Calculus'), questions: getQuestionsForSubject('further-mathematics') },
      { id: 7, title: 'Statistics and Probability', description: 'Advanced statistical methods', notes: getNotesForTopic('further-mathematics', 'Statistics and Probability'), questions: getQuestionsForSubject('further-mathematics') },
      { id: 8, title: 'Mechanics', description: 'Mathematical modeling of motion', notes: getNotesForTopic('further-mathematics', 'Mechanics'), questions: getQuestionsForSubject('further-mathematics') },
      { id: 9, title: 'Discrete Mathematics', description: 'Combinatorics and graph theory', notes: getNotesForTopic('further-mathematics', 'Discrete Mathematics'), questions: getQuestionsForSubject('further-mathematics') }
    ]
  },
  {
    id: 'geography',
    name: 'Geography',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    description: 'Explore physical and human geography',
    icon: '🌍',
    difficulty: 'Intermediate',
    topics: [
      { id: 1, title: 'Physical Geography', description: 'Landforms, climate, and natural processes', notes: getNotesForTopic('geography', 'Physical Geography'), questions: getQuestionsForSubject('geography') },
      { id: 2, title: 'Human Geography', description: 'Population, settlements, and culture', notes: getNotesForTopic('geography', 'Human Geography'), questions: getQuestionsForSubject('geography') },
      { id: 3, title: 'Map Skills and GIS', description: 'Reading maps and geographic information systems', notes: getNotesForTopic('geography', 'Map Skills and GIS'), questions: getQuestionsForSubject('geography') },
      { id: 4, title: 'Climate and Weather', description: 'Weather patterns and climate zones', notes: getNotesForTopic('geography', 'Climate and Weather'), questions: getQuestionsForSubject('geography') },
      { id: 5, title: 'Economic Geography', description: 'Economic activities and development', notes: getNotesForTopic('geography', 'Economic Geography'), questions: getQuestionsForSubject('geography') },
      { id: 6, title: 'Environmental Geography', description: 'Environmental issues and conservation', notes: getNotesForTopic('geography', 'Environmental Geography'), questions: getQuestionsForSubject('geography') },
      { id: 7, title: 'Regional Geography', description: 'Geographic characteristics of world regions', notes: getNotesForTopic('geography', 'Regional Geography'), questions: getQuestionsForSubject('geography') },
      { id: 8, title: 'Urban Geography', description: 'Cities, urbanization, and planning', notes: getNotesForTopic('geography', 'Urban Geography'), questions: getQuestionsForSubject('geography') },
      { id: 9, title: 'Agricultural Geography', description: 'Farming systems and food production', notes: getNotesForTopic('geography', 'Agricultural Geography'), questions: getQuestionsForSubject('geography') }
    ]
  },
  {
    id: 'literature-in-english',
    name: 'Literature-in-English',
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-700',
    description: 'Analyze poetry, prose, and drama',
    icon: '📖',
    difficulty: 'Intermediate',
    topics: [
      { id: 1, title: 'Poetry Analysis', description: 'Understanding poetic devices and themes', notes: getNotesForTopic('literature-in-english', 'Poetry Analysis'), questions: getQuestionsForSubject('literature-in-english') },
      { id: 2, title: 'Prose and Fiction', description: 'Analyzing novels and short stories', notes: getNotesForTopic('literature-in-english', 'Prose and Fiction'), questions: getQuestionsForSubject('literature-in-english') },
      { id: 3, title: 'Drama and Theatre', description: 'Understanding plays and dramatic techniques', notes: getNotesForTopic('literature-in-english', 'Drama and Theatre'), questions: getQuestionsForSubject('literature-in-english') },
      { id: 4, title: 'Literary Criticism', description: 'Critical approaches to literature', notes: getNotesForTopic('literature-in-english', 'Literary Criticism'), questions: getQuestionsForSubject('literature-in-english') },
      { id: 5, title: 'African Literature', description: 'Works by African authors', notes: getNotesForTopic('literature-in-english', 'African Literature'), questions: getQuestionsForSubject('literature-in-english') },
      { id: 6, title: 'British Literature', description: 'Classic and modern British works', notes: getNotesForTopic('literature-in-english', 'British Literature'), questions: getQuestionsForSubject('literature-in-english') },
      { id: 7, title: 'American Literature', description: 'American literary traditions', notes: getNotesForTopic('literature-in-english', 'American Literature'), questions: getQuestionsForSubject('literature-in-english') },
      { id: 8, title: 'World Literature', description: 'Global literary perspectives', notes: getNotesForTopic('literature-in-english', 'World Literature'), questions: getQuestionsForSubject('literature-in-english') },
      { id: 9, title: 'Literary Movements', description: 'Major literary periods and movements', notes: getNotesForTopic('literature-in-english', 'Literary Movements'), questions: getQuestionsForSubject('literature-in-english') }
    ]
  },
  {
    id: 'government',
    name: 'Government',
    color: 'from-slate-500 to-gray-600',
    bgColor: 'bg-slate-50',
    textColor: 'text-slate-700',
    description: 'Understand political systems and governance',
    icon: '🏛️',
    difficulty: 'Intermediate',
    topics: [
      { id: 1, title: 'Political Systems', description: 'Types of government and political structures', notes: getNotesForTopic('government', 'Political Systems'), questions: getQuestionsForSubject('government') },
      { id: 2, title: 'Constitutional Law', description: 'Constitution and fundamental rights', notes: getNotesForTopic('government', 'Constitutional Law'), questions: getQuestionsForSubject('government') },
      { id: 3, title: 'Public Administration', description: 'Government operations and civil service', notes: getNotesForTopic('government', 'Public Administration'), questions: getQuestionsForSubject('government') },
      { id: 4, title: 'Political Parties', description: 'Party systems and electoral processes', notes: getNotesForTopic('government', 'Political Parties'), questions: getQuestionsForSubject('government') },
      { id: 5, title: 'International Relations', description: 'Global politics and diplomacy', notes: getNotesForTopic('government', 'International Relations'), questions: getQuestionsForSubject('government') },
      { id: 6, title: 'Federalism', description: 'Federal systems and state governments', notes: getNotesForTopic('government', 'Federalism'), questions: getQuestionsForSubject('government') },
      { id: 7, title: 'Rule of Law', description: 'Legal systems and justice', notes: getNotesForTopic('government', 'Rule of Law'), questions: getQuestionsForSubject('government') },
      { id: 8, title: 'Democracy and Governance', description: 'Democratic principles and practices', notes: getNotesForTopic('government', 'Democracy and Governance'), questions: getQuestionsForSubject('government') },
      { id: 9, title: 'Political Economy', description: 'Economics and politics intersection', notes: getNotesForTopic('government', 'Political Economy'), questions: getQuestionsForSubject('government') }
    ]
  },
  {
    id: 'history',
    name: 'History',
    color: 'from-amber-600 to-orange-600',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    description: 'Explore world and African history',
    icon: '📜',
    difficulty: 'Intermediate',
    topics: [
      { id: 1, title: 'Ancient Civilizations', description: 'Early human civilizations and empires', notes: getNotesForTopic('history', 'Ancient Civilizations'), questions: getQuestionsForSubject('history') },
      { id: 2, title: 'African History', description: 'Pre-colonial African societies and kingdoms', notes: getNotesForTopic('history', 'African History'), questions: getQuestionsForSubject('history') },
      { id: 3, title: 'Colonial Period', description: 'European colonization and its impacts', notes: getNotesForTopic('history', 'Colonial Period'), questions: getQuestionsForSubject('history') },
      { id: 4, title: 'Independence Movements', description: 'Struggles for independence in Africa', notes: getNotesForTopic('history', 'Independence Movements'), questions: getQuestionsForSubject('history') },
      { id: 5, title: 'World Wars', description: 'Global conflicts and their consequences', notes: getNotesForTopic('history', 'World Wars'), questions: getQuestionsForSubject('history') },
      { id: 6, title: 'Cold War Era', description: 'Post-war global tensions and politics', notes: getNotesForTopic('history', 'Cold War Era'), questions: getQuestionsForSubject('history') },
      { id: 7, title: 'Modern African History', description: 'Post-independence developments', notes: getNotesForTopic('history', 'Modern African History'), questions: getQuestionsForSubject('history') },
      { id: 8, title: 'Social Movements', description: 'Civil rights and social change', notes: getNotesForTopic('history', 'Social Movements'), questions: getQuestionsForSubject('history') },
      { id: 9, title: 'Contemporary History', description: 'Recent global developments', notes: getNotesForTopic('history', 'Contemporary History'), questions: getQuestionsForSubject('history') }
    ]
  },
  {
    id: 'irs',
    name: 'Islamic Religious Studies',
    color: 'from-emerald-600 to-green-600',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    description: 'Study Islamic principles and teachings',
    icon: '☪️',
    difficulty: 'Beginner',
    topics: [
      { id: 1, title: 'Quran and Tafsir', description: 'Understanding the Holy Quran', notes: getNotesForTopic('irs', 'Quran and Tafsir'), questions: getQuestionsForSubject('irs') },
      { id: 2, title: 'Hadith and Sunnah', description: 'Prophetic traditions and teachings', notes: getNotesForTopic('irs', 'Hadith and Sunnah'), questions: getQuestionsForSubject('irs') },
      { id: 3, title: 'Islamic Jurisprudence', description: 'Islamic law and legal principles', notes: getNotesForTopic('irs', 'Islamic Jurisprudence'), questions: getQuestionsForSubject('irs') },
      { id: 4, title: 'Islamic History', description: 'History of Islam and Muslim civilization', notes: getNotesForTopic('irs', 'Islamic History'), questions: getQuestionsForSubject('irs') },
      { id: 5, title: 'Islamic Ethics', description: 'Moral principles and values in Islam', notes: getNotesForTopic('irs', 'Islamic Ethics'), questions: getQuestionsForSubject('irs') },
      { id: 6, title: 'Worship and Rituals', description: 'Islamic practices and obligations', notes: getNotesForTopic('irs', 'Worship and Rituals'), questions: getQuestionsForSubject('irs') },
      { id: 7, title: 'Islamic Philosophy', description: 'Islamic thought and philosophy', notes: getNotesForTopic('irs', 'Islamic Philosophy'), questions: getQuestionsForSubject('irs') },
      { id: 8, title: 'Contemporary Issues', description: 'Modern challenges and Islamic responses', notes: getNotesForTopic('irs', 'Contemporary Issues'), questions: getQuestionsForSubject('irs') },
      { id: 9, title: 'Comparative Religion', description: 'Islam in relation to other faiths', notes: getNotesForTopic('irs', 'Comparative Religion'), questions: getQuestionsForSubject('irs') }
    ]
  },
  {
    id: 'crs',
    name: 'Christian Religious Studies',
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-50',
    textColor: 'text-violet-700',
    description: 'Study Christian principles and teachings',
    icon: '✝️',
    difficulty: 'Beginner',
    topics: [
      { id: 1, title: 'Biblical Studies', description: 'Old and New Testament studies', notes: getNotesForTopic('crs', 'Biblical Studies'), questions: getQuestionsForSubject('crs') },
      { id: 2, title: 'Christian Theology', description: 'Core Christian beliefs and doctrines', notes: getNotesForTopic('crs', 'Christian Theology'), questions: getQuestionsForSubject('crs') },
      { id: 3, title: 'Church History', description: 'Development of Christianity through ages', notes: getNotesForTopic('crs', 'Church History'), questions: getQuestionsForSubject('crs') },
      { id: 4, title: 'Christian Ethics', description: 'Moral principles and Christian living', notes: getNotesForTopic('crs', 'Christian Ethics'), questions: getQuestionsForSubject('crs') },
      { id: 5, title: 'Worship and Liturgy', description: 'Christian worship practices', notes: getNotesForTopic('crs', 'Worship and Liturgy'), questions: getQuestionsForSubject('crs') },
      { id: 6, title: 'Christian Mission', description: 'Evangelism and missionary work', notes: getNotesForTopic('crs', 'Christian Mission'), questions: getQuestionsForSubject('crs') },
      { id: 7, title: 'Christian Philosophy', description: 'Christian thought and worldview', notes: getNotesForTopic('crs', 'Christian Philosophy'), questions: getQuestionsForSubject('crs') },
      { id: 8, title: 'Contemporary Christianity', description: 'Modern Christian movements and issues', notes: getNotesForTopic('crs', 'Contemporary Christianity'), questions: getQuestionsForSubject('crs') },
      { id: 9, title: 'Comparative Religion', description: 'Christianity in relation to other faiths', notes: getNotesForTopic('crs', 'Comparative Religion'), questions: getQuestionsForSubject('crs') }
    ]
  },
  {
    id: 'accounting',
    name: 'Accounting',
    color: 'from-green-600 to-emerald-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    description: 'Master financial accounting principles',
    icon: '💰',
    difficulty: 'Intermediate',
    topics: [
      { id: 1, title: 'Introduction to Accounting', description: 'Basic accounting principles and concepts', notes: getNotesForTopic('accounting', 'Introduction to Accounting'), questions: getQuestionsForSubject('accounting') },
      { id: 2, title: 'Double Entry System', description: 'Recording transactions using double entry', notes: getNotesForTopic('accounting', 'Double Entry System'), questions: getQuestionsForSubject('accounting') },
      { id: 3, title: 'Financial Statements', description: 'Preparing and analyzing financial statements', notes: getNotesForTopic('accounting', 'Financial Statements'), questions: getQuestionsForSubject('accounting') },
      { id: 4, title: 'Cash and Banking', description: 'Cash management and bank reconciliation', notes: getNotesForTopic('accounting', 'Cash and Banking'), questions: getQuestionsForSubject('accounting') },
      { id: 5, title: 'Depreciation', description: 'Methods of calculating depreciation', notes: getNotesForTopic('accounting', 'Depreciation'), questions: getQuestionsForSubject('accounting') },
      { id: 6, title: 'Partnership Accounts', description: 'Accounting for partnerships', notes: getNotesForTopic('accounting', 'Partnership Accounts'), questions: getQuestionsForSubject('accounting') },
      { id: 7, title: 'Company Accounts', description: 'Corporate accounting and shares', notes: getNotesForTopic('accounting', 'Company Accounts'), questions: getQuestionsForSubject('accounting') },
      { id: 8, title: 'Cost Accounting', description: 'Costing methods and analysis', notes: getNotesForTopic('accounting', 'Cost Accounting'), questions: getQuestionsForSubject('accounting') },
      { id: 9, title: 'Management Accounting', description: 'Accounting for decision making', notes: getNotesForTopic('accounting', 'Management Accounting'), questions: getQuestionsForSubject('accounting') }
    ]
  },
  {
    id: 'commerce',
    name: 'Commerce',
    color: 'from-cyan-500 to-blue-500',
    bgColor: 'bg-cyan-50',
    textColor: 'text-cyan-700',
    description: 'Understand trade and business operations',
    icon: '🏪',
    difficulty: 'Beginner',
    topics: [
      { id: 1, title: 'Introduction to Commerce', description: 'Basic concepts of trade and commerce', notes: getNotesForTopic('commerce', 'Introduction to Commerce'), questions: getQuestionsForSubject('commerce') },
      { id: 2, title: 'Trade and Industry', description: 'Types of trade and industrial activities', notes: getNotesForTopic('commerce', 'Trade and Industry'), questions: getQuestionsForSubject('commerce') },
      { id: 3, title: 'Business Organizations', description: 'Forms of business ownership', notes: getNotesForTopic('commerce', 'Business Organizations'), questions: getQuestionsForSubject('commerce') },
      { id: 4, title: 'Marketing and Distribution', description: 'Marketing channels and distribution', notes: getNotesForTopic('commerce', 'Marketing and Distribution'), questions: getQuestionsForSubject('commerce') },
      { id: 5, title: 'Transportation', description: 'Modes of transport in commerce', notes: getNotesForTopic('commerce', 'Transportation'), questions: getQuestionsForSubject('commerce') },
      { id: 6, title: 'Communication', description: 'Business communication methods', notes: getNotesForTopic('commerce', 'Communication'), questions: getQuestionsForSubject('commerce') },
      { id: 7, title: 'Banking and Finance', description: 'Financial institutions and services', notes: getNotesForTopic('commerce', 'Banking and Finance'), questions: getQuestionsForSubject('commerce') },
      { id: 8, title: 'Insurance', description: 'Types and principles of insurance', notes: getNotesForTopic('commerce', 'Insurance'), questions: getQuestionsForSubject('commerce') },
      { id: 9, title: 'International Trade', description: 'Global trade and commerce', notes: getNotesForTopic('commerce', 'International Trade'), questions: getQuestionsForSubject('commerce') }
    ]
  },
  {
    id: 'economics',
    name: 'Economics',
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    description: 'Study economic principles and systems',
    icon: '📈',
    difficulty: 'Advanced',
    topics: [
      { id: 1, title: 'Introduction to Economics', description: 'Basic economic concepts and principles', notes: getNotesForTopic('economics', 'Introduction to Economics'), questions: getQuestionsForSubject('economics') },
      { id: 2, title: 'Demand and Supply', description: 'Market forces and price determination', notes: getNotesForTopic('economics', 'Demand and Supply'), questions: getQuestionsForSubject('economics') },
      { id: 3, title: 'Production and Costs', description: 'Theory of production and cost analysis', notes: getNotesForTopic('economics', 'Production and Costs'), questions: getQuestionsForSubject('economics') },
      { id: 4, title: 'Market Structures', description: 'Perfect competition, monopoly, oligopoly', notes: getNotesForTopic('economics', 'Market Structures'), questions: getQuestionsForSubject('economics') },
      { id: 5, title: 'National Income', description: 'GDP, GNP, and economic indicators', notes: getNotesForTopic('economics', 'National Income'), questions: getQuestionsForSubject('economics') },
      { id: 6, title: 'Money and Banking', description: 'Monetary system and financial institutions', notes: getNotesForTopic('economics', 'Money and Banking'), questions: getQuestionsForSubject('economics') },
      { id: 7, title: 'International Trade', description: 'Global trade theories and policies', notes: getNotesForTopic('economics', 'International Trade'), questions: getQuestionsForSubject('economics') },
      { id: 8, title: 'Economic Development', description: 'Growth, development, and planning', notes: getNotesForTopic('economics', 'Economic Development'), questions: getQuestionsForSubject('economics') },
      { id: 9, title: 'Public Finance', description: 'Government revenue, expenditure, and policy', notes: getNotesForTopic('economics', 'Public Finance'), questions: getQuestionsForSubject('economics') }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-700',
    description: 'Learn marketing principles and strategies',
    icon: '📢',
    difficulty: 'Beginner',
    topics: [
      { id: 1, title: 'Marketing Fundamentals', description: 'Basic marketing concepts and principles', notes: getNotesForTopic('marketing', 'Marketing Fundamentals'), questions: getQuestionsForSubject('marketing') },
      { id: 2, title: 'Consumer Behavior', description: 'Understanding consumer psychology', notes: getNotesForTopic('marketing', 'Consumer Behavior'), questions: getQuestionsForSubject('marketing') },
      { id: 3, title: 'Market Research', description: 'Research methods and data analysis', notes: getNotesForTopic('marketing', 'Market Research'), questions: getQuestionsForSubject('marketing') },
      { id: 4, title: 'Product Management', description: 'Product development and lifecycle', notes: getNotesForTopic('marketing', 'Product Management'), questions: getQuestionsForSubject('marketing') },
      { id: 5, title: 'Pricing Strategies', description: 'Pricing methods and strategies', notes: getNotesForTopic('marketing', 'Pricing Strategies'), questions: getQuestionsForSubject('marketing') },
      { id: 6, title: 'Promotion and Advertising', description: 'Promotional mix and advertising', notes: getNotesForTopic('marketing', 'Promotion and Advertising'), questions: getQuestionsForSubject('marketing') },
      { id: 7, title: 'Distribution Channels', description: 'Marketing channels and logistics', notes: getNotesForTopic('marketing', 'Distribution Channels'), questions: getQuestionsForSubject('marketing') },
      { id: 8, title: 'Digital Marketing', description: 'Online marketing and social media', notes: getNotesForTopic('marketing', 'Digital Marketing'), questions: getQuestionsForSubject('marketing') },
      { id: 9, title: 'Brand Management', description: 'Building and managing brands', notes: getNotesForTopic('marketing', 'Brand Management'), questions: getQuestionsForSubject('marketing') }
    ]
  }
];

export const getSubjectById = (id: string): Subject | undefined => {
  return subjects.find(subject => subject.id === id);
};

export const getTopicById = (subjectId: string, topicId: number): Topic | undefined => {
  const subject = getSubjectById(subjectId);
  return subject?.topics.find(topic => topic.id === topicId);
};