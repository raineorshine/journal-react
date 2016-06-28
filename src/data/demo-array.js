export default [
  {
    id: 'root',
    parents: [],
    children: ['work', 'growth']
  },
    {
      id: 'work',
      value: 'Work',
      parents: ['root'],
      children: ['experience']
    },
      {
        id: 'experience',
        value: 'Experience',
        parents: ['work'],
        children: ['stress']
      },
        {
          id: 'stress',
          value: 'Stress',
          parents: ['experience', 'growth'],
          children: []
        },
    {
      id: 'growth',
      value: 'Personal Growth',
      parents: ['root'],
      children: ['confidence', 'stress']
    },
      {
        id: 'confidence',
        value: 'Confidence',
        parents: ['growth'],
        children: []
      }
]
