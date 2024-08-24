import * as React from "react";
import { useState, useEffect } from "react";
import Button from "./Button";
import SelectInput from "./InputFields/SelectInput";
import employee from "../services/employee";
import { useSnackbar } from "notistack";
import AutoComplete from "./InputFields/AutoComplete";

const Stepper = () => {
  //emp_id, step_no, step_emp_id, is_final
  const initialSteps = {
    step_no: 0,
    step_emp_id: "",
    is_final: false,
  };

  const [applicationSteps, setApplicationSteps] = useState([
    { ...initialSteps, step_no: 0 },
    { ...initialSteps, step_no: 1 },
  ]);
  const [nameList, setNameList] = useState([]);
  const [isSubmitDisable, setIsSubmitDisable] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const handleEmpNameChange = (e, newValue, index, name) => {
  //   const { name, value } = e.target;
  //   console.log(name,value);
    const selectStepEmpId = nameList.find((emp) => emp.name === newValue);
    const step_emp_id = selectStepEmpId.emp_id;

    setApplicationSteps((prevSteps) =>
      prevSteps.map((step, i) =>
        i === index ? { ...step, [name]: step_emp_id } : step
      )
    );
   if(applicationSteps[0].step_emp_id){
    setIsSubmitDisable(false);
   }
  console.log(newValue,index,name);
  
  };

  // console.log(applicationSteps);

  const handleStepSubmit = async() => {
    const getEmpId = applicationSteps[0].step_emp_id;
    let p = applicationSteps.map((step) => ({ ...step, emp_id: getEmpId, step_emp_id: Number(step.step_emp_id)}));
    p[p.length - 1].is_final = true;
   let res = await employee.postAplicationStepsByHR(p.slice(1));
   if(!res.success){
     enqueueSnackbar("Something went wrong, please try again", {
      variant: "error",
    });
   }else{
    enqueueSnackbar(`Application Steps submitted SuccessFully`, {
      variant: "success",
    });
     setIsSubmitDisable(true);
     setApplicationSteps([
      {...initialSteps, step_no: 0 },
      {...initialSteps, step_no: 1 },
    ]);
   }
   console.log(p.slice(1));
  };

  useEffect(() => {
    const fetchNameList = async () => {
      let nameList = await employee.getEmployeeNameListByHR();
      setNameList(nameList);
    };
    fetchNameList();
  }, []);

  return (
    <section className="relative space-y-5">
      <section className="flex gap-5">
        <div className="progress-steps mt-4">
          {applicationSteps.map((step, index) => (
            <div key={index} className="step">
              <div
                className={`step-circle  ${
                  index + 1 === applicationSteps.length ? "activee" : ""
                }                       `}
              >
                {index=== 0?"": index}
              </div>
              {index !== applicationSteps.length - 1 && (
                <div className="step-line"></div>
              )}
            </div>
          ))}
        </div>

        <div className="w-full  sm:w-1/2 ">
          {applicationSteps.map((step, index) => (
            <div key={index} className="py-[10px]">
              {/* <SelectInput
                options={nameList.map((emp) => emp.name)}
                placeholder={`Select ${
                  index === 0 ? "Employee" : "Line Manager/Team Lead/HR"
                }`}
                getSelectedValue={(e) => handleEmpNameChange(e, index)}
                name="step_emp_id"
                value={
          
                  nameList.find((emp) => emp.emp_id === step.step_emp_id)?.name || ""
                } 
                variant="standard"
              /> */}
                <AutoComplete
                options={nameList.map((emp) => emp.name)}
                label={`Select ${
                  index === 0 ? "Employee" : "Line Manager/Team Lead/HR"
                }`}
                handleInputChange={handleEmpNameChange}
                name="step_emp_id"
                value={
          
                  nameList.find((emp) => emp.emp_id === step.step_emp_id)?.name || ""
                } 
                field={index}
                variant="standard"
                required={false}
              />
            </div>
          ))}
          <div className="flex justify-center gap-4">
            <Button
              fontSize={"bold"}
              textColor="white"
              backgroundColor={"bg-gray"}
              padding={"p-1"}
              // btnIcon={KeyboardArrowLeftIcon}
              onClick={() =>
                setApplicationSteps((prevSteps) =>
                  prevSteps.length > 2
                    ? prevSteps.slice(0, prevSteps.length - 1)
                    : prevSteps
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
                  { ...initialSteps, step_no: applicationSteps.length },
                ])
              }
            >
              Add Steps
            </Button>
            <Button
              backgroundColor={"bg-blue-light"}
              padding={"p-1"}
              cursor={"cursor-pointer"}
              onClick={handleStepSubmit}
             disable={isSubmitDisable}
            >
              Submit
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Stepper;
