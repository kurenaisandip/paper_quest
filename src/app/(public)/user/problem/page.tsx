"use client";
import React, { useState } from "react";
import Card from "./components/Card";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default calendar styles
import styled from "styled-components";
import Study from "./components/Study";
import ProblemTable from "./components/ProblemTable";

const StyledCalendarWrapper = styled.div`
  padding-right: 16px;
  .react-calendar {
    border: none;
    box-shadow: none;
    width: 100%;
  }

  .react-calendar__tile {
    background: transparent;
    border: none;
    text-align: center;
    font-size: 14px;
    color: #4a4a4a;
    padding: 10px;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: #dcdcdc;
      color: black;
    }
  }

  .react-calendar__tile--now {
    background: #6a5acd;
    color: white;
    font-weight: bold;
  }

  .react-calendar__tile--active {
    background: #9370db;
    color: white;
    font-weight: bold;
  }

  .react-calendar__navigation button {
    background: transparent;
    border: none;
    font-size: 16px;
    color: #6a5acd;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
      color: #4a4a4a;
    }
  }

  .react-calendar__month-view__weekdays {
    background: #f4f4f4;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 12px;
    color: #4a4a4a;
  }
`;

const Problem = () => {
  const cardData = [
    { id: 1, title: "Card 1", description: "Description for Card 1" },
    { id: 2, title: "Card 2", description: "Description for Card 2" },
    { id: 3, title: "Card 3", description: "Description for Card 3" },
    { id: 4, title: "Card 4", description: "Description for Card 4" },
    { id: 5, title: "Card 5", description: "Description for Card 5" },
    { id: 6, title: "Card 6", description: "Description for Card 6" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [date, setDate] = useState(new Date());
  const cardsPerPage = 4;

  const next = () => {
    if (currentIndex + cardsPerPage < cardData.length) {
      setCurrentIndex(currentIndex + cardsPerPage);
    }
  };

  const prev = () => {
    if (currentIndex - cardsPerPage >= 0) {
      setCurrentIndex(currentIndex - cardsPerPage);
    }
  };
  return (
    <div className="my-16 px-4 md:px-8">
      <div className="flex flex-col xl:flex-row">
        {/* Main Content (80%) */}
        <div className="md:w-[80%] md:ml-[128px] md:mr-[32px] w-full">
          <div className="px-4">
            {/* Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cardData
                .slice(currentIndex, currentIndex + cardsPerPage)
                .map((card) => (
                  <div key={card.id} className="flex-1">
                    <Card title={card.title} description={card.description} />
                  </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-between items-center mt-4 gap-2">
              <button
                onClick={prev}
                disabled={currentIndex === 0}
                className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                Prev
              </button>
              <span className="text-sm text-gray-500 text-center w-full sm:w-auto">
                Page {Math.ceil(currentIndex / cardsPerPage) + 1} of{" "}
                {Math.ceil(cardData.length / cardsPerPage)}
              </span>
              <button
                onClick={next}
                disabled={currentIndex + cardsPerPage >= cardData.length}
                className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                Next
              </button>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="mt-16">
            <Study />
          </div>
          <div className="mt-16">
            <ProblemTable />
          </div>
        </div>

        {/* Sidebar (20%) */}
        <div className="xl:w-[20%] w-full mt-8 md:mt-0 flex justify-center">
          <div className="w-full max-w-xs">
            <StyledCalendarWrapper className="shadow-lg">
              <Calendar value={date} className="rounded-lg w-full" />
            </StyledCalendarWrapper>
          </div>
        </div>
      </div>
      {/* </div> */}

      {/* <div>
        <Study />
      </div> */}
    </div>
  );
};

export default Problem;
