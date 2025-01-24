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

  const [isComponentVisible, setComponentVisible] = useState(false);

  const { Cards } = useLearningCardStore();
  const [selectedCard, setSelectedCard] = useState<SpacedRepetitionCard | null>(null);

  const toggleComponent = () => {
    setComponentVisible(!isComponentVisible);
  };


  const openModal = (card: any) => {
    setSelectedCard(card);
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
    setIsFlipped(false);
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
          {Cards.map((card) => (
            <div
              key={card.question_number}
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
      {isModalOpen && selectedCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative">
              <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                ✖
              </button>

              <h2 className="text-xl font-bold text-center mb-4">Card Details</h2>
              <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                {/* Front Side */}
                <div className="text-center">
                  <p className="text-gray-700 font-semibold">
                    {selectedCard.question}
                  </p>
                  <button
                      onClick={() => setIsFlipped(!isFlipped)}
                      className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Show Answer
                  </button>
                </div>

                {/* Back Side */}
                <div className="text-center">
                  <p className="text-gray-700 font-semibold">
                    {selectedCard.answer}
                  </p>
                  <button
                      onClick={() => setIsFlipped(!isFlipped)}
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
