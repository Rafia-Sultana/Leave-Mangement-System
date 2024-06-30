import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router-dom";

const HeadLine = ({ text ,num=-1}) => {
  const navigate = useNavigate();
  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const role = userInfoData.role;

  return (
    <div className="flex items-center ">
      <ArrowBackIosNewOutlinedIcon
        className="cursor-pointer"
        onClick={() => navigate(num)}
      />
      <h2 className="font-bold text-xl p-4">{text}</h2>
    </div>
  );
};

export default HeadLine;
