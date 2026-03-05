'use client';

import React, { useState } from 'react';

const options = [
  {
    id: 'option1',
    label: 'W-9 Form',
    notification: 'For US citizens and residents Uses Social Security Number (SSN)'
  },
  {
    id: 'option2',
    label: 'W-8BEN Form',
    notification: 'For non-US individuals Uses foreign tax identification'
  },
];

export const SelectBox = () => {
  const [selected, setSelected] = useState('option1');

  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => (
        <label
          key={option.id}
          className={`font-['Exo_2'] flex flex-col items-start justify-start gap-3 rounded-[9px] border-2 border-[#BD5DE9] bg-[linear-gradient(0deg,rgba(59,40,99,0)_-174.15%,rgba(104,50,170,0.7)_100%)] shadow-[0_4px_4px_0_rgba(0,0,0,0.4)] min-h-[120px] p-[16px] cursor-pointer transition-opacity w-full ${selected === option.id
            ? 'opacity-100'
            : 'opacity-80'
            }`}
        >
          <div className="checkBox flex flex-row items-center justify-start gap-2">
            <span style={borderStyle.checkboxBorder}>
              {selected === option.id ?
                (
                  <span className="w-4 h-4 bg-[radial-gradient(#C150F2,_#533DCF)] rounded-full border-2 border-[#48227c]" />
                ) : (
                  <span className="w-4 h-4 bg-[#48227c] rounded-full border-2 border-[#48227c]" />
                )
              }
            </span>
            <span className="text-white text-[22px] font-semibold leading-[88%] tracking-[0.88px]">{option.label}</span>
            <input
              type="radio"
              name="selection"
              value={option.id}
              checked={selected === option.id}
              onChange={() => setSelected(option.id)}
              className="sr-only"
            />
          </div>
          <p className="notification pl-[34px] text-white/40 text-[14px] font-semibold leading-[125%] tracking-[0.56px]">
            {option.notification}
          </p>
        </label>
      ))}
    </div>
  );
};

const borderStyle: { [key: string]: React.CSSProperties } = {
  checkboxBorder: {
    borderWidth: "2px",
    border: "2px solid transparent",
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    backgroundImage: "linear-gradient(to right, #bd50f0, #6740d6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundClip: "padding-box",
  }
};
