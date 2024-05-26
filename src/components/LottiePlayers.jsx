import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
const LottiePlayers = ({ src }) => {
  return (
    <Player
      src={src}
      className="player"
      loop
      autoplay
      speed={5}
    //   sx={{
    //     height:{xs:'150px', sm:"200px", lg:'300px'},
    //     width:{xs:'100px', sm:"150px", lg:'200px'},
    //     marginTop: "100px",
    //     transition:"all"
    
    // }}
     style={{ height: "300px", width: "200px", marginTop: "100px" }}
    />
  );
};

export default LottiePlayers;
