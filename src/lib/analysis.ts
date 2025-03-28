export interface TextAnalysis {
  achievementScore: number;
  affiliationScore: number;
  powerScore: number;
  emotionalTone: {
    positive: number;
    negative: number;
  };
  socialWords: number;
  selfReferences: number;
  complexWords: number;
}

// Simple word lists for analysis
const ACHIEVEMENT_WORDS = ['success', 'achieve', 'accomplish', 'win', 'goal', 'study', 'work', 'learn', 'discover', 'create', 'build', 'develop', 'progress', 'improve', 'master'];
const AFFILIATION_WORDS = ['friend', 'together', 'share', 'help', 'love', 'care', 'support', 'family', 'relationship', 'team', 'partner', 'collaborate', 'community'];
const POWER_WORDS = ['control', 'lead', 'power', 'influence', 'command', 'authority', 'force', 'strong', 'dominant', 'boss', 'manage', 'direct'];
const POSITIVE_WORDS = ['happy', 'good', 'great', 'love', 'wonderful', 'beautiful', 'joy', 'peace', 'hope', 'smile', 'pleasure', 'delight'];
const NEGATIVE_WORDS = ['sad', 'bad', 'angry', 'fear', 'hate', 'worry', 'pain', 'suffer', 'cry', 'afraid', 'terrible', 'horrible'];
const SELF_REFERENCES = ['i', 'me', 'my', 'mine', 'myself'];
const SOCIAL_WORDS = ['they', 'she', 'he', 'we', 'us', 'them', 'people', 'person', 'talk', 'friends'];

export function analyzeText(text: string): TextAnalysis {
  const words = text.toLowerCase().split(/\W+/).filter(word => word.length > 0);
  const totalWords = words.length;

  const countWords = (wordList: string[]) => {
    return words.filter(word => wordList.includes(word)).length;
  };

  const complexWords = words.filter(word => word.length > 6).length;

  return {
    achievementScore: (countWords(ACHIEVEMENT_WORDS) / totalWords) * 100,
    affiliationScore: (countWords(AFFILIATION_WORDS) / totalWords) * 100,
    powerScore: (countWords(POWER_WORDS) / totalWords) * 100,
    emotionalTone: {
      positive: (countWords(POSITIVE_WORDS) / totalWords) * 100,
      negative: (countWords(NEGATIVE_WORDS) / totalWords) * 100
    },
    socialWords: (countWords(SOCIAL_WORDS) / totalWords) * 100,
    selfReferences: (countWords(SELF_REFERENCES) / totalWords) * 100,
    complexWords: (complexWords / totalWords) * 100
  };
}

export function getAnalysisInterpretation(analysis: TextAnalysis) {
  return {
    achievement: {
      score: analysis.achievementScore.toFixed(1),
      interpretation: analysis.achievementScore > 5.7 
        ? "Your story shows a strong focus on achievement and success, suggesting you value personal growth and accomplishment."
        : "Your story shows a balanced perspective on achievement, indicating you may value various aspects of life equally."
    },
    affiliation: {
      score: analysis.affiliationScore.toFixed(1),
      interpretation: analysis.affiliationScore > 1.2
        ? "You demonstrate a strong interest in relationships and social connections in your storytelling."
        : "Your story focuses less on social relationships, which is typical for this type of image."
    },
    power: {
      score: analysis.powerScore.toFixed(1),
      interpretation: analysis.powerScore > 1.7
        ? "Your narrative shows attention to power dynamics and control, suggesting you're attuned to social hierarchies."
        : "Your story shows less focus on power dynamics, suggesting you may prioritize other aspects of human interaction."
    },
    personality: {
      selfReferences: {
        score: analysis.selfReferences.toFixed(1),
        interpretation: "Higher use of self-references often indicates personal engagement with the narrative."
      },
      socialAwareness: {
        score: analysis.socialWords.toFixed(1),
        interpretation: "Use of social words reflects your attention to interpersonal dynamics."
      },
      emotionalStyle: {
        positive: analysis.emotionalTone.positive.toFixed(1),
        negative: analysis.emotionalTone.negative.toFixed(1),
        interpretation: analysis.emotionalTone.positive > analysis.emotionalTone.negative
          ? "Your story shows a predominantly positive emotional tone, suggesting an optimistic perspective."
          : "Your story contains more negative emotional elements, which can indicate deeper emotional processing."
      }
    }
  };
}