"use client";
import { Button, Progress } from "antd";
import React, { useState } from "react";
import Image from "next/image";
import PQ from "../../../../../public/image/Paperbanner.png";
import ReactCardFlip from "react-card-flip";
import {useLearningCardStore} from "@/app/tokenstore";
import {SpacedRepetitionCard} from "@/app/Models/Types";
import SpacedRepetitionSystem from "@/app/(public)/user/subject/components/SpacedRepetitionSystem";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState({ question: "", answer: "" });

  const [isAnswerShown, setIsAnswerShown] = useState(false);

  const [isComponentVisible, setComponentVisible] = useState(false);

  const toggleComponent = () => {
    setComponentVisible(!isComponentVisible);
  };


    const [currentIndex, setCurrentIndex] = useState(0); // Track current question index
    const [cardState, setCardState] = useState<CardState>({
      status: "learning",
      interval: null,
      ease: 2.5,
      step: 0,
    });

  interface CardState {
    status: string;
    interval: number | null;
    ease: number;
    step: number;
  }

  const { Cards } = useLearningCardStore();

    const updateCardState = (buttonType: string) => {
      const options = spacedRepetitionOptions(cardState);

      const selectedOption = options.find(([key]) => key === buttonType)?.[1];
      if (selectedOption) {
        setCardState({
          status: selectedOption.status || "learning",
          interval: selectedOption.interval || cardState.interval,
          ease: selectedOption.ease || cardState.ease,
          step: typeof selectedOption.step === "number" ? selectedOption.step : cardState.step,
        });
      }

      // Move to the next question or loop back
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 < Cards.length ? prevIndex + 1 : 0
        );
      setIsAnswerShown(false);
      }

  const spacedRepetitionOptions = (card: CardState): [string, Partial<CardState>][] =>{
      const td = (seconds: number) => seconds * 1000;

      if (card.status === "learning") {
        return [
          ["again", { status: "learning", interval: td(60), ease: card.ease, step: 0 }],
          ["hard", { status: "learning", interval: td(360), ease: card.ease, step: 1 }],
          ["good", { status: "learning", interval: td(600), ease: card.ease, step: 1 }],
          ["easy", { status: "reviewing", interval: td(86400), ease: card.ease }],
        ];
      } else if (card.status === "reviewing") {
        return [
          ["again", { status: "relearning", interval: td(600), ease: card.ease - 0.2 }],
          ["hard", { status: "reviewing", interval: (card.interval || 0) * 1.2, ease: card.ease - 0.15 }],
          ["good", { status: "reviewing", interval: (card.interval || 0) * card.ease, ease: card.ease }],
          ["easy", { status: "reviewing", interval: (card.interval || 0) * card.ease * 1.5, ease: card.ease + 0.15 }],
        ];
      } else if (card.status === "relearning") {
        return [
          ["again", { status: "relearning", interval: td(60), ease: card.ease }],
          ["hard", { status: "relearning", interval: td(360), ease: card.ease }],
          ["good", { status: "reviewing", interval: td(86400), ease: card.ease }],
          ["easy", { status: "reviewing", interval: td(345600), ease: card.ease }],
        ];
      }

      return [];
    };

  const currentQuestion = Cards.length > 0 ? Cards[currentIndex] : null;



  const card = [
    {
      id: 1,
      question: "What is React?",
      answer: "A JavaScript library for building UIs.",
    },
    {
      id: 2,
      question: "What is Next.js?",
      answer: "A React framework for building web apps.",
    },
    {
      id: 3,
      question: "What is Tailwind CSS?",
      answer: "A utility-first CSS framework.",
    },
    {
      id: 4,
      question: "What is Ant Design?",
      answer: "A design system for enterprise-level web applications.",
    },
    {
      id: 5,
      question: "What is a Progressive Web App?",
      answer:
        "A web app that uses modern features to deliver app-like experiences.",
    },
  ];

  const openModal = (card: any) => {
    setCurrentCard(card);
    setIsModalOpen(true);
    setIsFlipped(false); // Reset flip state
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLearnClick = () => {
    setIsModalVisible(true);
    setIsFlipped(false); // Reset to front when modal opens
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {/* Header Image */}
      <div>
        <Image src={PQ} alt="Banner" />
      </div>

      {/* Progress Section */}
      <div className="mx-[128px] my-10">
        <div className="flex items-center justify-center">
          <div className="flex gap-4 items-center">
            <Progress type="circle" percent={0} />
            <div>
              <div>Cards</div>
              <div>Due Cards</div>
              <Button onClick={toggleComponent}>Learn</Button>
            </div>
          </div>
        </div>
      </div>

      {isComponentVisible && <SpacedRepetitionSystem />}
      {/* Card List */}
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold text-center mb-6">Cards</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          {card.map((card) => (
            <div
              key={card.id}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              onClick={() => openModal(card)}
            >
              <h3 className="text-lg font-medium">{card.question}</h3>
              <p className="text-gray-500 text-sm mt-2">3 months ago</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            {/* Modal Content */}
            <h2 className="text-xl font-bold text-center mb-4">Card Details</h2>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
              {/* Front Side */}
              <div className="text-center">
                <p className="text-gray-700 font-semibold">
                  {currentCard.question}
                </p>
                <button
                  onClick={handleFlip}
                  className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Show Answer
                </button>
              </div>

              {/* Back Side */}
              <div className="text-center">
                <p className="text-gray-700 font-semibold">
                  {currentCard.answer}
                </p>
                <button
                  onClick={handleFlip}
                  className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Go Back
                </button>
              </div>
            </ReactCardFlip>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
