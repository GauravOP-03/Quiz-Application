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
    console.log("option rendered")
    return (
      <div className="bg-white rounded-full w-4 h-4 border-2 border-gray-500 checked:bg-blue-300">
        {options.map((option, index) => (
          <label key={index} className="mx-6">
            <input
              type="radio"
              name="option"
              value={option}
              checked={selectedOption === option}
              onChange={() => selectOption(option)}
              disabled={disable}
            />
            {he.decode(option)}
          </label>
        ))}
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
