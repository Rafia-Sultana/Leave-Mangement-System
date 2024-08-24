import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import Button from "../../components/Button";
import TextInput from "../../components/InputFields/TextInput";
import employee from "../../services/employee";
import RadioInput from "../../components/InputFields/RadioInput";
import { CircularProgress } from "@mui/material";

export const Manager_Leave_Approval = ({ applicationId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [selectedValue, setSelectedValue] = useState("Pending");
  const [comments, setComments] = useState("");
  const [isBtnDisable, setIsBtnDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const role = userInfoData.role;

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleCommentSection = (event) => {
    setComments(event.target.value);
  };

  const decision = {
    application_id: applicationId,
    leave_status: selectedValue,
    comments: comments,
    processing_time: new Date().toISOString(),
  };

  const handleSend = async () => {
    let result;
    setLoading(true);

    try {

      if (role === "Team Lead") {
        result = await employee.postDecisionByTeamLead(decision);
        setTimeout(() => {
          navigate("/dashboard/manager-leave-request");
        },500);
        
      } 
      else if (role === "Line Manager") {
        result = await employee.postDecisionByLineManager(decision);
        console.log(result);
        setTimeout(() => {
          navigate("/dashboard/admin-pending-request");
        }, 500);
      } 
      
      else if (role === "HR") {
        result = await employee.postDecisionByHR(decision);
        console.log("hr", result);
        setTimeout(() => {
          navigate("/dashboard/hr-leave-request");
        }, 500);

      }
       else if (role === "Admin") {
        result = await employee.postDecisionByAdmin(decision);
        setTimeout(() => {
          navigate("/dashboard/admin-pending-request");
        }, 500);
      }

      setIsBtnDisable(true);

      if (result) {
        enqueueSnackbar("Sent SuccessFully", {
          variant: "success",
        });
        setSelectedValue("Pending");
        setComments("");
      }

    } catch (error) {
      enqueueSnackbar(`Something went wrong`, {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedValue === "Approved" || selectedValue === "Rejected") {
      setIsBtnDisable(false);
    }
  }, [selectedValue]);

  return (
    <div className="flex flex-col  space-y-3">
      <div className="flex   flex-col sm:flex-row justify-between items-baseline   sm:items-center">
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

      <div className="grid grid-cols-1 place-content-center gap-4 ">
        <Button
          fontWeight="semibold"
          textColor="white"
          width="full"
          type="submit"
          backgroundColor={isBtnDisable ? "bg-gray" : "bg-green"}
          padding={"p-3"}
          onClick={handleSend}
          disable={isBtnDisable}
          cursor={loading ? "cursor-not-allowed" : "cursor-pointer"}
        >
          {loading ? <CircularProgress size={20}/> : "Submit"}
        </Button>
      </div>
    </div>
  );
};
