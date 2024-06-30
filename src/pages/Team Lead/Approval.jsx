import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import Button from "../../components/Button";
import TextInput from "../../components/InputFields/TextInput";
import employee from "../../services/employee";
import RadioInput from "../../components/InputFields/RadioInput";

export const Manager_Leave_Approval = ({ applicationId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [selectedValue, setSelectedValue] = useState("Pending");
  const [comments, setComments] = useState("");
  const [isBtnDisable, setIsBtnDisable] = useState(true);
  const [isReturnBtnDisable, setIsReturnBtnDisable] = useState(true);

  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const role = userInfoData.role;
console.log(role);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleCommentSection = (event) => {
    setComments(event.target.value);
  };



  const deciosnByTeamLead = {
    application_id: applicationId,
    leave_status: selectedValue,
    comments: comments,
    sent_to: selectedValue === "Approved" ? "HR" : "Applicant",
    processing_time: new Date().toISOString(),
  };

  const handleSendToHR = async () => {
    const result = await employee.postDecisionByTeamLead(deciosnByTeamLead);

    setIsBtnDisable(true);

    setTimeout(() => {
      navigate("/dashboard/manager-leave-request");
    }, 1000);
    if (result) {
      // setOpenSnackbar(true);
      enqueueSnackbar("Sent SuccessFully To HR", {
        variant: "success",
      });
      setSelectedValue("Pending");
      setComments("");
    }
  };

  const handleReturnToEmployee = async () => {
    const result = await employee.postDecisionByTeamLead(deciosnByTeamLead);
    setIsReturnBtnDisable(true);
    if (result) {
      enqueueSnackbar(`Sent Successfully to Employee`, {
        variant: "success",
      });
      setSelectedValue("Pending");
      setComments("");
    }
    setTimeout(() => {
      navigate("/dashboard/manager-leave-request");
    }, 1000);
    // handleClose();
  };

  // const handleSendDecisionByTeamLead  = async () =>{
  //   const result = await employee.postDecisionByTeamLead(deciosnByTeamLead);
  //   setIsReturnBtnDisable(true);
  //   if (result) {
  //     setOpenSnackbar(true);
  //     setSelectedValue("Pending");
  //     setComments("");
  //   }
  //   setTimeout(() => {navigate("/dashboard/manager-leave-request")}, 1000);
  // }
  //postDecisionByAdmin
  const deciosnByHR = {
    application_id: applicationId,
    leave_status: selectedValue,
    comments: comments,
    sent_to: "Applicant",
    processing_time: new Date().toISOString(),
  };
  
  //postDecisionByHR
  const handleSendToEmployeeByHr = async () => {
let result;
    try {
      if(role === "HR"){
         result = await employee.postDecisionByHR(deciosnByHR);
        console.log("hr",result);
        setTimeout(() => {
          navigate("/dashboard/hr-leave-request");
        }, 1000);
      }
      else if(role === "Admin"){
     //here decisionByhr and admin decison objects are same.....
        result = await employee.postDecisionByAdmin(deciosnByHR);
        // console.log("admin",result);
        setTimeout(() => {
          navigate("/dashboard/admin-pending-request");
        }, 1000);
      }
      
         if (result) {
           enqueueSnackbar(`Sent SuccessFully To Employee`, {
             variant: "success",
           });
           setSelectedValue("Pending");
           setComments("");

       
         }
    } catch (error) {
      enqueueSnackbar(`Something went wrong`, {
        variant: "error",
      });
    }

   
  };

  useEffect(() => {
    if (selectedValue === "Approved") {
      setIsBtnDisable(false);
      setIsReturnBtnDisable(true);
    } else if (selectedValue === "Rejected") {
      setIsReturnBtnDisable(false);
      setIsBtnDisable(true);
    }
  }, [selectedValue]);

  return (
    <div className="flex flex-col  space-y-3">
      {/* { openSnackBar &&
          <ShowSnackbar
            open={openSnackBar}
            handleClose={handleSnackBarClose}
            text={"Sent SuccessFully"}
          />
        } */}
      <div className="flex   flex-col sm:flex-row justify-between items-baseline   sm:items-center">
        {/* <p>Give Your Decision </p>  */}

        <div className="flex  flex-col sm:flex-row">
          <RadioInput
            label="Approved"
            value={"Approved"}
            color={"success"}
            onchange={handleChange}
            selectedValue={selectedValue}
          />
          <RadioInput
            label="Rejected"
            value={"Rejected"}
            color={"error"}
            onchange={handleChange}
            selectedValue={selectedValue}
          />
        </div>
      </div>

      <TextInput
        rows={3}
        multiline={true}
        onchange={handleCommentSection}
        placeholder="Add comment ..."
        value={comments}
      />

      {role !== "HR" && role !== 'Admin' ? (
        <div className="grid grid-cols-2 place-content-center gap-4 ">
          <Button
            fontWeight="semibold"
            textColor="white"
            // btnText="Send to HR"
            width="full"
            type="submit"
            backgroundColor={isBtnDisable ? "bg-gray" : "bg-green"}
            padding={"p-3"}
            onClick={handleSendToHR}
            disable={isBtnDisable}
          >
            Send to HR
          </Button>
          <Button
            fontWeight="semibold"
            textColor="white"
            // btnText="Return to Employee"
            width="full"
            type="submit"
            backgroundColor={isReturnBtnDisable ? "bg-gray" : "bg-red"}
            padding={"p-3"}
            onClick={handleReturnToEmployee}
            disable={isReturnBtnDisable}
          >
            Return to Employee
          </Button>
        </div>
      ) : (
        <Button
          fontWeight="semibold"
          textColor="white"
          width="full"
          type="submit"
          backgroundColor={
            selectedValue === "Approved" || selectedValue === "Rejected"
              ? "bg-blue-light"
              : "bg-gray"
          }
          padding={"p-3"}
          cursor={
            selectedValue === "Approved" || selectedValue === "Rejected"
              ? "cursor-pointer"
              : "cursor-not-allowed"
          }
          onClick={handleSendToEmployeeByHr}
          disable={selectedValue !== "Approved" && selectedValue !== "Rejected"}

          // disable={selectedValue !== 'Approved' || selectedValue !== 'Rejected'}
        >
          Send to Employee
        </Button>
      )}
    </div>
  );
};
