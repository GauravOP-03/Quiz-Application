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
  const { allInput } = useAllState();
  
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
          option: [...val.incorrect_answers, val.correct_answer].sort(()=>Math.random()-0.5),
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
  }, []);

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
  // }, [timeLeft]);

  const handleNextQuestion = () => {
    if (counter < allQuestion.length - 1) {
      if (selectedOption === allQuestion[counter].correctOption) {
        setScore((prevScore) => prevScore + 1);
      }
      setCounter((prevCounter) => prevCounter + 1);
      setTimeLeft(15);
      setSelectedOption("");
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
    return <div>Loading...</div>;
  }

  if(error){
    return <div>Cannot fetch the Question</div>
  }
  return (
    <div style={{backgroundImage:
          "linear-gradient(to left top, #000020, #171950, #422686, #783069, #b13103)"}} 
          className="w-screen h-screen items-start py-6 px-10 text-justify font-montserrat text-gray-100">
    <div className="h-1/2 flex  flex-col justify-between">

    <div className="flex justify-between">

      <h3>score: {score}</h3>
      {/* <h3>Time Left: {timeLeft}s</h3> */}
      <Timer handleNextQuestion={handleNextQuestion} setTimeLeft={setTimeLeft} timeLeft={timeLeft}/>
      <div>

      <h3 className="p-1 text text-right">{he.decode(allQuestion[counter].category)}</h3>
      <h3 className="p-1 text text-right">Dificulty Level: {allQuestion[counter].difficulty}</h3>
      </div>
    </div>

    <div className="text-center">

      <div>{he.decode(allQuestion[counter].question)}</div>
      
        <Option
          options={allQuestion[counter].option}
          disable={timeLeft <= 5}
          selectOption={selectOption}
          selectedOption={selectedOption}
          />
          </div>
          </div>
    </div>
  );
}
