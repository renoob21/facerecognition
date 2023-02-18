import React from "react";
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, boxes}) => {
    if (!imageUrl) {
        return(
            <div></div>
        )
    } else {
        const detectBoxes = boxes.map(box => {
            return (
                <div className="box" style={{top:box.top, bottom:box.bottom, left:box.left, right:box.right}}></div>
            )
        })
        return(
            <div className="center ma">
                <div className="absolute mt2">
                    <img id="input-image" src={imageUrl} alt="face-recognition" width="500px" height="auto" />
                    {detectBoxes}
                </div>
            </div>
        )
    }
}

export default FaceRecognition;