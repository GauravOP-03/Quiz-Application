import he from "he";
import React from "react";

interface OptionProps {
  options: string[];
  selectOption: (value: string) => void;
  selectedOption: string | number | undefined;
  disable: boolean;
}

const Option: React.FC<OptionProps> = React.memo(
  ({ options, selectOption, selectedOption, disable }: OptionProps) => {
    console.log("option rendered");

    let uOption = [];
    let lOption = [];
    let l = options.length / 2;
    for (let i = 0; i < l; i++) {
      uOption.push(options[i]);
      lOption.push(options[i + l]);
    }

    console.log(uOption);
    console.log(lOption);

    return (
      <div className="flex flex-wrap justify-center gap-6 p-4 ">
        {/* Upper Half of Options */}
        <div className="flex flex-wrap justify-evenly gap-6 w-full md:w-5/6  mt-20">
          {uOption.map((option, index) => (
            <label
              key={index}
              className="flex items-center border-2 border-gray-300 rounded-lg p-3 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-100 disabled:opacity-50 hover:text-gray-800 disabled:cursor-not-allowed text-lg font-semibold w-2/5"
            >
              <input
                type="radio"
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={() => selectOption(option)}
                disabled={disable}
                className="mr-2 h-5 w-5 accent-blue-600"
              />
              <span className="text-lg">{he.decode(option)}</span>
            </label>
          ))}
        </div>

        {/* Lower Half of Options */}
        <div className="flex flex-wrap justify-evenly gap-6 w-full  md:w-5/6">
          {lOption.map((option, index) => (
            <label
              key={index}
              className="flex items-center border-2 border-gray-300 rounded-lg p-3 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-800 font-semibold w-2/5"
            >
              <input
                type="radio"
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={() => selectOption(option)}
                disabled={disable}
                className="mr-2 h-5 w-5 accent-blue-600"
              />
              <span className="text-lg">{he.decode(option)}</span>
            </label>
          ))}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Compare the options and selectedOption specifically
    return (
      prevProps.options === nextProps.options &&
      prevProps.selectedOption === nextProps.selectedOption &&
      prevProps.disable === nextProps.disable
    );
  }
);

export default Option;
