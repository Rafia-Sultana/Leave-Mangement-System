import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import employee from "../services/employee";
import { UserContext } from "../context api/Context";

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: "#00000",
      width: 70,
      height: 70,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const Avatars = ({ width, height }) => {
  const proImg = useSelector((state) => state.profileImage.profileImage);
  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const empId = userInfoData?.emp_id;
  const [userData, setUserData] = React.useState(null);
//  const {loading,setLoading}= React.useContext(UserContext);
 const [loading,setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        const userBasicData = await employee.basicInfo(empId);
        setUserData(userBasicData);
     
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
      {!loading && userData ? (
        <Avatar
          src={ `https://tillerbd.com:4040${userData.profile_img}?timestamp=${Date.now()}`}
          sx={{ width: width, height: height }}
        />
      ) : (
        <p className="loading loading-spinner text-center"></p>
      )}
    </div>
  );
};

export default Avatars;