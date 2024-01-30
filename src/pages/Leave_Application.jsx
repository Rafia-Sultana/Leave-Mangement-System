import React, { useContext, useEffect, useState ,useRef} from "react";
import Button from "../components/Button.jsx";
import InputField from "../components/InputField.jsx";
import Label from "../components/Label.jsx";
import { MyContext } from "../context api/Context";
const Leave_Application = () => {
  const {allFormData,setAllFormData} = useContext(MyContext);
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  let currentDate = `${day}-${month}-${year}`;
  const initialState = {
    leaveType: "",
    from: "",
    to: "",
    numberOfDays: "",
    join: "",
    file: null,
    reasonsForLeave: "",
    delegetedFor: "",
  };
  const [formData, setFormData] = useState(initialState);
  // const [allFormData,setAllFormData] = useState([])
  const currentIdRef = useRef(1);
  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? console.log(files[0]) : (value),
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const currentFormData = { ...formData ,id:currentIdRef.current};
  setFormData(initialState);
  setAllFormData((prevArray)=>[...prevArray,currentFormData]);
  
currentIdRef.current+=1;

  };

  useEffect(()=>{
    //  console.log(allFormData);
    console.log(formData.file);
  },[allFormData])
  const {leaveType,
    from,
 
     to,
 numberOfDays,
    join,
    file,
    reasonsForLeave,
 delegetedFor}=formData;
  return (
    <div className="">
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
          Leave Application
        </h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mt-4">
            <Label label="Leave Type" />
            <select
              name="leaveType"
value={leaveType}
              onChange={handleChange}
              className="block w-full mt-2 p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              <option>Vacation</option>
              <option>Sick Leave</option>
              <option>Maternity/Paternity Leave</option>
              <option>Other</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <Label label="From" />
              <InputField
                type="date"
                name="from"
                value={from}
                placeholder=""
                onChange={handleChange}
              />
            </div>
            <div>
              <Label label="To" />
              <InputField
                type="date"
                name="to"
                value={to}
                placeholder=""
                onChange={handleChange}
              />
            </div>
            <div>
              <Label label="Number of Days Applied for" />
              <InputField
                type="number"
                name="numberOfDays"
             
                value ={numberOfDays}
                placeholder=""
                onChange={handleChange}
              />
            </div>
            <div>
              <Label label="Date of Joining" />
              <InputField
                type="date"
                name="join"
                value={join}
                placeholder=""
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label label="Attach File" />

              <InputField
                type="file"
                name="file"
                value={file}
                placeholder=""
                onChange={handleChange}
                accept='.doc, .docx, .pdf'
              />
            </div>
            <div className="">
              <Label label="Application Date" />

              <p className="border p-[0.9rem] rounded">{currentDate}</p>
            </div>
          </div>

          <div className="mt-4">
            <Label label="Reasons for leave" />
            <textarea
              name="reasonsForLeave"
              value={reasonsForLeave}
              onChange={handleChange}
              className="block w-full mt-2 p-3 h-24 border
           border-gray-300 rounded-md dark:bg-gray-700
            dark:border-gray-600 focus:outline-none focus:border-green-600"
            />
          </div>
          <div className="mt-4">
            <Label label="In my absence my responsibilities will be delegated to my collegue" />

            <InputField
              type="text"
              name="delegetedFor"
              value={delegetedFor}
              placeholder="Enter name..."
              onChange={handleChange}
            />
          </div>

          <div className="mt-6">
            <Button
              bgColor="black"
              fontSize="bold"
              textColor="pink-500"
              btnText="SUBMIT"
              width="full"
              type="submit"
            ></Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Leave_Application;
