export default {
  root: {
    id: 'root',
    parents: [],
    children: ['work', 'growth']
  },
  experience: {
    id: 'experience',
    value: 'Experience',
    parents: ['work'],
    children: ['stress']
  },
  stress: {
    id: 'stress',
    value: 'Stress',
    parents: ['experience', 'growth'],
    children: []
  },
  growth: {
    id: 'growth',
    value: 'Personal Growth',
    parents: ['root'],
    children: ['confidence', 'stress']
  },
  confidence: {
    id: 'confidence',
    value: 'Confidence',
    parents: ['growth'],
    children: []
  },
  work: {
    id: 'work',
    value: 'Work',
    parents: ['root'],
    children: ['experience']
  }
}
