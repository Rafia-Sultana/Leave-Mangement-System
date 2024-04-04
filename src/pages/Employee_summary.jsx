import React, { useState } from "react";
import Button from "../components/Button.jsx";

const Employee_summary = () => {

    const initialValue ={
        leaveStatus: '',
        managerComment: ''
    }

    const [inputValues,setInputValues] = useState(initialValue);
    const handleInputChange = (event) =>{
 const {name,value}= event.target;
 setInputValues({...inputValues,[name]:value});
    }
    const handleSubmitClick = () =>{
        console.log(inputValues);
    }
  return (
    <div>
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th class="py-2  border-b">Start Date</th>
            <th class="py-2  border-b">End Date</th>
            <th class="py-2  border-b">Total</th>
            <th class="py-2  border-b">Type</th>
            <th class="py-2  border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-gray-100">
            <td class="py-2 px-4 border-b">12-3-8</td>
            <td class="py-2 px-4 border-b">12-3-8</td>
            <td class="py-2 px-4 border-b">12-3-8</td>
            <td class="py-2 px-4 border-b">12-3-8</td>
            <td class="py-2 px-4 border-b">12-3-8</td>
          </tr>
        </tbody>
      </table>


      <div className="grid grid-cols-4 gap-4 items-center">
                <p className="col-span-1 font-bold text-lg">Leave:</p>

                <div className="flex gap-2">
                    <input
                        type="radio"
                        name="leaveStatus"
                        id="approve"
                        value="Approved"
                        className="radio radio-info"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="approve">Approve</label>
                </div>

                <div className="flex gap-2">
                    <input
                        type="radio"
                        name="leaveStatus"
                        id="deny"
                        value="denied"
                        className="radio radio-info"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="deny">Deny</label>
                </div>

                <div className="flex gap-2">
                    <input
                        type="radio"
                        name="leaveStatus"
                        id="request-info"
                        value="requested more information"
                        className="radio radio-info"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="request-info">Request More Information</label>
                </div>
            </div>

            <div>
                <textarea
                    name="managerComment"
                    id="managerComment"
                    cols="150"
                    rows="4"
                    placeholder="Enter your comments here"
                    onBlur={handleInputChange}
                ></textarea>
            </div>
      <Button
   
        fontSize="bold"
        textColor="black"
        btnText="submit"
        width="full"
        type="submit"
     onClick={handleSubmitClick}
  
      />
    </div>
  );
};

export default Employee_summary;
