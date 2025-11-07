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
  needsWords: number;
  pressWords: number;
  conflictWords: number;
  resolutionWords: number;
  temporalFocus: {
    past: number;
    present: number;
    future: number;
  };
  agencyMarkers: number;
  wordCount: number;
}

// Simple word lists for analysis
const ACHIEVEMENT_WORDS = [
  'success', 'achieve', 'accomplish', 'win', 'goal', 'study', 'work', 'learn', 'discover', 'create', 'build', 'develop',
  'progress', 'improve', 'master', 'practic', 'train', 'prepare', 'project', 'career', 'deadline', 'effort', 'score', 'perform'
];
const AFFILIATION_WORDS = [
  'friend', 'together', 'share', 'help', 'love', 'care', 'support', 'family', 'relationship', 'team', 'partner', 'collaborate',
  'community', 'mother', 'father', 'brother', 'sister', 'friendship', 'hug', 'comfort', 'companion'
];
const POWER_WORDS = [
  'control', 'lead', 'power', 'influence', 'command', 'authority', 'force', 'strong', 'dominant', 'boss', 'manage', 'direct',
  'protect', 'defend', 'rescue', 'status', 'rule'
];
const POSITIVE_WORDS = ['happy', 'good', 'great', 'love', 'wonderful', 'beautiful', 'joy', 'peace', 'hope', 'smile', 'pleasure', 'delight'];
const NEGATIVE_WORDS = ['sad', 'bad', 'angry', 'fear', 'hate', 'worry', 'pain', 'suffer', 'cry', 'afraid', 'terrible', 'horrible'];
const SELF_REFERENCES = ['i', 'me', 'my', 'mine', 'myself'];
const SOCIAL_WORDS = ['they', 'she', 'he', 'we', 'us', 'them', 'people', 'person', 'talk', 'friends'];
const NEEDS_WORDS = ['want', 'need', 'wish', 'hope', 'dream', 'desire', 'goal', 'plan', 'long', 'yearn', 'aspire', 'vision'];
const PRESS_WORDS = ['should', 'must', 'have', 'forced', 'pressure', 'demand', 'rule', 'expectation', 'require', 'obligation', 'deadline', 'duty', 'responsibility'];
const CONFLICT_WORDS = ['conflict', 'fight', 'struggle', 'tension', 'argue', 'problem', 'challenge', 'fear', 'worry', 'threat', 'stress', 'injury', 'illness', 'dilemma', 'loss'];
const RESOLUTION_WORDS = ['decide', 'resolve', 'solution', 'accept', 'choose', 'plan', 'commit', 'realise', 'understand', 'calm', 'recovery', 'promise', 'future'];
const PAST_WORDS = ['was', 'were', 'had', 'before', 'earlier', 'previously', 'yesterday'];
const PRESENT_WORDS = ['is', 'are', 'now', 'today', 'currently', 'while'];
const FUTURE_WORDS = ['will', 'going', 'soon', 'future', 'tomorrow', 'later', 'eventually'];
const AGENCY_WORDS = ['decide', 'choose', 'act', 'lead', 'confront', 'speak', 'plan', 'build', 'move', 'take', 'stand', 'protect', 'support', 'care', 'promise'];

function normalizeLexeme(word: string) {
  if (word.length <= 3) {
    return word;
  }

  if (word.endsWith('ies')) {
    return `${word.slice(0, -3)}y`;
  }

  const suffixes = ['ing', 'ers', 'er', 'ed', 'ly', 'es', 's'];
  for (const suffix of suffixes) {
    if (word.endsWith(suffix) && word.length - suffix.length >= 3) {
      return word.slice(0, -suffix.length);
    }
  }

  return word;
}

export function analyzeText(text: string): TextAnalysis {
  const words = text
    .toLowerCase()
    .split(/\W+/)
    .filter(word => word.length > 0);
  const totalWords = words.length;
  const normalizedWords = words.map(normalizeLexeme);

  const complexWords = words.filter(word => word.length > 6).length;
  const countWords = (wordList: string[]) => normalizedWords.filter(word => wordList.includes(word)).length;
  const safePercent = (count: number) => (totalWords === 0 ? 0 : (count / totalWords) * 100);

  const pastCount = countWords(PAST_WORDS);
  const presentCount = countWords(PRESENT_WORDS);
  const futureCount = countWords(FUTURE_WORDS);

  return {
    achievementScore: safePercent(countWords(ACHIEVEMENT_WORDS)),
    affiliationScore: safePercent(countWords(AFFILIATION_WORDS)),
    powerScore: safePercent(countWords(POWER_WORDS)),
    emotionalTone: {
      positive: safePercent(countWords(POSITIVE_WORDS)),
      negative: safePercent(countWords(NEGATIVE_WORDS))
    },
    socialWords: safePercent(countWords(SOCIAL_WORDS)),
    selfReferences: safePercent(countWords(SELF_REFERENCES)),
    complexWords: safePercent(complexWords),
    needsWords: safePercent(countWords(NEEDS_WORDS)),
    pressWords: safePercent(countWords(PRESS_WORDS)),
    conflictWords: safePercent(countWords(CONFLICT_WORDS)),
    resolutionWords: safePercent(countWords(RESOLUTION_WORDS)),
    temporalFocus: {
      past: safePercent(pastCount),
      present: safePercent(presentCount),
      future: safePercent(futureCount)
    },
    agencyMarkers: safePercent(countWords(AGENCY_WORDS)),
    wordCount: totalWords
  };
}

export function getAnalysisInterpretation(analysis: TextAnalysis) {
  const needsDominant = analysis.needsWords >= analysis.pressWords;
  const temporalValues = analysis.temporalFocus;
  const dominantTemporal = Object.entries(temporalValues).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'present';

  const buildBand = (score: number, low: number, high: number) => {
    if (score >= high) return 'Elevated';
    if (score <= low) return 'Low';
    return 'Typical';
  };

  const recommendations: string[] = [];
  if (analysis.pressWords > analysis.needsWords) {
    recommendations.push('Explore how external expectations shaped the protagonist. Consider adding lines about personal wishes to balance needs and presses.');
  } else {
    recommendations.push('Your story highlights internal motivation. You can strengthen realism by describing concrete environmental pressures.');
  }
  if (analysis.resolutionWords < 0.8) {
    recommendations.push('Clarify how the scene resolves or what coping strategy emerges to mirror standard TAT administration.');
  }
  if (analysis.wordCount < 200) {
    recommendations.push('Aim for 250–400 words so each section (before, during, after) of the TAT storyline is fully developed.');
  }

  return {
    summary: {
      length: analysis.wordCount,
      tone: analysis.emotionalTone.positive > analysis.emotionalTone.negative ? 'Predominantly Positive' : 'Reflective/Serious',
      headline:
        analysis.wordCount >= 250
          ? 'Your narrative provides enough depth for comparative motive scoring.'
          : 'Consider expanding the story for a more reliable comparison set.'
    },
    achievement: {
      label: buildBand(analysis.achievementScore, 4, 8.5),
      score: analysis.achievementScore.toFixed(1),
      interpretation:
        analysis.achievementScore > 5.7
          ? 'Frequent mastery and improvement themes mirror the classic nAch profile described by McClelland.'
          : 'Achievement language remains within the typical range, suggesting balanced focus across motives.'
    },
    affiliation: {
      label: buildBand(analysis.affiliationScore, 0.3, 2.5),
      score: analysis.affiliationScore.toFixed(1),
      interpretation:
        analysis.affiliationScore > 1.2
          ? 'Relationships, empathy, and belonging are salient in your narrative.'
          : 'Limited affiliation cues. Consider whether the protagonist seeks connection or support.'
    },
    power: {
      label: buildBand(analysis.powerScore, 0.5, 2.7),
      score: analysis.powerScore.toFixed(1),
      interpretation:
        analysis.powerScore > 1.7
          ? 'Themes of influence, status, or control are pronounced—hallmarks of the nPow motive.'
          : 'Power dynamics are understated, which is common when the card is read as an interpersonal support story.'
    },
    personality: {
      selfReferences: {
        score: analysis.selfReferences.toFixed(1),
        interpretation: 'Self-referential language indicates how strongly you identify with the protagonist.'
      },
      socialAwareness: {
        score: analysis.socialWords.toFixed(1),
        interpretation: 'References to other people signal attention to interpersonal context (presses).' 
      },
      emotionalStyle: {
        positive: analysis.emotionalTone.positive.toFixed(1),
        negative: analysis.emotionalTone.negative.toFixed(1),
        interpretation:
          analysis.emotionalTone.positive > analysis.emotionalTone.negative
            ? 'Tone leans optimistic or hopeful.'
            : 'Tone leans serious, mirroring protagonists facing unresolved tension.'
      }
    },
    dynamics: {
      needsPress: {
        needs: analysis.needsWords.toFixed(1),
        presses: analysis.pressWords.toFixed(1),
        balance: needsDominant ? 'Need-Saturated' : 'Press-Dominated',
        interpretation: needsDominant
          ? 'Internal wishes and goals outweigh environmental constraints.'
          : 'External expectations or situational pressures shape the story.'
      },
      temporal: {
        values: {
          past: analysis.temporalFocus.past.toFixed(1),
          present: analysis.temporalFocus.present.toFixed(1),
          future: analysis.temporalFocus.future.toFixed(1)
        },
        dominant: dominantTemporal,
        interpretation:
          dominantTemporal === 'past'
            ? 'Past-focused narratives often revisit origin stories before clarifying current motives.'
            : dominantTemporal === 'future'
              ? 'Future-oriented material highlights anticipated outcomes and goals.'
              : 'Present-focused writing emphasises immediate feelings and conflicts.'
      },
      conflict: {
        score: analysis.conflictWords.toFixed(1),
        interpretation:
          analysis.conflictWords > 2
            ? 'Conflict is explicit, aligning with Murray’s guidance to surface tension.'
            : 'Conflict markers are subtle. Consider naming the core problem more directly.'
      },
      resolution: {
        score: analysis.resolutionWords.toFixed(1),
        interpretation:
          analysis.resolutionWords >= 1
            ? 'The narrative offers a resolution or coping plan, which examiners expect in the “what happens next” portion.'
            : 'Resolution cues are limited. Try adding a concrete next step or decision.'
      },
      agency: {
        score: analysis.agencyMarkers.toFixed(1),
        interpretation:
          analysis.agencyMarkers > 1.5
            ? 'Protagonist agency is high; they take action rather than remaining passive.'
            : 'Agency markers are minimal, suggesting the protagonist feels constrained by presses.'
      }
    },
    recommendations
  };
}
