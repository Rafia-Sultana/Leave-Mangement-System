import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import employee from "../services/employee";
import { UserContext } from "../context api/Context";



const Avatars = ({ width, height }) => {
  const proImg = useSelector((state) => state.profileImage.profileImage);

  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const empId = userInfoData?.emp_id;
  const [userData, setUserData] = React.useState(null);

 const [loading,setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const userBasicData = await employee.basicInfo(empId);
         let splitedImgArr = userBasicData.profile_img.split("/");
        if(splitedImgArr[3]!=="null"){
        setUserData(userBasicData);
        }
     
      } catch (error) {
        console.log(error);
      }
      finally{
        setLoading(false)
    // setTimeout(()=>{setLoading(false)},500)
      }
    };
    if (empId) {
      fetchData();
    }
  }, [empId, proImg]);


  return (
    <div>
      {!loading  ? (
        <Avatar
          src={ `https://tillerbd.com:4040${userData!==null?userData.profile_img:"/null"}`}
          sx={{ width: width, height: height }}
        />
      ) : (
        <p className="loading loading-spinner text-center"></p>
      )}
    </div>
  );
};

export default Avatars;