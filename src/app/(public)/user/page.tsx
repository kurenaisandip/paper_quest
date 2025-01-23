"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import HomeNavbar from "./components/homeNavbar";
import CustomerHome from "./home/customer";
import Learn from "./home/Learn";
import Modal from "./components/Modal";
import useTokenStore, { useUserDetails } from "@/app/tokenstore";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LearningCard, LearningCardState, UserModel } from "@/app/Models/Types";
import { toast } from "react-toastify";

const page = () => {
  const [cards, setCards] = useState([]);
  // debugger;
  const [isModalOpen, setModalOpen] = useState(false);

  const isUserDataCompleted = useUserDetails(
    (state) => state.isUserDataComplete
  );

  const institutionRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const gradeRef = useRef<HTMLInputElement>(null);
  const academicBackgroundRef = useRef<HTMLSelectElement>(null);
  const semesterRef = useRef<HTMLSelectElement>(null);

  const userId = useUserDetails((state) => state.userId);

  const router = useRouter();

  useEffect(() => {
    // Open the modal when the page loads
    setModalOpen(true);
  }, []);

  const token = useTokenStore((state) => state.token);

  // if (token === "") {
  //     console.log(token);
  //     console.log("I am here");
  //     router.push("/");
  // }

  const fetchLearnCards = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5030/api/pastpaper/dynamic-modal/2`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCards(response.data);
      console.log("response", response.data); // Update state with fetched data
    } catch (error: any) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    if (isUserDataCompleted) {
      setModalOpen(false);
      fetchLearnCards();
    }

    fetchLearnCards();
  }, [isUserDataCompleted]);

  const mutation = useMutation({
    mutationFn: async (data: UserModel) => {
      // Make the Axios request and set the headers
      const response = await axios.post(
        "http://localhost:5030/api/send-user-data",
        data,
        {
          headers: {
            "Content-Type": "application/json", // JSON content type
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("data submitted successfully", data);
    },
    onError: (error) => {
      console.log("error submitting data", error);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.error("You have not fill up data");
    const data: UserModel = {
      userId: userId.toString(),
      institutionName: institutionRef.current?.value || "",
      grade: "4", // Grade is hardcoded to 4
      semester: semesterRef.current?.value || "",
      phoneNumber: phoneNumberRef.current?.value || "",
      academicBackground: academicBackgroundRef.current?.value || "",
    };

    mutation.mutate(data);
    fetchLearnCards();
  };

  const closeModal = () => setModalOpen(false);
  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">Welcome to the User Page!</h2>
        <p className="text-gray-700">Institution name</p>
        <input type="text" />
        <form>
          {/* Institution Name */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="institution-name"
            >
              Institution Name
            </label>
            <input
              type="text"
              id="institution-name"
              placeholder="Enter institution name"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={institutionRef}
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="phone-number"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone-number"
              placeholder="Enter phone number"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={phoneNumberRef}
            />
          </div>

          {/* Grade */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="grade"
            >
              Grade
            </label>
            <input
              type="text"
              id="grade"
              placeholder="Enter your grade"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={gradeRef}
            />
          </div>

          {/* Academic Background */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="academic-background"
            >
              Academic Background
            </label>
            <select
              id="academic-background"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={academicBackgroundRef}
            >
              <option value="">Select an option</option>
              <option value="BICT">BICT</option>
              <option value="MBA">MBA</option>
            </select>
          </div>

          {/* Optional Subject */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="optional-subject"
            >
              Semester
            </label>
            <select
              id="optional-subject"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={semesterRef}
            >
              <option value="">Select an option</option>
              <option value="1">First</option>
              <option value="2">Second</option>
              <option value="3">Third</option>
              <option value="4">Fourth</option>
              <option value="5">Fifth</option>
              <option value="6">Sixth</option>
              <option value="7">Seventh</option>
              <option value="8">Eight</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={(e) => {
                handleSubmit(e); // Call the handleSubmit function manually
                closeModal(); // Close the modal after submission
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
      <HomeNavbar />
      <CustomerHome />
      {isModalOpen ? "Loading..." : <Learn cards={cards}></Learn>}

      {/* <Learn cards={data || []}></Learn> */}
    </div>
  );
};

export default page;
