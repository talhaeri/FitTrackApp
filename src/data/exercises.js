export const exerciseDatabase = [
  // GÖĞÜS EGZERSİZLERİ
  {
    id: 'cable-fly',
    name: 'Cable Fly',
    category: 'Göğüs',
    imageUrl: 'https://static.strengthlevel.com/images/illustrations/cable-fly-1000x1000.jpg',
    description: 'Kablo makinesi ile yapılan, göğüs kaslarını izole eden bir hareket. Göğüs kaslarının iç kısmını hedefler.',
    tips: [
      'Kablolar göğüs hizasında olmalı',
      'Kollarınızı hafif bükerek tutun',
      'Göğüs kaslarını sıkarak hareketi yapın',
      'Kontrollü bir şekilde geri dönün'
    ],
    targetMuscles: 'Göğüs, Ön Deltoid'
  },
  {
    id: 'push-up',
    name: 'Şınav',
    category: 'Göğüs',
    imageUrl: 'https://static.strengthlevel.com/images/illustrations/push-ups-1000x1000.jpg',
    description: 'Şınav, üst vücut kuvvetini geliştiren temel bir egzersizdir. Göğüs kasları, triceps ve omuzları çalıştırır.',
    tips: [
      'Ellerinizi omuz genişliğinde açın',
      'Sırtınızı düz tutun, kalçanızın düşmesine izin vermeyin',
      'Dirseklerinizi vücudunuza yakın tutun',
      'Nefes alarak aşağı inin, nefes vererek yukarı çıkın'
    ],
    targetMuscles: 'Göğüs, Triceps, Ön Omuz'
  },
  {
    id: 'bench-press',
    name: 'Bench Press',
    category: 'Göğüs',
    imageUrl: 'https://static.strengthlevel.com/images/illustrations/bench-press-1000x1000.jpg',
    description: 'Yatay bench üzerinde barbell ile yapılan üst göğüs egzersizi. Temel güç egzersizlerinden biridir.',
    tips: [
      'Sırtınızı benchte sabit tutun',
      'Barı göğüs hizasında kontrollü indirin',
      'Dirseklerinizi 90 derece açıyla bükün',
      'Omuzlarınızı geriye ve aşağıya doğru bastırın'
    ],
    targetMuscles: 'Göğüs, Ön Deltoid, Triceps'
  },
  {
    id: 'dumbbell-press',
    name: 'Dumbbell Press',
    category: 'Göğüs',
    imageUrl: 'https://static.strengthlevel.com/images/illustrations/dumbbell-bench-press-1000x1000.jpg',
    description: 'Dumbbell ile yapılan göğüs egzersizi. Her kol bağımsız çalıştığı için daha fazla stabilizasyon gerektirir.',
    tips: [
      'Sırtınızı benchte sabit tutun',
      'Dumbbellları kontrollü bir şekilde indirin',
      'Hareketin sonunda dumbbelllar birbirine hafifçe değebilir',
      'Omuzlarınızı geriye ve aşağıya doğru bastırın'
    ],
    targetMuscles: 'Göğüs, Ön Deltoid, Triceps'
  },

  // SIRT EGZERSİZLERİ
  {
    id: 'pull-up',
    name: 'Barfiks',
    category: 'Sırt',
    imageUrl: 'https://static.strengthlevel.com/images/illustrations/pull-ups-1000x1000.jpg',
    description: 'Bar ile yapılan üst sırt egzersizi. Sırt kaslarını ve bicepsi güçlendirir.',
    tips: [
      'Barı omuz genişliğinde kavrayın',
      'Kürek kemiklerinizi sıkıştırın',
      'Çenenizi barın üzerine çıkarın',
      'Kontrollü bir şekilde aşağı inin'
    ],
    targetMuscles: 'Sırt, Biceps, Arka Deltoid'
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    category: 'Sırt',
    imageUrl: 'https://static.strengthlevel.com/images/illustrations/lat-pulldown-1000x1000.jpg',
    description: 'Makine ile yapılan üst sırt egzersizi. Barfiks benzeri bir hareket paterni ile sırt kaslarını çalıştırır.',
    tips: [
      'Barı omuz genişliğinden biraz geniş kavrayın',
      'Sırtınızı hafif geriye yatırın',
      'Barı göğsünüze doğru çekin',
      'Kürek kemiklerinizi sıkıştırın'
    ],
    targetMuscles: 'Sırt, Biceps, Arka Deltoid'
  },

  // BACAK EGZERSİZLERİ
  {
    id: 'squat',
    name: 'Squat',
    category: 'Bacak',
    imageUrl: 'https://static.strengthlevel.com/images/illustrations/squat-1000x1000.jpg',
    description: 'Alt vücut gücünü geliştiren temel egzersiz. Tüm bacak kaslarını ve coreu çalıştırır.',
    tips: [
      'Ayaklarınızı omuz genişliğinde açın',
      'Dizlerinizi ayak parmaklarınızla aynı yönde tutun',
      'Kalçanızı geriye doğru itin',
      'Göğsünüzü dik tutun ve karın kaslarınızı sıkın'
    ],
    targetMuscles: 'Quadriceps, Hamstring, Kalça, Core'
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    category: 'Bacak',
    imageUrl: 'https://static.strengthlevel.com/images/illustrations/deadlift-1000x1000.jpg',
    description: 'Tüm vücudu çalıştıran temel egzersizlerden biri. Özellikle arka bacak ve sırt kaslarını hedefler.',
    tips: [
      'Ayaklarınızı kalça genişliğinde açın',
      'Barı bacaklarınıza yakın tutun',
      'Sırtınızı düz tutun',
      'Hareketi kalça itişiyle başlatın'
    ],
    targetMuscles: 'Hamstring, Kalça, Alt Sırt, Core'
  },

  // OMUZ EGZERSİZLERİ
  {
    id: 'military-press',
    name: 'Military Press',
    category: 'Omuz',
    imageUrl: 'https://static.strengthlevel.com/images/illustrations/shoulder-press-1000x1000.jpg',
    description: 'Ayakta veya oturarak yapılan temel omuz egzersizi. Omuz gelişimi için en etkili hareketlerden biridir.',
    tips: [
      'Barı göğüs hizasından başlayarak başınızın üzerine kaldırın',
      'Core kaslarınızı sıkı tutun',
      'Sırtınızı düz tutun',
      'Nefes kontrolünü unutmayın'
    ],
    targetMuscles: 'Ön Deltoid, Orta Deltoid, Triceps'
  },
  {
    id: 'lateral-raise',
    name: 'Lateral Raise',
    category: 'Omuz',
    imageUrl: 'https://static.strengthlevel.com/images/illustrations/dumbbell-lateral-raise-1000x1000.jpg',
    description: 'Omuzun yan kısmını hedefleyen izolasyon egzersizi. Omuz genişliği için önemlidir.',
    tips: [
      'Dumbbellları vücudunuzun yanında tutun',
      'Kollarınızı düz bir şekilde yanlara kaldırın',
      'Omuz hizasına kadar kaldırın',
      'Kontrollü bir şekilde indirin'
    ],
    targetMuscles: 'Orta Deltoid, Ön Deltoid'
  },

  // KOL EGZERSİZLERİ
  {
    id: 'biceps-curl',
    name: 'Biceps Curl',
    category: 'Kol',
    imageUrl: 'https://static.strengthlevel.com/images/illustrations/dumbbell-curl-1000x1000.jpg',
    description: 'Biceps kaslarını hedefleyen temel kol egzersizi. Kol kaslarının üst kısmını geliştirir.',
    tips: [
      'Dirseklerinizi sabit tutun',
      'Kontrolü yavaşça bırakın',
      'Tam hareket açıklığında çalışın',
      'Sırtınızı sallamayın'
    ],
    targetMuscles: 'Biceps'
  },
  {
    id: 'triceps-extension',
    name: 'Triceps Extension',
    category: 'Kol',
    imageUrl: 'https://static.strengthlevel.com/images/illustrations/triceps-pushdown-1000x1000.jpg',
    description: 'Triceps kaslarını hedefleyen temel kol egzersizi. Kolun arka kısmını çalıştırır.',
    tips: [
      'Dirseklerinizi başınızın yanında sabit tutun',
      'Hareketi sadece dirsekten yapın',
      'Ağırlığı kontrolü bırakmadan indirin',
      'Sırtınızı düz tutun'
    ],
    targetMuscles: 'Triceps'
  },

  // KARIN EGZERSİZLERİ
  {
    id: 'crunch',
    name: 'Crunch',
    category: 'Karın',
    imageUrl: 'https://static.strengthlevel.com/images/illustrations/crunch-1000x1000.jpg',
    description: 'Üst karın kaslarını hedefleyen temel karın egzersizi. Karın kaslarını güçlendirir ve şekillendirir.',
    tips: [
      'Başınızı ve boynunuzu ellerinizle destekleyin',
      'Omurganızı yerden hafifçe kaldırın',
      'Nefes vererek yukarı çıkın',
      'Kontrolü yavaşça bırakın'
    ],
    targetMuscles: 'Üst Karın Kasları'
  },
  {
    id: 'plank',
    name: 'Plank',
    category: 'Karın',
    imageUrl: 'https://static.strengthlevel.com/images/illustrations/plank-1000x1000.jpg',
    description: 'Tüm core bölgesini çalıştıran statik karın egzersizi. Karın kaslarını ve postürü güçlendirir.',
    tips: [
      'Dirseklerinizi omuz hizasında yerleştirin',
      'Vücudunuzu düz bir çizgi halinde tutun',
      'Kalçanızın düşmesine izin vermeyin',
      'Normal nefes almaya devam edin'
    ],
    targetMuscles: 'Core, Alt Karın, Üst Karın'
  }
];