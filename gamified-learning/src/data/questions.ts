import { Subject } from '../components/GamifiedLearning';

export const subjects: Subject[] = [
  {
    id: 'math',
    name: 'Mathematics',
    lessons: [
      {
        id: 1,
        questions: [
          {
            concept: 'Addition of single-digit numbers',
            question: 'What is 5 + 3?',
            options: ['6', '7', '8', '9'],
            correctAnswer: 2,
          },
          {
            concept: 'Subtraction of single-digit numbers',
            question: 'What is 9 - 4?',
            options: ['3', '4', '5', '6'],
            correctAnswer: 2,
          },
          {
            concept: 'Counting by twos',
            question: 'What comes after 6 when counting by twos?',
            options: ['7', '8', '9', '10'],
            correctAnswer: 1,
          },
          {
            concept: 'Number patterns',
            question: 'What number comes next: 2, 4, 6, 8, __?',
            options: ['9', '10', '11', '12'],
            correctAnswer: 1,
          },
          {
            concept: 'Simple word problems',
            question: 'If you have 3 apples and get 2 more, how many do you have?',
            options: ['4', '5', '6', '7'],
            correctAnswer: 1,
          },
          {
            concept: 'Number comparison',
            question: 'Which number is greater: 7 or 9?',
            options: ['7', '9', 'They are equal', 'Cannot compare'],
            correctAnswer: 1,
          },
          {
            concept: 'Basic shapes',
            question: 'How many sides does a triangle have?',
            options: ['2', '3', '4', '5'],
            correctAnswer: 1,
          },
          {
            concept: 'Simple fractions',
            question: 'What is half of 8?',
            options: ['2', '3', '4', '5'],
            correctAnswer: 2,
          },
          {
            concept: 'Number sequences',
            question: 'What comes next: 1, 3, 5, 7, __?',
            options: ['8', '9', '10', '11'],
            correctAnswer: 1,
          },
          {
            concept: 'Basic measurement',
            question: 'Which is longer: a pencil or a ruler?',
            options: ['Pencil', 'Ruler', 'Same length', 'Cannot tell'],
            correctAnswer: 1,
          },
        ],
      },
      {
        id: 2,
        questions: [
          {
            concept: 'Addition with carrying',
            question: 'What is 15 + 7?',
            options: ['20', '21', '22', '23'],
            correctAnswer: 2,
          },
          {
            concept: 'Subtraction with borrowing',
            question: 'What is 13 - 5?',
            options: ['6', '7', '8', '9'],
            correctAnswer: 2,
          },
          {
            concept: 'Multiplication basics',
            question: 'What is 4 × 3?',
            options: ['10', '11', '12', '13'],
            correctAnswer: 2,
          },
          {
            concept: 'Division basics',
            question: 'What is 8 ÷ 2?',
            options: ['2', '3', '4', '5'],
            correctAnswer: 2,
          },
          {
            concept: 'Money counting',
            question: 'How many quarters make $1?',
            options: ['2', '3', '4', '5'],
            correctAnswer: 2,
          },
          {
            concept: 'Time telling',
            question: 'What time is it when the hour hand is on 3 and the minute hand is on 12?',
            options: ['3:00', '3:12', '12:03', '12:30'],
            correctAnswer: 0,
          },
          {
            concept: 'Place value',
            question: 'What is the value of 5 in 52?',
            options: ['5', '50', '500', '5000'],
            correctAnswer: 1,
          },
          {
            concept: 'Number patterns',
            question: 'What comes next: 5, 10, 15, 20, __?',
            options: ['22', '23', '24', '25'],
            correctAnswer: 3,
          },
          {
            concept: 'Word problems',
            question: 'If you have 4 bags with 3 marbles each, how many marbles do you have?',
            options: ['7', '10', '12', '15'],
            correctAnswer: 2,
          },
          {
            concept: 'Geometry basics',
            question: 'How many corners does a square have?',
            options: ['2', '3', '4', '5'],
            correctAnswer: 2,
          },
        ],
      },
    ],
  },
  {
    id: 'science',
    name: 'Science',
    lessons: [
      {
        id: 1,
        questions: [
          {
            concept: 'Basic plant parts',
            question: 'Which part of the plant takes in water from the soil?',
            options: ['Leaves', 'Stem', 'Roots', 'Flowers'],
            correctAnswer: 2,
          },
          {
            concept: 'Animal habitats',
            question: 'Where do fish live?',
            options: ['In trees', 'In water', 'In caves', 'In the sky'],
            correctAnswer: 1,
          },
          {
            concept: 'Weather basics',
            question: 'What do we use to measure temperature?',
            options: ['Ruler', 'Thermometer', 'Clock', 'Scale'],
            correctAnswer: 1,
          },
          {
            concept: 'Five senses',
            question: 'Which sense do we use to taste food?',
            options: ['Eyes', 'Ears', 'Nose', 'Tongue'],
            correctAnswer: 3,
          },
          {
            concept: 'Basic materials',
            question: 'Which of these is a liquid?',
            options: ['Rock', 'Water', 'Air', 'Wood'],
            correctAnswer: 1,
          },
          {
            concept: 'Simple machines',
            question: 'What do we use to cut paper?',
            options: ['Hammer', 'Screwdriver', 'Scissors', 'Pliers'],
            correctAnswer: 2,
          },
          {
            concept: 'Animal characteristics',
            question: 'Which animal has feathers?',
            options: ['Dog', 'Cat', 'Bird', 'Fish'],
            correctAnswer: 2,
          },
          {
            concept: 'Basic astronomy',
            question: 'What do we see in the sky at night?',
            options: ['Clouds', 'Stars', 'Rainbows', 'Rain'],
            correctAnswer: 1,
          },
          {
            concept: 'Human body',
            question: 'Which part of the body pumps blood?',
            options: ['Brain', 'Heart', 'Lungs', 'Stomach'],
            correctAnswer: 1,
          },
          {
            concept: 'Basic energy',
            question: 'What gives us light during the day?',
            options: ['Moon', 'Stars', 'Sun', 'Clouds'],
            correctAnswer: 2,
          },
        ],
      },
    ],
  },
]; 