'use client'
import { useEffect, useState } from 'react';
import {useLearningCardStore} from "@/app/tokenstore";

const INITIAL_EASE_FACTOR = 2.5;
const MIN_INTERVAL = 1;

export default function SpacedRepetitionSystem() {
    const { Cards, updateCard } = useLearningCardStore();
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    // Get sorted due cards
    const dueCards = Cards
        .filter(card => new Date(card.nextReview!) <= new Date())
        .sort((a, b) => new Date(a.nextReview!).getTime() - new Date(b.nextReview!).getTime());

    // Initialize cards with spaced repetition properties
    useEffect(() => {
        if (Cards.length > 0 && !Cards[0].interval) {
            const initializedCards = Cards.map(card => ({
                ...card,
                nextReview: new Date(),
                interval: MIN_INTERVAL,
                easeFactor: INITIAL_EASE_FACTOR
            }));
            useLearningCardStore.getState().setCards(initializedCards);
        }
    }, [Cards]);

    const getNextInterval = (ease: number, currentInterval: number) => {
        switch(ease) {
            case 1: return 1;    // Hard: 1 minute
            case 2: return 10;   // Medium: 10 minutes
            case 3: return currentInterval * 1.7;
            case 4: return currentInterval * 2.5;
            case 5: return 3 * 1440; // Very Easy: 3 days
            default: return currentInterval;
        }
    };

    const handleUserResponse = (ease: number) => {
        if (!dueCards[currentCardIndex]) return;

        const currentCard = dueCards[currentCardIndex];
        const newInterval = getNextInterval(ease, currentCard.interval || MIN_INTERVAL);

        const nextReview = new Date();
        nextReview.setMinutes(nextReview.getMinutes() + newInterval);

        updateCard(currentCard.question_number, {
            interval: newInterval,
            nextReview,
            easeFactor: Math.max(1.3, (currentCard.easeFactor || INITIAL_EASE_FACTOR) + (ease >= 3 ? 0.1 : -0.15))
        });

        setShowAnswer(false);
        // Move to next due card or reset
        setCurrentCardIndex(prev => (prev + 1) % dueCards.length);
    };

    const formatInterval = (minutes: number) => {
        if (minutes < 60) return `${minutes}m`;
        if (minutes < 1440) return `${Math.round(minutes/60)}h`;
        return `${Math.round(minutes/1440)}d`;
    };

    if (dueCards.length === 0) {
        return (
            <div className="max-w-3xl mx-auto my-8 text-center p-6 text-gray-500">
                No cards due for review. Come back later!
            </div>
        );
    }

    const currentCard = dueCards[currentCardIndex];

    return (
        <div className="max-w-3xl mx-auto my-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                    <div className="mb-4 text-sm text-gray-500">
                        Due Card {currentCardIndex + 1} of {dueCards.length}
                    </div>

                    <h2 className="text-xl font-semibold mb-6 text-gray-800">
                        {currentCard.question}
                    </h2>

                    {showAnswer && (
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <div className="prose text-gray-600 whitespace-pre-wrap">
                                {currentCard.answer.split('\n').map((line, i) => (
                                    <p key={i} className="mb-3">{line}</p>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col space-y-4">
                        {!showAnswer ? (
                            <button
                                onClick={() => setShowAnswer(true)}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Show Answer
                            </button>
                        ) : (
                            <div className="grid grid-cols-5 gap-2">
                                {[1, 2, 3, 4, 5].map((ease) => (
                                    <button
                                        key={ease}
                                        onClick={() => handleUserResponse(ease)}
                                        className="p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                    >
                                        <div className="font-bold">Level {ease}</div>
                                        <div className="text-xs text-gray-500">
                                            {formatInterval(getNextInterval(ease, currentCard.interval || MIN_INTERVAL))}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}