import * as React from "react";
import { useState } from "react";
import Button from "./Button";
import SelectInput from "./InputFields/SelectInput";

const Stepper = () => {
  const initialSteps = {
    step_count: 0,
    step_emp_name: "",
    isFinal: false,
  };
  const [applicationSteps, setApplicationSteps] = useState([initialSteps]);
  const [count, setCount] = useState(1);

  const employeeList = ["a", "b", "c", "d", "e"];

  const handleEmpNameChange = (e, index) => {
    const { name, value } = e.target;
    setApplicationSteps((prevSteps) =>
      prevSteps.map((step, i) =>
        i === index ? { ...step, [name]: value } : step
      )
    );
  };

  console.log(applicationSteps);

  const handleStepSubmit = () => {
    const getEmpName = applicationSteps[0].step_emp_name;
    let p = applicationSteps.map((step) => ({ ...step, emp_name: getEmpName }));
    console.log(p.slice(1));
  };
  return (
    <section className="space-y-5">
          <div className="flex justify-end gap-4">
          <Button
            fontSize={"bold"}
            textColor="white"
            backgroundColor={"bg-gray"}
            padding={"p-1"}
            // btnIcon={KeyboardArrowLeftIcon}
            onClick={() =>
              setApplicationSteps((prevSteps) =>
                prevSteps.slice(0, prevSteps.length - 1)
              )
            }
          >
            Back
          </Button>
          <Button
            fontSize={"bold"}
            textColor="white"
            padding={"p-1"}
            backgroundColor={"bg-blue-lightest"}
            // btnIcon={KeyboardArrowRightIcon}
            onClick={() =>
              setApplicationSteps((prevSteps) => [
                ...prevSteps,
                { ...initialSteps, step_count: applicationSteps.length },
              ])
            }
          >
            Add Steps
          </Button>
      
      </div>
         <div className="progress-steps">
        {applicationSteps.map((step, index) => (
          <div
            key={index}
            className={`step ${
              index + 1 === applicationSteps.length ? "activee" : ""
            }`}
          >
            <div className="step-circle">{index + 1}</div>
            {index !== applicationSteps.length - 1 && (
              <div className="step-line"></div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex gap-5">
        {Array.from({ length: applicationSteps.length }, (_, index) => (
          <div key={index} className="w-24">
            <SelectInput
              options={employeeList.map((emp) => emp)}
              placeholder={`Name`}
              getSelectedValue={(e) => handleEmpNameChange(e, index)}
              name={"step_emp_name"}
              variant="standard"
            />
          </div>
        ))}
      </div>
 
      <Button
        backgroundColor={"bg-blue-light"}
        padding={"p-3"}
        width={"1/2"}
        cursor={"cursor-pointer"}
        onClick={handleStepSubmit}
      >
        SUBMIT
      </Button>
    </section>
  );
};

export default Stepper;
