export interface UserDetailsState {
    email: string;
    userId: number;
    name: string;
    usertype: string;
    isUserDataComplete: boolean;
    updateUserDetails: (userData: UserData) => void;
    clearUserDetails: () => void;
  }


  export interface UserData {
    email: string;
    userId: number | string;
    name: string;
    userType: string;
    isUserDataComplete: boolean | string;
  }

  export interface UserModel{

    userId: string;
    institutionName: string;
    grade: string;
    semester: string;
    phoneNumber: string;
    academicBackground: string;
}

export interface LearningCard {
  pastPaperId: string;
  title: string;
  year: string;
  subject: string;
}

export interface PastPaper{
    pastPaperId: string;
    id : number;
    question: string;
    answer: string;
}

export interface PastPaperState {
    pastPapers: PastPaper[];
    setPastPapers: (data: PastPaper[]) => void;
    clearPastPapers: () => void;
}


export interface LearningCardState {
  cards: LearningCard[];
}
export interface AddToLearningDeck{
    userId: number;
    pastPaperId: string,
    status: string;
    addedDate: string;
    nextReviewDate: string;
}

export interface LearningDeck {
    pastPaperId: string;
    title: string;
    totalquestions: number;
}


export interface SpacedRepetitionCard {
    question_number: number;
    question: string;
    answer: string;
    score: number;
    nextReview?: Date;
    interval?: number;
    easeFactor?: number;
}

export interface SpacedRepetitionCardState {
    Cards: SpacedRepetitionCard[];
    setCards: (data: SpacedRepetitionCard[]) => void;
    updateCard: (questionNumber: number, updates: Partial<SpacedRepetitionCard>) => void;
}