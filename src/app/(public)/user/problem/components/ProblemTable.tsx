import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const ProblemTable = () => {
  // Sample data for the table
  const problems = [
    {
      id: 1,
      title: "2872. Maximum Number of K-Divisible Components",
      examType: "NEB",
      year: "2022",
      difficulty: "Hard",
      difficultyColor: "text-red-500",
      pdfLink: "/path/to/pdf1.pdf",
    },
    {
      id: 2,
      title: "1. Two Sum",
      examType: "SEE",
      year: "2021",
      difficulty: "Easy",
      difficultyColor: "text-green-500",
      pdfLink: "/path/to/pdf2.pdf",
    },
    {
      id: 3,
      title: "2. Add Two Numbers",
      examType: "BLE",
      year: "2020",
      difficulty: "Medium",
      difficultyColor: "text-yellow-500",
      pdfLink: "/path/to/pdf3.pdf",
    },
    {
      id: 4,
      title: "2. Add Two Numbers",
      examType: "BLE",
      year: "2020",
      difficulty: "Medium",
      difficultyColor: "text-yellow-500",
      pdfLink: "/path/to/pdf3.pdf",
    },
    {
      id: 5,
      title: "2. Add Two Numbers",
      examType: "BLE",
      year: "2020",
      difficulty: "Medium",
      difficultyColor: "text-yellow-500",
      pdfLink: "/path/to/pdf3.pdf",
    },
    {
      id: 6,
      title: "2. Add Two Numbers",
      examType: "BLE",
      year: "2020",
      difficulty: "Medium",
      difficultyColor: "text-yellow-500",
      pdfLink: "/path/to/pdf3.pdf",
    },
    {
      id: 7,
      title: "2. Add Two Numbers",
      examType: "BLE",
      year: "2020",
      difficulty: "Medium",
      difficultyColor: "text-yellow-500",
      pdfLink: "/path/to/pdf3.pdf",
    },
    {
      id: 8,
      title: "2. Add Two Numbers",
      examType: "BLE",
      year: "2020",
      difficulty: "Medium",
      difficultyColor: "text-yellow-500",
      pdfLink: "/path/to/pdf3.pdf",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(problems.length / rowsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = problems.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="p-6">
      {/* Filters Section */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <select className="border border-gray-300 rounded px-4 py-2 text-sm w-full sm:w-auto">
          <option value="" disabled selected hidden>
            Exam Type
          </option>
          <option value="first">First</option>
          <option value="Second">Second</option>
          <option value="third">Third</option>
        </select>

        <select className="border border-gray-300 rounded px-4 py-2 text-sm w-full sm:w-auto">
          <option value="" disabled selected hidden>
            Difficulty
          </option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <select className="border border-gray-300 rounded px-4 py-2 text-sm w-full sm:w-auto">
          <option value="" disabled selected hidden>
            Year
          </option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>
        <select className="border border-gray-300 rounded px-4 py-2 text-sm w-full sm:w-auto">
          <option value="" disabled selected hidden>
            Subject
          </option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>

        <div className="flex flex-grow gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search questions"
            className="border border-gray-300 rounded px-4 py-2 text-sm w-full"
          />
          <Button className="bg-purple-500 text-white px-4 py-[18px]">
            Search
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-sm text-gray-600">
              <th className="p-4 text-left">SN</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-center">Exam Type</th>
              <th className="p-4 text-center">Difficulty</th>
              <th className="p-4 text-center">Year</th>
              <th className="p-4 text-center">PDF</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((problem, index) => (
              <tr
                key={problem.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="p-4 text-center">{startIndex + index + 1}</td>
                <td className="p-4 text-left font-medium text-gray-800">
                  {problem.title}
                </td>
                <td className="p-4 text-center text-gray-600">
                  {problem.examType}
                </td>
                <td
                  className={`p-4 text-center font-semibold ${problem.difficultyColor}`}
                >
                  {problem.difficulty}
                </td>
                <td className="p-4 text-center text-gray-600">
                  {problem.year}
                </td>
                <td className="p-4 text-center">
                  <a
                    href={problem.pdfLink}
                    download
                    className="text-purple-500 hover:text-purple-700"
                    aria-label="Download PDF"
                  >
                    <DownloadOutlined className="text-lg" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="bg-gray-300 text-black px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </Button>
        <span className="text-gray-600 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-black px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProblemTable;
