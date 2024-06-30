import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "../../components/Button";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import employee from "../../services/employee";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context api/Context";
import { useSnackbar } from "notistack";

const Leave_Details = ({ info, editButton }) => {
  // const [leaveTypes, setLeaveTypes] = useState(null);

  // const isSmallScreen = useMediaQuery("(max-width:600px)");
  // const navigate = useNavigate();
  // console.log(info);
  const { enqueueSnackbar } = useSnackbar();
  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const role = userInfoData?.role;
  const {
    delegated_to,
    leave_name,
    reason,
    application_date,
    leave_status,
    start_date,
    end_date,
    total_days,
    application_id,
  } = info;

  const [files_, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let newFiles = await employee.getNewFiles(application_id);
      setFiles(newFiles);
    };

    fetchData();
  }, []);

  const viewPdfFile = async (fileId) => {
    const fileUrl = await employee.getFiles(Number(fileId));
    console.log(fileUrl);
    const encodedFileUrl = encodeURIComponent(fileUrl);
    window.open(`/files/${fileId}?fileUrl=${encodedFileUrl}`, "_blank");
  };

  const handleDeleteFile = async (fileId) => {
    try {
      const result = await employee.deleteFiles(Number(fileId));
      console.log(result);
      if (result) {
        enqueueSnackbar(`File Deleted Successfully`, {
          variant: "success",
        });
      }
      let updatedFiles = files_.filter((file) => file.file_id !== fileId);
      setFiles(updatedFiles);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-full relative" sx={{ backgroundColor: "#E8F7FF" }}>
      <CardContent className="  mx-2 mb-2 rounded-md">
        <Box className="grid  grid-cols-2 gap-5 ">
          <div className="col-span-2">
            <p className="font-semibold">Reason</p>
            
            <p className="text-sm">{reason}</p>
          </div>
          {role==="Employee" && leave_status==="Approved" || info.showEditButton === false ? null : (
            <div className="absolute  top-2 right-5 ">
              <Button
                // btnText={"Edit"}
                btnIcon={EditOutlinedIcon}
                textColor={"blue"}
                onClick={editButton}
                padding={"p-2"}
              >
                Edit
              </Button>
            </div>
          )}

          {/* <div>
                <p className="font-semibold">Total Days</p>
                <p className="text-sm">{total_days}</p>
              </div> */}
          {/* {isSmallScreen && (
             
    
         
          )} */}

          {/* {isclickedEditBtn ? (
            <AutoComplete
              options={leaveTypes}
              label={"Leave Type"}
              field={"leave_type_id"}
              handleInputChange={handleInputChange}
    
            />
          ) : (
           
          )} */}

          <div>
            <p className="font-semibold">Start Date</p>
            <p className="text-sm">{start_date}</p>
          </div>
          <div>
            <p className="font-semibold">End Date</p>
            <p className="text-sm">{end_date}</p>
          </div>
          {/* <div>
            <p className="font-semibold">Delegated To</p>
            <p className="text-sm">{delegated_to}</p>
          </div> */}
          <div>
            <p className="font-semibold">Leave Type</p>
            <p className="text-sm">{leave_name}</p>
          </div>
          <div>
            <p className="font-semibold">Application Date</p>
            <p className="text-sm">{application_date}</p>
          </div>
        </Box>

        {files_.length > 0 && (
          <div className="mt-5 space-y-1">
            <p className="font-semibold">Supportive Documents</p>
            <div className="">
              <TableContainer
                sx={{
                  "& .css-dsuxgy-MuiTableCell-root": {
                    padding: 0,
                  },
                }}
              >
                <Table size="small">
                  <TableBody>
                    {files_.map((file, index) => (
                      <TableRow key={index}>
                        <TableCell>{file.file_name}</TableCell>

                        <TableCell>
                          <Button
                            padding={"p-1"}
                            onClick={() => viewPdfFile(file.file_id)}
                            textColor="blue"
                          >
                            View
                          </Button>

                          {
                            role === "Employee"  && leave_status==="Pending" &&
                            <Button
                            padding={"p-1"}
                            onClick={() => handleDeleteFile(file.file_id)}
                            textColor="red-dark"
                          >
                            Delete
                          </Button>
                          }
                  
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Leave_Details;
