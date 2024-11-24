import he from "he";
import React from "react";

interface OptionProps {
  options: string[];
  selectOption: (value: string) => void;
  selectedOption: string | number | undefined;
  disable: boolean;
}

function Option({
  options,
  selectOption,
  selectedOption,
  disable,
}: OptionProps) {
  return (
    <div>
      {options.map((option, index) => (
        <label key={index}>
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
}

export default React.memo(Option);
