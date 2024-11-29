import "@fontsource/montserrat";
import { useAllState } from "../Hooks/useAllState";
import { fetchQuizQuestions } from "../Data/Api";
import { useEffect, useState } from "react";
import he from "he";
import Option from "../Components/Option";
import Timer from "../Components/Timer";

interface questionType {
  question: string;
  difficulty: string;
  category: string;
  option: string[];
  correctOption: string | number;
}

interface valType {
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
  difficulty: string;
  category: string;
}
export default function Question() {
  const { allInput, randomValue } = useAllState();

  // console.log(allInput);
  const [allQuestion, setAllQuestion] = useState<questionType[]>([]);

  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    string | number | undefined
  >();

  useEffect(() => {
    // console.log("qorlinng");
    const getQuestions = async () => {
      try {
        const data = await fetchQuizQuestions(
          allInput.question,
          allInput.category
        );
        console.log("Fetched data:", data);
        const formattedQuestions = data.map((val: valType) => ({
          question: val.question,
          difficulty: val.difficulty,
          category: val.category,
          option: [...val.incorrect_answers, val.correct_answer].sort(
            () => Math.random() - 0.5
          ),
          correctOption: val.correct_answer,
        }));

        setAllQuestion(formattedQuestions);
        setLoading(false);
        console.log(allInput);
      } catch (err) {
        setError(true);
        console.error(err);
      }
    };

    getQuestions();
  }, [allInput]);

  // function handleOnchange(
  //   e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>
  // ) {
  //   const target = e.target as HTMLInputElement; // Explicitly cast e.target

  //   if (timeLeft < 5) {
  //     if (allQuestion[counter].correctOption == target.value) {
  //       setScore(score + 1);
  //     }
  //   }
  //   console.log(target.value);
  // }

  // useEffect(() => {
  //   if (timeLeft > 0) {
  //     const timer = setInterval(() => {
  //       setTimeLeft((prev) => prev - 1);
  //     }, 1000);
  //     return () => clearInterval(timer); // Cleanup on unmount or reset
  //   } else {
  //     // Move to next question when time runs out

  //     handleNextQuestion();
  //   }
  // }, [timeLeft])

  const [random, setRandom] = useState(0);
  const handleNextQuestion = () => {
    if (counter < allQuestion.length - 1) {
      if (selectedOption === allQuestion[counter].correctOption) {
        setScore((prevScore) => prevScore + 1);
      }
      setCounter((prevCounter) => prevCounter + 1);
      setTimeLeft(20);
      setSelectedOption("");
      setRandom(randomValue(8));
    } else {
      alert(`Quiz finished! Your score is: ${score}`);
      // Optionally reset or redirect
    }
  };

  function selectOption(value: string | number) {
    setSelectedOption(value);
    console.log(selectedOption);
  }

  if (loading) {
    return (
      <div
        className="flex flex-col justify-center items-center h-screen"
        style={{
          backgroundImage:
            "linear-gradient(to left top, #000020, #171950, #422686, #783069, #b13103)",
        }}
      >
        <div className="relative">
          <div className="w-24 h-24 border-4 border-t-6 border-l-6 border-r-6 border-solid rounded-full animate-spin border-blue-400 border-t-indigo-600 border-l-pink-500 border-r-yellow-500"></div>
        </div>
        <div className="text-gray-200 text-lg mt-5 font-semibold">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex justify-center items-center h-screen p-6"
        style={{
          backgroundImage:
            "linear-gradient(to left top, #000020, #171950, #422686, #783069, #b13103)",
          backgroundSize: "cover",
        }}
      >
        <div className="bg-opacity-70 bg-black text-white p-8 rounded-xl shadow-xl max-w-lg w-full">
          <div className="flex flex-col items-center text-center space-y-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-red-500  rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 12H6"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v12"
              />
            </svg>
            <p className="text-2xl font-semibold text-red-500">
              Oops! Something went wrong.
            </p>
            <p className="text-lg text-gray-300">
              We couldn't fetch the question at this time. Please try again
              later.
            </p>
          </div>
        </div>
      </div>
    );
  }


  const bgColor = [
    "linear-gradient(to left top, #000020, #171950, #422686, #783069, #b13103)",
    "linear-gradient(to right top, #000020, #171950, #422686, #783069, #b13103)",
    "linear-gradient(to right bottom, #000020, #171950, #422686, #783069, #b13103)",
    "linear-gradient(to bottom, #000020, #171950, #422686, #783069, #b13103)",
    "linear-gradient(to left, #000020, #171950, #422686, #783069, #b13103)",
    "linear-gradient(to top, #000020, #171950, #422686, #783069, #b13103)",
    "linear-gradient(to right, #000020, #171950, #422686, #783069, #b13103)",
    "linear-gradient(to left top, #000020, #171950, #422686, #783069, #b13103)",
    // "linear-gradient(to left top, #000020, #171950, #422686, #783069, #b13103)",
  ]
  
  
  

  return (
    <div
    style={{
      backgroundImage: bgColor[random], // No need for curly braces around bgColor[0]
      position:"fixed",
      overflowY:'auto'
    }}
      className="w-screen h-screen items-start py-6  px-3 sm:px-10 text-justify font-montserrat text-gray-100"
    >
      <div className="h-full flex  flex-col">
        <div className="flex justify-between  text-xs  sm:font-medium  sm:text-lg">
          <div className="sm:flex justify-between w-1/2  ">

          <h3>score: {score}</h3>
          {/* <h3>Time Left: {timeLeft}s</h3> */}
          <Timer
            handleNextQuestion={handleNextQuestion}
            setTimeLeft={setTimeLeft}
            timeLeft={timeLeft}
            />
            </div>
          <div>
            <h3 className=" sm:p-1 text text-right">
              {he.decode(allQuestion[counter].category)}
            </h3>
            <h3 className="sm:p-1 text text-right">
              Difficulty Level: {allQuestion[counter].difficulty}
            </h3>
          </div>
        </div>

        <div className="text-center translate-y-24">
          <div className="text-2xl sm-text-3xl sm-font-semibold">
            {he.decode(allQuestion[counter].question)}
          </div>

          <Option
            options={allQuestion[counter].option}
            disable={timeLeft <= 5}
            selectOption={selectOption}
            selectedOption={selectedOption}
          />
          <button
            onClick={handleNextQuestion}
            className=" px-4 py-2 text-base sm:text-lg font-semibold text-white bg-purple-500 rounded-lg hover:shadow-[0_0_10px_rgba(128,90,213,0.7)] hover:bg-purple-600 transition-all duration-300 my-12 w-1/2 sm:w-1/3"
          >
            {allInput.question-1 === counter? "SUBMIT": 'Next Question' }
            
          </button>
        </div>
      </div>
    </div>
  );
}
