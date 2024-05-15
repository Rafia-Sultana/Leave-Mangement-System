import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router-dom";

const HeadLine = ({text}) => {
  const navigate = useNavigate();
    return (
  //       <h2
  //       className="text-2xl text-center font-semibold text-gray-darker
  //  underline decoration-2 decoration-blue-dark 
  //  underline-offset-8 mt-5 mb-8"
  //     >
  //       {text}
  //     </h2>
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