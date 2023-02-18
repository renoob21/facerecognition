import React from "react";

const Rank = ({user}) => {
    return(
        <div>
            <div className="white f3 center">
                {`${user.name} your current count is`}
            </div>
            <div className="white f1 center">
                {user.entries}
            </div>
        </div>
    )
}

export default Rank;