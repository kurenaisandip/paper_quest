"use client";
import { Button, Progress } from "antd";
import React, { useState } from "react";
import jsPDF from "jspdf";
import Chat from "./components/chat";
import Image from "next/image";
import PQ from "../../../../../public/image/Paperbanner.png";
import ReactCardFlip from "react-card-flip";
import {useLearningCardStore} from "@/app/tokenstore";
import {SpacedRepetitionCard} from "@/app/Models/Types";

const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState({ question: "", answer: "" });

  const [isAnswerShown, setIsAnswerShown] = useState(false);


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
  ];

  const openModal = (card: any) => {
    setCurrentCard(card);
    setIsModalOpen(true);
    setIsFlipped(false); // Reset flip state
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsFlipped(false); // Reset flip state
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
      <div>
        <Image src={PQ} alt={""} />
      </div>
      <div className="mx-[128px] my-10">
        {/* Progress bar */}
        <div className="flex items-center justify-center">
          <div className="flex gap-4 items-center">
            <div>
              {" "}
              <Progress type="circle" percent={75}/>
            </div>
            <div>
              <div>Card</div>
              <div>Due Card</div>
              <div>
                <Button onClick={handleLearnClick}>Learn</Button>
              </div>
            </div>
          </div>
        </div>
        {/*/!* Modal *!/*/}
        {/*{isModalVisible && (*/}
        {/*  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">*/}
        {/*    <div className="bg-white p-6 rounded-lg shadow-lg w-96">*/}
        {/*      <div className="flex justify-between items-center">*/}
        {/*        <h2 className="text-2xl font-bold">Card Details</h2>*/}
        {/*        <button*/}
        {/*          onClick={handleCloseModal}*/}
        {/*          className="text-lg font-semibold text-gray-700"*/}
        {/*        >*/}
        {/*          X*/}
        {/*        </button>*/}
        {/*      </div>*/}

        {/*      /!* Card inside the modal *!/*/}
        {/*      <div className="mt-6">*/}
        {/*        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">*/}
        {/*          /!* Front Side *!/*/}
        {/*          <div className="w-full h-48 bg-blue-500 text-white flex flex-col items-center justify-center rounded-lg shadow-md ">*/}
        {/*            <p>Card Front: Click to Learn</p>*/}
        {/*            <button*/}
        {/*              onClick={handleFlip}*/}
        {/*              className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-md"*/}
        {/*            >*/}
        {/*              Flip to Back*/}
        {/*            </button>*/}
        {/*            <div className="flex gap-2 mt-5">*/}
        {/*              <div>1st</div>*/}
        {/*              <div>2nd</div>*/}
        {/*              <div>3rd</div>*/}
        {/*            </div>*/}
        {/*          </div>*/}

        {/*          /!* Back Side *!/*/}
        {/*          <div className="w-full h-48 bg-green-500 text-white flex flex-col items-center justify-center rounded-lg shadow-md">*/}
        {/*            <p>Card Back: This is the answer or content.</p>*/}
        {/*            <button*/}
        {/*              onClick={handleFlip}*/}
        {/*              className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-md"*/}
        {/*            >*/}
        {/*              Flip Back to Front*/}
        {/*            </button>*/}
        {/*          </div>*/}
        {/*        </ReactCardFlip>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}
        {isModalVisible && (
            <div  className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                  onClick={() => setIsModalVisible(false)} >
              <div
                  className="bg-white p-8 rounded-lg shadow-lg w-[600px] h-[500px] relative"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
              >
                {/* Close Button */}
                <button
                    onClick={() => setIsModalVisible(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                  ✕
                </button>
                {!isAnswerShown ? (
                    <>
                      {/* Question View */}
                      <p className="text-xl font-medium text-gray-700 text-center mb-6">
                        {currentQuestion?.question}
                      </p>
                      <button
                          onClick={() => setIsAnswerShown(true)}
                          className="w-full bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-300"
                      >
                        Show Answer
                      </button>
                    </>
                ) : (
                    <>
                      {/* Answer View */}
                      <p className="text-xl font-medium text-gray-700 text-center mb-4">
                        {currentQuestion?.question}
                      </p>
                      <div className="bg-gray-100 p-4 rounded-lg mb-6 h-[200px] overflow-y-auto">
                        <p className="text-gray-800 whitespace-pre-line">{currentQuestion?.answer}</p>
                      </div>
                      <div className="flex justify-between">
                        {["again", "hard", "good", "easy"].map((buttonType, index) => (
                            <button
                                key={buttonType}
                                className={`py-2 px-4 rounded-lg font-medium text-white ${
                                    index === 0
                                        ? "bg-red-500 hover:bg-red-600"
                                        : index === 1
                                            ? "bg-gray-500 hover:bg-gray-600"
                                            : index === 2
                                                ? "bg-green-500 hover:bg-green-600"
                                                : "bg-blue-500 hover:bg-blue-600"
                                }`}
                                onClick={() => updateCardState(buttonType)}
                            >
                              {buttonType.charAt(0).toUpperCase() + buttonType.slice(1)} (
                              {["1 min", "6 min", "1 day", "4 days"][index]})
                            </button>
                        ))}
                      </div>
                    </>
                )}
              </div>
            </div>
            //--------------------
            // <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            //   <div className="bg-white p-8 rounded-lg shadow-lg w-[600px] h-[500px] relative">
            //     {/* Hidden Index */}
            //     <input type="hidden" value={currentIndex}/>
            //
            //     {/* Question */}
            //     <p className="text-xl font-medium text-gray-700 text-center mb-6">
            //       {currentQuestion?.question}
            //     </p>
            //
            //     {/* Answer */}
            //     <div className="bg-gray-100 p-4 rounded-lg mb-6 h-[200px] overflow-y-auto">
            //       <p className="text-gray-800 whitespace-pre-line">{currentQuestion?.answer}</p>
            //     </div>
            //
            //     {/* Difficulty Buttons */}
            //     <div className="flex justify-between">
            //       {["again", "hard", "good", "easy"].map((buttonType, index) => (
            //           <button
            //               key={buttonType}
            //               className={`py-2 px-4 rounded-lg font-medium text-white ${
            //                   index === 0
            //                       ? "bg-red-500 hover:bg-red-600"
            //                       : index === 1
            //                           ? "bg-gray-500 hover:bg-gray-600"
            //                           : index === 2
            //                               ? "bg-green-500 hover:bg-green-600"
            //                               : "bg-blue-500 hover:bg-blue-600"
            //               }`}
            //               onClick={() => updateCardState(buttonType)}
            //           >
            //             {buttonType.charAt(0).toUpperCase() + buttonType.slice(1)} (
            //             {["1 min", "6 min", "1 day", "4 days"][index]})
            //           </button>
            //       ))}
            //     </div>
            //   </div>
            // </div>
        )}
        {/* pdf below question and answer ko tala xa */}
        {/* <div>
          <div className="w-1/2 mt-[64px] p-4 border-gray border-2 rounded-lg">
            <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
              <h1 className="text-[32px] font-semibold">Science</h1>
              <br />
              {questions.map(({ id, question, answer }) => (
                <div key={id} style={{ marginBottom: "20px" }}>
                  <h3
                    onClick={() => toggleAnswer(id)}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {id}.{question}
                  </h3>
                  {visibleAnswers[id] && <p>{answer}</p>}
                </div>
              ))}
              <button
                onClick={downloadAsPDF}
                className="bg-slate-400 p-4 rounded-lg text-white"
                // style={{ marginTop: "20px", padding: "10px 20px" }}
              >
                Download as PDF
              </button>
            </div>
          </div>
          <div className="fixed bottom-4 right-4 mb-4 mr-4 w-[500px] bg-white shadow-lg rounded-lg overflow-auto">
            <Chat />
          </div>
        </div> */}

        {/* list of cards */}
        <div className="p-6 bg-gray-100 min-h-screen mt-[64px]">
          <h1 className="text-2xl font-bold text-center mb-6">Cards</h1>
          <div className="flex flex-col flex-wrap gap-4 justify-center">
            {Cards.map((card) => (
                <div
                    key={card.question_number}
                    className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg"
                    onClick={() => openModal(card)}
                >
                  <h3 className="text-lg font-medium">{card.question}</h3>
                  <p className="text-gray-500 text-sm mt-2">3 months ago</p>
                </div>
            ))}
          </div>

          {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative">
                  <button
                      onClick={closeModal}
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                  >
                    ✖
                  </button>
                  <h2 className="text-xl font-bold text-center mb-4">Try it</h2>
                  <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                    {/* Front Side */}
                    <div className="text-center">
                      <p className="text-gray-700">{currentCard.question}</p>
                      <button
                          onClick={handleFlip}
                          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Show answer
                      </button>
                    </div>

                    {/* Back Side */}
                    <div className="text-center">
                      <p className="text-gray-700">{currentCard.answer}</p>
                      <button
                          onClick={handleFlip}
                          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Go back
                      </button>
                    </div>
                  </ReactCardFlip>
                </div>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
