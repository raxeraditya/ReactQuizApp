import React from "react";
import { question } from "../Json/questions";
import QuizCard from "./QuizCard";

const Quiz = () => {
  return (
    <div className="bg-zinc-700 w-full">
      <QuizCard question={question} />
    </div>
  );
};

export default Quiz;
