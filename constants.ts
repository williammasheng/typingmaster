import { Exercise } from './types';

export const BASIC_DRILLS: Exercise[] = [
  {
    id: 'b1',
    category: 'basic',
    title: '基础键位：基准行乱序',
    content: 'asdf jkl; asdf jkl; aa ss dd ff jj kk ll ;; ajsk dlfi'
  },
  {
    id: 'b2',
    category: 'basic',
    title: '基础键位：数字行特训',
    content: '1234 5678 9090 1212 3434 5656 7878 p[] qwe rty'
  },
  {
    id: 'b3',
    category: 'basic',
    title: '程序员特训：代码语法',
    content: 'const x = () => { return "hello"; }; if (x) { console.log(x); }'
  }
];

export const CET4_ARTICLES: Exercise[] = [
  {
    id: 'e1',
    category: 'english',
    title: '阅读理解：数字时代',
    content: 'In the digital age, technology has transformed how we communicate. Smartphones and social media platforms allow us to stay connected with friends and family across the globe instantly. However, this constant connectivity can sometimes lead to information overload.',
    translation: '在数字时代，技术改变了我们的交流方式。智能手机和社交媒体平台让我们能够即时与全球各地的朋友和家人保持联系。然而，这种持续的连接有时会导致信息过载。'
  },
  {
    id: 'e2',
    category: 'english',
    title: '阅读理解：环境保护',
    content: 'Protecting the environment is a global responsibility. Climate change, caused by greenhouse gas emissions, poses a significant threat to our planet. We must reduce our carbon footprint by using renewable energy sources and recycling waste.',
    translation: '保护环境是全球的责任。由温室气体排放引起的气候变化对我们的星球构成了重大威胁。我们必须通过使用可再生能源和回收废物来减少碳足迹。'
  }
];

// Helper to split Chinese string into pinyin objects roughly (for demo)
// In a real app, use a library like pinyin-pro
const generatePinyinData = (text: string, pinyinStr: string) => {
  const chars = text.replace(/\s/g, '').split('');
  const pinyins = pinyinStr.split(' ');
  
  if (chars.length !== pinyins.length) {
    console.warn('Pinyin length mismatch', chars.length, pinyins.length);
    // Fallback or uneven mapping
  }

  return chars.map((char, i) => ({
    char,
    pinyin: pinyins[i] || ''
  }));
};

export const POETRY: Exercise[] = [
  {
    id: 'p_cao',
    category: 'poetry',
    title: '观沧海 (曹操)',
    author: '曹操',
    content: '东临碣石，以观沧海。水何澹澹，山岛竦峙。',
    pinyinData: [
      { char: '东', pinyin: 'dōng' }, { char: '临', pinyin: 'lín' }, { char: '碣', pinyin: 'jié' }, { char: '石', pinyin: 'shí' }, { char: '，', pinyin: '' },
      { char: '以', pinyin: 'yǐ' }, { char: '观', pinyin: 'guān' }, { char: '沧', pinyin: 'cāng' }, { char: '海', pinyin: 'hǎi' }, { char: '。', pinyin: '' },
      { char: '水', pinyin: 'shuǐ' }, { char: '何', pinyin: 'hé' }, { char: '澹', pinyin: 'dàn' }, { char: '澹', pinyin: 'dàn' }, { char: '，', pinyin: '' },
      { char: '山', pinyin: 'shān' }, { char: '岛', pinyin: 'dǎo' }, { char: '竦', pinyin: 'sǒng' }, { char: '峙', pinyin: 'zhì' }, { char: '。', pinyin: '' }
    ]
  },
  {
    id: 'p1',
    category: 'poetry',
    title: '静夜思 (李白)',
    author: '李白',
    content: '床前明月光，疑是地上霜。举头望明月，低头思故乡。',
    pinyinData: [
        { char: '床', pinyin: 'chuáng' }, { char: '前', pinyin: 'qián' }, { char: '明', pinyin: 'míng' }, { char: '月', pinyin: 'yuè' }, { char: '光', pinyin: 'guāng' }, { char: '，', pinyin: '' },
        { char: '疑', pinyin: 'yí' }, { char: '是', pinyin: 'shì' }, { char: '地', pinyin: 'dì' }, { char: '上', pinyin: 'shàng' }, { char: '霜', pinyin: 'shuāng' }, { char: '。', pinyin: '' },
        { char: '举', pinyin: 'jǔ' }, { char: '头', pinyin: 'tóu' }, { char: '望', pinyin: 'wàng' }, { char: '明', pinyin: 'míng' }, { char: '月', pinyin: 'yuè' }, { char: '，', pinyin: '' },
        { char: '低', pinyin: 'dī' }, { char: '头', pinyin: 'tóu' }, { char: '思', pinyin: 'sī' }, { char: '故', pinyin: 'gù' }, { char: '乡', pinyin: 'xiāng' }, { char: '。', pinyin: '' }
    ]
  },
  {
    id: 'p2',
    category: 'poetry',
    title: '春晓 (孟浩然)',
    author: '孟浩然',
    content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
    pinyinData: [
        { char: '春', pinyin: 'chūn' }, { char: '眠', pinyin: 'mián' }, { char: '不', pinyin: 'bù' }, { char: '觉', pinyin: 'jué' }, { char: '晓', pinyin: 'xiǎo' }, { char: '，', pinyin: '' },
        { char: '处', pinyin: 'chù' }, { char: '处', pinyin: 'chù' }, { char: '闻', pinyin: 'wén' }, { char: '啼', pinyin: 'tí' }, { char: '鸟', pinyin: 'niǎo' }, { char: '。', pinyin: '' },
        { char: '夜', pinyin: 'yè' }, { char: '来', pinyin: 'lái' }, { char: '风', pinyin: 'fēng' }, { char: '雨', pinyin: 'yǔ' }, { char: '声', pinyin: 'shēng' }, { char: '，', pinyin: '' },
        { char: '花', pinyin: 'huā' }, { char: '落', pinyin: 'luò' }, { char: '知', pinyin: 'zhī' }, { char: '多', pinyin: 'duō' }, { char: '少', pinyin: 'shǎo' }, { char: '。', pinyin: '' }
    ]
  }
];

export const MOCK_DB = {
  basic: BASIC_DRILLS,
  english: CET4_ARTICLES,
  poetry: POETRY,
};