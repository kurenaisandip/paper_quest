"use client";
import { Button, Progress } from "antd";
import React, {useEffect, useState} from "react";
import jsPDF from "jspdf";
import Chat from "./components/chat";
import Image from "next/image";
import PQ from "../../../../../public/image/Paperbanner.png";
import ReactCardFlip from "react-card-flip";
import Card from "./components/Card";
import Chats from "./components/chats";
import useTokenStore, {useUserDetails} from "@/app/tokenstore";
import axios from "axios";
import {LearningDeck} from "@/app/Models/Types";

const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState({ question: "", answer: "" });

  const [learningDeck, setLearningDeck] = useState([]);

  const token = useTokenStore((state) => state.token);
  const userId = useUserDetails((state) => state.userId);

  useEffect(() => {
    const fetchLearningDeck = async () => {
      try {
        const response = await axios.get(
            `http://localhost:5030/api/spaced-repetition/GetLearningDeck/${userId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
        );

        setLearningDeck(response.data);
      } catch (error) {
        console.error("Error fetching learning deck:", error);
      }
    };

    fetchLearningDeck();
  }, [userId]);

  const cards = [
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

  const questions = [
    {
      id: 1,
      question: "What is the speed of light?",
      answer:
        "The speed of light is approximately 299,792 kilometers per second (km/s) in a vacuum.",
    },
    {
      id: 2,
      question: "What is SSR?",
      answer: "SSR stands for Server-Side Rendering.",
    },
    {
      id: 3,
      question: "What is CSR?",
      answer: "CSR stands for Client-Side Rendering.",
    },
    {
      id: 4,
      question: "What is Newton's first law of motion",
      answer:
        " Newton's first law of motion states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.",
    },
    {
      id: 5,
      question: "What is Next.js?",
      answer:
        "Next.js is a React framework for production. Next.js is a React framework for production. Next.js is a React framework for production. Next.js is a React framework for production. Next.js is a React framework for production. Next.js is a React framework for production. Next.js is a React framework for production.",
    },
  ];

  const [visibleAnswers, setVisibleAnswers] = useState<Record<number, boolean>>(
    {}
  );

  const toggleAnswer = (id: number) => {
    setVisibleAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();

    questions.forEach((qa, index) => {
      doc.text(`${index + 1}. ${qa.question}`, 10, 10 + index * 20);
      doc.text(`Answer: ${qa.answer}`, 10, 20 + index * 20);
    });

    doc.save("questions-answers.pdf");
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
              <Progress type="circle" percent={75} />
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
        {/* Modal */}
        {isModalVisible && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Card Details</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-lg font-semibold text-gray-700"
                >
                  X
                </button>
              </div>

              {/* Card inside the modal */}
              <div className="mt-6">
                <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                  {/* Front Side */}
                  <div className="w-full h-48 bg-blue-500 text-white flex flex-col items-center justify-center rounded-lg shadow-md ">
                    <p>Card Front: Click to Learn</p>
                    <button
                      onClick={handleFlip}
                      className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                      Flip to Back
                    </button>
                  </div>

                  {/* Back Side */}
                  <div className="w-full h-48 bg-green-500 text-white flex flex-col items-center justify-center rounded-lg shadow-md">
                    <p>Card Back: This is the answer or content.</p>
                    <button
                      onClick={handleFlip}
                      className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                      Flip Back to Front
                    </button>
                  </div>
                </ReactCardFlip>
              </div>
            </div>
          </div>
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
        <div className="mt-6 flex flex-wrap gap-6 item-center justify-center">
          {learningDeck.map((item : LearningDeck) => (
              <Card
                  key={item.pastPaperId}
                  pastPaperId={item.pastPaperId}
                  title={item.title}
                  totalquestions={item.totalquestions}
              />
          ))}
        </div>
      </div>
      {/* <div className="flex gap-5">
        <Chat />
        <Chats />
      </div> */}
    </div>
  );
};

export default page;
