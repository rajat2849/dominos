import React from "react";
import ReactDOM from "react-dom";


export default function CarryoutButton () {
    const [showStatements, setShowStatements] = React.useState(false);
    const onClick = () => setShowStatements(true)

    let allStatements
    if (showStatements) {
        allStatements = <div>Pickup From Store</div>
    }
    const myStyle = {
      color: "white",
      backgroundColor: "#2f4f4f"
    }

    return(
        <div>
            <button style={myStyle} onClick={onClick}> CHECK IN</button>

              { allStatements }
        </div>
    )
}