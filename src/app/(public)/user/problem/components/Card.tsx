import { Button } from "antd";
import React from "react";

type CardProps = {
  title: string;
  description: string;
};

const Card = ({ title, description }: CardProps) => {
  return (
    <div className="w-full sm:w-[260px] md:w-[260px] lg:w-[220px] 2xl:w-[250px] mx-auto">
      <div className="flex flex-col gap-4 rounded-lg p-4 bg-gradient-to-br from-purple-800 via-purple-900 to-black">
        <p className="text-white font-semibold text-[20px] sm:text-[22px] md:text-[24px]">
          {title}
        </p>
        <span className="text-white text-sm sm:text-base">{description}</span>
        <Button className="w-full sm:w-fit mt-4">Start Learning</Button>
      </div>
    </div>
  );
};

export default Card;
