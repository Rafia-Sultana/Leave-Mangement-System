import React from 'react';
import { Player } from "@lottiefiles/react-lottie-player";
const LottiePlayers = ({src,height,width}) => {

    return (
 <Player
        src={src}
        className="player"
        loop
        autoplay
        speed={5}
       style={{ height: "300px", width: "300px", marginTop: "100px" }}
      />
  
    );
};

export default LottiePlayers;