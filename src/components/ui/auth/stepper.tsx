import React from "react";
import { FaCheckCircle, FaGift } from "react-icons/fa";

const Stepper = ({ currentStep = 2 }) => {
  const steps = [
    { icon: currentStep > 1 ? <FaCheckCircle className="text-green-400" /> : null, label: "1", completed: currentStep > 1 },
    { icon: currentStep > 2 ? <FaCheckCircle className="text-green-400" /> : null, label: "2", completed: currentStep > 2 },
    { icon: currentStep > 3 ? <FaCheckCircle className="text-green-400" /> : null, label:"3", completed: currentStep > 3 },
    { icon: <FaGift />, completed: currentStep > 4 },
  ];

  return (
    <div className="relative flex items-center justify-center !mt-2 !mb-3 bg-transparent">
      <div className="absolute top-1/2 left-6 right-6 h-[1px] bg-white z-0 transform -translate-y-1/2" />
      <div className="flex items-center justify-between w-full max-w-4xl z-10 px-6">
        {steps.map((step, index) => (
          <div key={index} className="relative flex items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-[1px] backdrop-blur-xl ${
                step.completed || index + 1 === currentStep ? "border-green-400 text-white" : "border-white text-white"
              } z-10`}
            >
              {step.icon  ? step.icon : <span className="text-lg font-bold font-['Exo_2'] text-center">{step.label}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
