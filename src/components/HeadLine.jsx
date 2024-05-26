import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router-dom";

const HeadLine = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center ">
      <ArrowBackIosNewOutlinedIcon
        className="cursor-pointer"
        onClick={() => navigate(-1)}
      />
      <h2 className="font-bold text-xl p-4">{text}</h2>
    </div>
  );
};

export default HeadLine;
