import React from "react";
import cover from "@/../public/image/cover.png";
import Image from "next/image";

const Study = () => {
  const studyPlans = [
    {
      id: 1,
      title: "Top Interview 150",
      description: "Must-do List for Interview Prep",
      image: { cover },
    },
    {
      id: 2,
      title: "LeetCode 75",
      description: "Ace Coding Interview with 75 Qs",
      image: { cover },
    },
    {
      id: 3,
      title: "SQL 50",
      description: "Crack SQL Interview in 50 Qs",
      image: { cover },
    },
    {
      id: 4,
      title: "Introduction to Pandas",
      description: "Learn Basic Pandas in 15 Qs",
      image: { cover },
    },
    {
      id: 5,
      title: "30 Days of JavaScript",
      description: "Learn JS Basics with 30 Qs",
      image: { cover },
    },
    {
      id: 6,
      title: "Amazon Spring '23 High Frequency",
      description: "Practice Amazon 25 Recently...",
      image: { cover },
    },
  ];

  return (
    <div className="my-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Study Plan</h2>
        <a href="#" className="text-blue-500 hover:underline text-sm">
          See all
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {studyPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 hover:shadow-lg transition duration-200"
          >
            <Image
              src={cover}
              alt={plan.title}
              className="h-12 w-12 rounded-md object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{plan.title}</h3>
              <p className="text-sm text-gray-600">{plan.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Study;
