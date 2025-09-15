export const exerciseDatabase = {
  chest: {
    title: 'Göğüs',
    exercises: [
      { id: 'chest_1', name: 'Bench Press', description: 'Halter ile düz bench press' },
      { id: 'chest_2', name: 'Incline Bench Press', description: 'Eğimli bench press' },
      { id: 'chest_3', name: 'Decline Bench Press', description: 'Negatif eğimli bench press' },
      { id: 'chest_4', name: 'Dumbbell Press', description: 'Düz dumbell press' },
      { id: 'chest_5', name: 'Cable Fly', description: 'Kablo ile göğüs fly hareketi' },
      { id: 'chest_6', name: 'Push-Ups', description: 'Klasik şınav' },
    ],
  },
  back: {
    title: 'Sırt',
    exercises: [
      { id: 'back_1', name: 'Deadlift', description: 'Klasik deadlift' },
      { id: 'back_2', name: 'Pull-Ups', description: 'Barfiks' },
      { id: 'back_3', name: 'Lat Pulldown', description: 'Lat pulldown makinesi' },
      { id: 'back_4', name: 'Barbell Row', description: 'Barbell ile kürek çekme' },
      { id: 'back_5', name: 'T-Bar Row', description: 'T-Bar ile kürek çekme' },
      { id: 'back_6', name: 'Face Pull', description: 'Yüz çekiş hareketi' },
    ],
  },
  legs: {
    title: 'Bacak',
    exercises: [
      { id: 'legs_1', name: 'Squat', description: 'Klasik squat' },
      { id: 'legs_2', name: 'Leg Press', description: 'Leg press makinesi' },
      { id: 'legs_3', name: 'Romanian Deadlift', description: 'Romanian deadlift' },
      { id: 'legs_4', name: 'Leg Extension', description: 'Leg extension makinesi' },
      { id: 'legs_5', name: 'Leg Curl', description: 'Leg curl makinesi' },
      { id: 'legs_6', name: 'Calf Raise', description: 'Ayak bileği kaldırma' },
    ],
  },
  shoulders: {
    title: 'Omuz',
    exercises: [
      { id: 'shoulders_1', name: 'Military Press', description: 'Askeri press' },
      { id: 'shoulders_2', name: 'Lateral Raise', description: 'Yan omuz açma' },
      { id: 'shoulders_3', name: 'Front Raise', description: 'Ön omuz açma' },
      { id: 'shoulders_4', name: 'Face Pull', description: 'Yüz çekiş' },
      { id: 'shoulders_5', name: 'Upright Row', description: 'Dik kürek' },
      { id: 'shoulders_6', name: 'Shoulder Press', description: 'Omuz press' },
    ],
  },
  arms: {
    title: 'Kollar',
    exercises: [
      { id: 'arms_1', name: 'Bicep Curl', description: 'Biseps curl' },
      { id: 'arms_2', name: 'Tricep Extension', description: 'Triceps extension' },
      { id: 'arms_3', name: 'Hammer Curl', description: 'Çekiç curl' },
      { id: 'arms_4', name: 'Skull Crusher', description: 'Skull crusher' },
      { id: 'arms_5', name: 'Preacher Curl', description: 'Preacher curl' },
      { id: 'arms_6', name: 'Diamond Push-Ups', description: 'Elmas şınav' },
    ],
  },
  core: {
    title: 'Karın',
    exercises: [
      { id: 'core_1', name: 'Crunches', description: 'Klasik mekik' },
      { id: 'core_2', name: 'Plank', description: 'Plank duruşu' },
      { id: 'core_3', name: 'Leg Raises', description: 'Bacak kaldırma' },
      { id: 'core_4', name: 'Russian Twist', description: 'Rus dönüşü' },
      { id: 'core_5', name: 'Mountain Climbers', description: 'Dağcı hareketi' },
      { id: 'core_6', name: 'Side Plank', description: 'Yan plank' },
    ],
  },
};

export const frequencyOptions = [
  { id: 'freq_1', label: 'Haftada 1 gün', value: '1' },
  { id: 'freq_2', label: 'Haftada 2 gün', value: '2' },
  { id: 'freq_3', label: 'Haftada 3 gün', value: '3' },
  { id: 'freq_4', label: 'Haftada 4 gün', value: '4' },
  { id: 'freq_5', label: 'Haftada 5 gün', value: '5' },
  { id: 'freq_6', label: 'Haftada 6 gün', value: '6' },
  { id: 'freq_7', label: 'Her gün', value: '7' },
];

export const difficultyOptions = [
  { id: 'diff_1', label: 'Başlangıç', value: 'beginner' },
  { id: 'diff_2', label: 'Orta', value: 'intermediate' },
  { id: 'diff_3', label: 'İleri', value: 'advanced' },
];