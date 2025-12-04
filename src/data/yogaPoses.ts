import { YogaPose } from '@/types/yoga';

export const yogaPoses: YogaPose[] = [
  {
    id: 'mountain',
    name: 'Mountain Pose',
    sanskritName: 'Tadasana',
    description: 'The foundation of all standing poses. Stand tall and grounded like a mountain.',
    benefits: [
      'Improves posture',
      'Strengthens thighs, knees, and ankles',
      'Increases awareness',
      'Reduces flat feet'
    ],
    instructions: [
      'Stand with feet together or hip-width apart',
      'Distribute weight evenly across both feet',
      'Engage your thigh muscles',
      'Lengthen your tailbone toward the floor',
      'Roll your shoulders back and down',
      'Let arms hang naturally with palms facing forward',
      'Keep your chin parallel to the floor',
      'Breathe deeply and hold'
    ],
    duration: 30,
    difficulty: 'beginner',
    category: 'standing'
  },
  {
    id: 'tree',
    name: 'Tree Pose',
    sanskritName: 'Vrksasana',
    description: 'A balancing pose that promotes focus and concentration while strengthening the legs.',
    benefits: [
      'Improves balance and stability',
      'Strengthens legs and core',
      'Opens hips',
      'Enhances focus and concentration'
    ],
    instructions: [
      'Start in Mountain Pose',
      'Shift weight onto left foot',
      'Place right foot on inner left thigh or calf (not on knee)',
      'Press foot and thigh together',
      'Bring hands to heart center or extend overhead',
      'Fix your gaze on a steady point',
      'Hold for 5-10 breaths',
      'Repeat on the other side'
    ],
    duration: 45,
    difficulty: 'beginner',
    category: 'balance'
  },
  {
    id: 'warrior1',
    name: 'Warrior I',
    sanskritName: 'Virabhadrasana I',
    description: 'A powerful standing pose that builds strength and confidence.',
    benefits: [
      'Strengthens shoulders, arms, and back',
      'Stretches chest, lungs, and belly',
      'Strengthens and stretches thighs and ankles',
      'Develops stamina and balance'
    ],
    instructions: [
      'From Mountain Pose, step right foot back about 4 feet',
      'Turn right foot out 45-60 degrees',
      'Bend left knee over left ankle',
      'Square hips toward front',
      'Raise arms overhead, palms facing each other',
      'Keep shoulders relaxed and down',
      'Gaze forward or slightly up',
      'Hold for 5-10 breaths, then switch sides'
    ],
    duration: 45,
    difficulty: 'beginner',
    category: 'standing'
  },
  {
    id: 'warrior2',
    name: 'Warrior II',
    sanskritName: 'Virabhadrasana II',
    description: 'A powerful pose that opens the hips and builds leg strength.',
    benefits: [
      'Strengthens legs and ankles',
      'Stretches groin, chest, and shoulders',
      'Improves stamina',
      'Develops concentration'
    ],
    instructions: [
      'Stand with feet wide apart',
      'Turn right foot out 90 degrees',
      'Turn left foot in slightly',
      'Bend right knee over right ankle',
      'Extend arms parallel to floor',
      'Gaze over right fingertips',
      'Keep torso centered between legs',
      'Hold for 5-10 breaths, then switch sides'
    ],
    duration: 45,
    difficulty: 'beginner',
    category: 'standing'
  },
  {
    id: 'downdog',
    name: 'Downward-Facing Dog',
    sanskritName: 'Adho Mukha Svanasana',
    description: 'A rejuvenating pose that stretches and strengthens the entire body.',
    benefits: [
      'Stretches shoulders, hamstrings, and calves',
      'Strengthens arms and legs',
      'Energizes the body',
      'Calms the mind'
    ],
    instructions: [
      'Start on hands and knees',
      'Place hands shoulder-width apart',
      'Tuck toes and lift hips up and back',
      'Straighten legs as much as comfortable',
      'Press chest toward thighs',
      'Relax head between arms',
      'Keep pressing through palms',
      'Hold for 5-10 breaths'
    ],
    duration: 45,
    difficulty: 'beginner',
    category: 'standing'
  },
  {
    id: 'cobra',
    name: 'Cobra Pose',
    sanskritName: 'Bhujangasana',
    description: 'A gentle backbend that opens the heart and strengthens the spine.',
    benefits: [
      'Strengthens spine',
      'Stretches chest, lungs, and shoulders',
      'Opens the heart',
      'Soothes sciatica'
    ],
    instructions: [
      'Lie face down with legs extended',
      'Place hands under shoulders',
      'Hug elbows close to body',
      'Press tops of feet into floor',
      'Inhale and lift chest off floor',
      'Keep lower ribs on floor',
      'Draw shoulders back',
      'Hold for 5-10 breaths'
    ],
    duration: 30,
    difficulty: 'beginner',
    category: 'backbend'
  },
  {
    id: 'child',
    name: "Child's Pose",
    sanskritName: 'Balasana',
    description: 'A restful pose that calms the mind and gently stretches the body.',
    benefits: [
      'Gently stretches hips, thighs, and ankles',
      'Calms the brain and helps relieve stress',
      'Relieves back and neck pain',
      'Promotes relaxation'
    ],
    instructions: [
      'Kneel on the floor with toes together',
      'Sit back on heels',
      'Separate knees hip-width apart',
      'Fold forward, laying torso between thighs',
      'Extend arms forward or rest them alongside body',
      'Rest forehead on floor',
      'Breathe deeply and relax',
      'Hold for as long as comfortable'
    ],
    duration: 60,
    difficulty: 'beginner',
    category: 'forward-fold'
  },
  {
    id: 'corpse',
    name: 'Corpse Pose',
    sanskritName: 'Savasana',
    description: 'The ultimate relaxation pose that integrates the benefits of your practice.',
    benefits: [
      'Calms the nervous system',
      'Reduces stress and anxiety',
      'Lowers blood pressure',
      'Promotes deep relaxation'
    ],
    instructions: [
      'Lie flat on your back',
      'Separate legs slightly, feet falling open',
      'Place arms alongside body, palms facing up',
      'Close your eyes',
      'Relax every part of your body',
      'Breathe naturally',
      'Release all effort',
      'Rest for 5-15 minutes'
    ],
    duration: 120,
    difficulty: 'beginner',
    category: 'seated'
  }
];

export const getRandomPoses = (count: number): YogaPose[] => {
  const shuffled = [...yogaPoses].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getPoseById = (id: string): YogaPose | undefined => {
  return yogaPoses.find(pose => pose.id === id);
};
