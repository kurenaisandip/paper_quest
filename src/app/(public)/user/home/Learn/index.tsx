"use client";
import React, { useState } from "react";
import Card from "../components/Card";
import SectionWrapper from "@/app/(public)/home/components/SectionWrapper";
import { LearningCardState } from "@/app/Models/Types";

const Learn: React.FC<LearningCardState> = ({ cards }): JSX.Element => {
  const [showAll, setShowAll] = useState(false);

  // Determine how many courses to display based on `showAll`
  const displayedCourses = showAll ? cards : cards.slice(0, 5);

  return (
    <div className="lg:mx-[128px]">
      <h1 className="text-[32px] font-semibold mb-4">Learn</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {displayedCourses.map((courseItem) => (
          <Card
            key={courseItem.pastPaperId}
            pastPaperId={courseItem.pastPaperId}
            title={courseItem?.title || "Untitled"}
            subtitle={courseItem?.subject || "No Subject"}
            chapters={`Year: ${courseItem?.year || "N/A"}`}
            // items={10} // Placeholder for item count
            // progress={"20%"} // Placeholder for progress
          />
        ))}
      </div>
      {cards.length > 5 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-800 transition"
          >
            {showAll ? "Show Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Learn;
