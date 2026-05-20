export interface SymptomInfo {
  id: string;
  name: string;
  icon: string;
  category: string;
}

export interface ConditionInfo {
  id: string;
  name: string;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  symptoms: string[];
  firstAid: string;
  whenToVet: string;
}

export interface FirstAidTip {
  id: string;
  title: string;
  icon: string;
  steps: string[];
  warning: string;
}

export const PET_TYPES = [
  { id: 'dog', name: 'Собака', icon: '🐕' },
  { id: 'cat', name: 'Кошка', icon: '🐈' },
  { id: 'rabbit', name: 'Кролик', icon: '🐇' },
  { id: 'hamster', name: 'Хомяк', icon: '🐹' },
  { id: 'parrot', name: 'Попугай', icon: '🦜' },
];

export const DOG_BREEDS = [
  'Метис', 'Лабрадор', 'Немецкая овчарка', 'Хаски', 'Корги',
  'Такса', 'Бигль', 'Шпиц', 'Йоркширский терьер', 'Чихуахуа',
  'Французский бульдог', 'Мопс', 'Золотистый ретривер', 'Ротвейлер',
  'Доберман', 'Боксёр', 'Алабай', 'Кавказская овчарка', 'Джек-рассел-терьер',
  'Стаффордширский терьер', 'Другая',
];

export const CAT_BREEDS = [
  'Метис', 'Британская', 'Шотландская вислоухая', 'Мейн-кун', 'Сфинкс',
  'Сиамская', 'Персидская', 'Бенгальская', 'Русская голубая', 'Абиссинская',
  'Рэгдолл', 'Бирманская', 'Норвежская лесная', 'Другая',
];

export const SYMPTOM_CATEGORIES = [
  { id: 'skin', name: 'Кожа и шерсть', icon: '🔍' },
  { id: 'digestive', name: 'Пищеварение', icon: '🍽️' },
  { id: 'behavior', name: 'Поведение', icon: '🧠' },
  { id: 'movement', name: 'Движение', icon: '🦿' },
  { id: 'eyes', name: 'Глаза', icon: '👁️' },
  { id: 'ears', name: 'Уши', icon: '👂' },
  { id: 'breathing', name: 'Дыхание', icon: '💨' },
  { id: 'other', name: 'Другое', icon: '❓' },
];

export const SYMPTOMS: SymptomInfo[] = [
  { id: 'itching', name: 'Зуд / чешется', icon: '🔴', category: 'skin' },
  { id: 'hair_loss', name: 'Выпадение шерсти', icon: '🔴', category: 'skin' },
  { id: 'rash', name: 'Сыпь / покраснение', icon: '🔴', category: 'skin' },
  { id: 'wound', name: 'Рана / порез', icon: '🔴', category: 'skin' },
  { id: 'lump', name: 'Шишка / уплотнение', icon: '🔴', category: 'skin' },
  { id: 'dry_skin', name: 'Сухая кожа / перхоть', icon: '🟡', category: 'skin' },

  { id: 'vomiting', name: 'Рвота', icon: '🟠', category: 'digestive' },
  { id: 'diarrhea', name: 'Диарея', icon: '🟠', category: 'digestive' },
  { id: 'no_appetite', name: 'Отказ от еды', icon: '🟠', category: 'digestive' },
  { id: 'excessive_thirst', name: 'Пьёт много воды', icon: '🟡', category: 'digestive' },
  { id: 'weight_loss', name: 'Потеря веса', icon: '🟠', category: 'digestive' },
  { id: 'constipation', name: 'Запор', icon: '🟡', category: 'digestive' },

  { id: 'lethargy', name: 'Вялость / апатия', icon: '🟠', category: 'behavior' },
  { id: 'aggression', name: 'Агрессия', icon: '🔴', category: 'behavior' },
  { id: 'anxiety', name: 'Беспокойство / тревога', icon: '🟡', category: 'behavior' },
  { id: 'hiding', name: 'Прячется', icon: '🟡', category: 'behavior' },
  { id: 'excessive_licking', name: 'Чрезмерное вылизывание', icon: '🟡', category: 'behavior' },

  { id: 'limping', name: 'Хромота', icon: '🟠', category: 'movement' },
  { id: 'stiffness', name: 'Скованность движений', icon: '🟡', category: 'movement' },
  { id: 'cant_stand', name: 'Не может встать', icon: '🔴', category: 'movement' },
  { id: 'trembling', name: 'Дрожь / тремор', icon: '🟠', category: 'movement' },

  { id: 'eye_discharge', name: 'Выделения из глаз', icon: '🟡', category: 'eyes' },
  { id: 'eye_redness', name: 'Покраснение глаз', icon: '🟠', category: 'eyes' },
  { id: 'squinting', name: 'Прищуривается', icon: '🟡', category: 'eyes' },
  { id: 'cloudy_eye', name: 'Помутнение глаза', icon: '🟠', category: 'eyes' },

  { id: 'ear_discharge', name: 'Выделения из ушей', icon: '🟡', category: 'ears' },
  { id: 'head_shaking', name: 'Трясёт головой', icon: '🟡', category: 'ears' },
  { id: 'ear_smell', name: 'Запах из ушей', icon: '🟡', category: 'ears' },

  { id: 'coughing', name: 'Кашель', icon: '🟠', category: 'breathing' },
  { id: 'sneezing', name: 'Чихание', icon: '🟡', category: 'breathing' },
  { id: 'heavy_breathing', name: 'Тяжёлое дыхание', icon: '🔴', category: 'breathing' },
  { id: 'nasal_discharge', name: 'Выделения из носа', icon: '🟡', category: 'breathing' },

  { id: 'fever', name: 'Высокая температура', icon: '🔴', category: 'other' },
  { id: 'swelling', name: 'Отёк', icon: '🟠', category: 'other' },
  { id: 'bad_breath', name: 'Запах изо рта', icon: '🟡', category: 'other' },
  { id: 'frequent_urination', name: 'Частое мочеиспускание', icon: '🟡', category: 'other' },
];

export const CONDITIONS: ConditionInfo[] = [
  {
    id: 'allergy',
    name: 'Аллергия',
    description: 'Аллергическая реакция на пищу, окружающую среду или паразитов.',
    urgency: 'medium',
    symptoms: ['itching', 'rash', 'hair_loss', 'sneezing', 'eye_discharge'],
    firstAid: 'Уберите предполагаемый аллерген. Можно дать антигистаминное (по весу). Не купайте с шампунем.',
    whenToVet: 'Если симптомы не проходят за 2 дня, появился отёк морды или затруднённое дыхание.',
  },
  {
    id: 'ear_infection',
    name: 'Отит (инфекция уха)',
    description: 'Воспаление наружного или среднего уха, часто бактериальное или грибковое.',
    urgency: 'medium',
    symptoms: ['ear_discharge', 'head_shaking', 'ear_smell', 'itching'],
    firstAid: 'Аккуратно протрите ухо специальным лосьоном. Не лезьте глубоко ватной палочкой.',
    whenToVet: 'Если есть гнойные выделения, сильный запах или питомец не даёт трогать ухо.',
  },
  {
    id: 'poisoning',
    name: 'Отравление',
    description: 'Попадание токсичных веществ в организм — бытовая химия, ядовитые растения, шоколад (для собак).',
    urgency: 'emergency',
    symptoms: ['vomiting', 'diarrhea', 'lethargy', 'trembling', 'heavy_breathing'],
    firstAid: 'НЕ вызывайте рвоту самостоятельно! Запишите что съел питомец и когда. Дайте воды.',
    whenToVet: 'НЕМЕДЛЕННО! Отравление — это экстренная ситуация. Везите к ветеринару сразу.',
  },
  {
    id: 'dermatitis',
    name: 'Дерматит',
    description: 'Воспаление кожи, может быть вызвано аллергией, паразитами или инфекцией.',
    urgency: 'medium',
    symptoms: ['rash', 'itching', 'hair_loss', 'dry_skin', 'excessive_licking'],
    firstAid: 'Наденьте защитный воротник, чтобы питомец не расчёсывал. Обработайте антисептиком.',
    whenToVet: 'Если площадь поражения растёт, появились гнойнички или не проходит за 3-5 дней.',
  },
  {
    id: 'conjunctivitis',
    name: 'Конъюнктивит',
    description: 'Воспаление слизистой оболочки глаза.',
    urgency: 'medium',
    symptoms: ['eye_discharge', 'eye_redness', 'squinting'],
    firstAid: 'Промойте глаза тёплым раствором фурацилина или кипячёной водой. Уберите корочки.',
    whenToVet: 'Если выделения гнойные, глаз сильно опух или питомец не открывает глаз.',
  },
  {
    id: 'arthritis',
    name: 'Артрит / болезни суставов',
    description: 'Воспаление суставов, часто у пожилых животных.',
    urgency: 'low',
    symptoms: ['limping', 'stiffness', 'lethargy', 'cant_stand'],
    firstAid: 'Обеспечьте мягкую подстилку. Ограничьте прыжки и лестницы. Тёплый компресс на сустав.',
    whenToVet: 'Если хромота появилась внезапно, есть отёк или питомец скулит от боли.',
  },
  {
    id: 'gastritis',
    name: 'Гастрит / расстройство ЖКТ',
    description: 'Воспаление слизистой желудка, часто от неправильного питания.',
    urgency: 'medium',
    symptoms: ['vomiting', 'no_appetite', 'lethargy', 'diarrhea'],
    firstAid: 'Голодная диета 12-24 часа (только вода). Затем рис + варёная курица маленькими порциями.',
    whenToVet: 'Если рвота с кровью, не прекращается более суток, или питомец обезвожен.',
  },
  {
    id: 'fleas',
    name: 'Блохи / паразиты',
    description: 'Заражение эктопаразитами — блохи, клещи, вши.',
    urgency: 'low',
    symptoms: ['itching', 'hair_loss', 'rash', 'excessive_licking', 'anxiety'],
    firstAid: 'Обработайте каплями от блох (Фронтлайн, Адвантикс). Постирайте подстилку при 60°C.',
    whenToVet: 'Если сильное заражение, есть ранки от расчёсов или подозрение на клеща.',
  },
  {
    id: 'uti',
    name: 'Инфекция мочевыводящих путей',
    description: 'Бактериальная инфекция мочевого пузыря или уретры.',
    urgency: 'medium',
    symptoms: ['frequent_urination', 'anxiety', 'lethargy', 'fever'],
    firstAid: 'Обеспечьте обильное питьё. Не ограничивайте доступ к лотку/улице.',
    whenToVet: 'Если есть кровь в моче, питомец не может помочиться или скулит при мочеиспускании.',
  },
  {
    id: 'respiratory_infection',
    name: 'Респираторная инфекция',
    description: 'Вирусная или бактериальная инфекция дыхательных путей.',
    urgency: 'high',
    symptoms: ['coughing', 'sneezing', 'nasal_discharge', 'lethargy', 'fever', 'no_appetite'],
    firstAid: 'Обеспечьте тёплое место без сквозняков. Влажный воздух (увлажнитель). Обильное питьё.',
    whenToVet: 'Если дыхание затруднено, температура выше 40°C или симптомы длятся более 3 дней.',
  },
  {
    id: 'dental_disease',
    name: 'Болезни зубов и дёсен',
    description: 'Зубной камень, гингивит, пародонтит.',
    urgency: 'low',
    symptoms: ['bad_breath', 'no_appetite', 'excessive_licking', 'swelling'],
    firstAid: 'Мягкая пища. Специальные лакомства для чистки зубов. Не пытайтесь удалять камень сами.',
    whenToVet: 'Если дёсны кровоточат, есть шатающиеся зубы или питомец отказывается есть.',
  },
  {
    id: 'heatstroke',
    name: 'Тепловой удар',
    description: 'Перегрев организма — крайне опасное состояние, особенно летом.',
    urgency: 'emergency',
    symptoms: ['heavy_breathing', 'lethargy', 'vomiting', 'trembling', 'cant_stand'],
    firstAid: 'Перенесите в тень/прохладу. Смочите лапы и уши прохладной (НЕ ледяной) водой. Дайте пить.',
    whenToVet: 'НЕМЕДЛЕННО! Тепловой удар может быть смертельным. Охлаждайте по дороге к ветеринару.',
  },
];

export const FIRST_AID_TIPS: FirstAidTip[] = [
  {
    id: 'bleeding',
    title: '🩸 Кровотечение',
    icon: '🩸',
    steps: [
      'Наденьте перчатки (если есть)',
      'Прижмите чистую ткань к ране',
      'Удерживайте давление 5-10 минут',
      'Если кровь не останавливается — наложите тугую повязку',
      'Не удаляйте первую повязку, накладывайте поверх',
      'Доставьте к ветеринару',
    ],
    warning: 'Не используйте жгут без крайней необходимости! Это может привести к некрозу тканей.',
  },
  {
    id: 'choking',
    title: '😮 Удушье / подавился',
    icon: '😮',
    steps: [
      'Откройте рот и посмотрите — виден ли предмет',
      'Если видно — аккуратно извлеките пинцетом или пальцами',
      'Если не видно — НЕ лезьте глубоко',
      'Для маленьких собак/кошек: поднимите за задние лапы вниз головой',
      'Для крупных собак: приём Геймлиха — обхватите живот и резко сожмите',
      'Срочно к ветеринару!',
    ],
    warning: 'Не бейте по спине — это может протолкнуть предмет глубже!',
  },
  {
    id: 'burn',
    title: '🔥 Ожог',
    icon: '🔥',
    steps: [
      'Охладите место ожога прохладной проточной водой 10-15 минут',
      'НЕ прикладывайте лёд — это усугубит повреждение',
      'НЕ наносите масло, сметану или зубную пасту',
      'Накройте чистой влажной тканью',
      'При обширном ожоге — срочно к ветеринару',
    ],
    warning: 'Химический ожог: обильно промойте водой 20+ минут. Не нейтрализуйте кислоту щёлочью!',
  },
  {
    id: 'fracture',
    title: '🦴 Перелом',
    icon: '🦴',
    steps: [
      'Не пытайтесь вправить кость!',
      'Ограничьте движение питомца',
      'При открытом переломе — накройте рану чистой тканью',
      'Для транспортировки используйте жёсткую поверхность (доску)',
      'Маленьких животных заверните в полотенце',
      'Срочно к ветеринару!',
    ],
    warning: 'Не давайте обезболивающие для людей (ибупрофен, парацетамол) — они токсичны для животных!',
  },
  {
    id: 'tick',
    title: '🕷️ Укус клеща',
    icon: '🕷️',
    steps: [
      'Возьмите специальный выкручиватель клещей или тонкий пинцет',
      'Захватите клеща максимально близко к коже',
      'Вращайте против часовой стрелки, аккуратно вытягивая',
      'НЕ дёргайте резко — головка может остаться',
      'Обработайте место укуса антисептиком',
      'Наблюдайте 2-3 недели за состоянием питомца',
    ],
    warning: 'НЕ заливайте клеща маслом! Он задохнётся и выпустит больше токсинов в кровь.',
  },
  {
    id: 'seizure',
    title: '⚡ Судороги / эпилепсия',
    icon: '⚡',
    steps: [
      'НЕ пытайтесь удержать питомца или засунуть что-то в рот',
      'Уберите опасные предметы вокруг',
      'Выключите яркий свет и уберите громкие звуки',
      'Засеките время приступа',
      'После приступа — тихо и спокойно успокойте питомца',
      'Запишите видео для ветеринара',
    ],
    warning: 'Если приступ длится более 5 минут или повторяется — это ЭКСТРЕННАЯ ситуация!',
  },
];

export const DANGEROUS_FOODS = {
  dog: [
    { name: 'Шоколад', danger: 'high', description: 'Содержит теобромин — токсичен для собак. Тёмный шоколад опаснее молочного.' },
    { name: 'Виноград / изюм', danger: 'high', description: 'Вызывает острую почечную недостаточность даже в малых количествах.' },
    { name: 'Лук / чеснок', danger: 'high', description: 'Разрушает эритроциты, вызывает анемию.' },
    { name: 'Ксилит (жвачка, конфеты)', danger: 'high', description: 'Вызывает резкое падение сахара в крови и поражение печени.' },
    { name: 'Авокадо', danger: 'medium', description: 'Содержит персин — токсичен для многих животных.' },
    { name: 'Кости варёные', danger: 'high', description: 'Раскалываются на острые осколки, могут проткнуть кишечник.' },
    { name: 'Алкоголь', danger: 'high', description: 'Даже малые дозы вызывают интоксикацию, кому, смерть.' },
    { name: 'Кофе / чай', danger: 'medium', description: 'Кофеин токсичен для собак — учащённое сердцебиение, тремор.' },
    { name: 'Макадамия', danger: 'medium', description: 'Вызывает слабость, рвоту, тремор.' },
    { name: 'Сырое тесто (дрожжевое)', danger: 'medium', description: 'Расширяется в желудке, выделяет этанол.' },
  ],
  cat: [
    { name: 'Лук / чеснок', danger: 'high', description: 'Разрушает эритроциты. Кошки ещё чувствительнее, чем собаки.' },
    { name: 'Шоколад', danger: 'high', description: 'Теобромин и кофеин токсичны для кошек.' },
    { name: 'Виноград / изюм', danger: 'high', description: 'Может вызвать почечную недостаточность.' },
    { name: 'Алкоголь', danger: 'high', description: 'Крайне токсичен — даже 1 чайная ложка опасна.' },
    { name: 'Сырая рыба', danger: 'medium', description: 'Содержит тиаминазу, разрушающую витамин B1.' },
    { name: 'Молоко', danger: 'low', description: 'Большинство взрослых кошек не переносят лактозу — понос, вздутие.' },
    { name: 'Лилии (растение)', danger: 'high', description: 'ВСЕ части лилии смертельно токсичны для кошек — почечная недостаточность.' },
    { name: 'Ксилит', danger: 'high', description: 'Падение сахара в крови, печёночная недостаточность.' },
  ],
};
