"use client";
import React, { useState, useEffect } from "react";
import useCountdown from "./useCountdown";

interface questionType {
  question: string;
  options: string[];
  answer: string;
}

const QuizCard = ({ question }: { question: questionType[] }) => {
  const [value, setValue] = useState<number>(0);
  const [stop, setStop] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<string>("NOT FILL");
  const [answers, setAnswers] = useState<(string | undefined)[]>([]);
  const { secondsLeft, start } = useCountdown();

  useEffect(() => {
    start(5);
  }, [value]); // Call start when the component mounts or when `value` changes

  const data = question[value];
  useEffect(() => {
    if (secondsLeft === 0 && value < question.length - 1) {
      setValue(value + 1);
      setSelectedOption("NOT FILL");
      setAnswers([...answers, "NOT FILL"]);
    } else if (secondsLeft === 0 && value === question.length - 1) {
      setStop(false);
    }
  }, [secondsLeft]);

  const updateValue = () => {
    // const newAnswers = [...answers, selectedOption];
    setAnswers([...answers, selectedOption]);

    if (value === question.length - 1) {
      setStop(false);
      start(0);
    } else {
      setValue(value + 1);
    }
    setSelectedOption("NOT FILL"); // Reset the selected option
  };
  localStorage.setItem("answers", JSON.stringify(answers));
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    // console.log("hey event", event.target.value);
  };

  console.log(answers);

  return (
    <div className="grid grid-cols-2 grid-rows-4 w-full">
      {stop ? (
        <>
          <div className="question col-span-2 row-span-1 bg-slate-800 border-solid border-2 text-center items-center border-green-700 px-36 py-10">
            <div className="question text-4xl">Quiz Application</div>
          </div>
          <div className="question col-span-2 sm:col-span-1  row-span-1">
            <h1 className="flex items-center justify-center text-4xl">
              {data?.question}
            </h1>
          </div>
          <div className="options col-span-2 sm:col-span-1 gap-4 w-full p-9 row-span-1">
            {data?.options?.map((option: string, index: number) => (
              <div key={index} className="options py-1">
                <input
                  type="radio"
                  name={`${value}`}
                  id={`${value}-${index}`}
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                  className="font-semibold text-6xl"
                />
                <label htmlFor={`${value}-${index}`} className="pl-7 text-xl">
                  {option}
                </label>
              </div>
            ))}
          </div>
          <div className="main flex justify-center items-center sm:flex sm:justify-start col-span-2 sm:col-span-1">
            <button
              onClick={updateValue}
              className="bg-green-700 px-3 py-2 text-xl font-semibold rounded-lg ml-3 row-span-1"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div>
          <h1>Quiz Complete!</h1>
          <h2>Your Answers:</h2>
          <ul>
            {answers.map((answer, index) => (
              <li key={index}>
                Question {index + 1}: {answer}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="hey text-white text-balance flex justify-start text-xl items-center">
        {secondsLeft > 0 ? `[${secondsLeft}]` : "Time Left"}
      </div>
    </div>
  );
};

export default QuizCard;
