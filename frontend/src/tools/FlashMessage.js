import React from "react"

function FlashMessage(props) {
    return (
        // <div className="floating-alerts">
        //     {props.messages.map((msg, index) => {
        //         return (
        //             <div key={index} className="alert alert-success text-center floating-alert shadow-sm">
        //                 {msg}
        //             </div>
        //         )
        //     })}
        // </div>

        <div className="floating-alerts">
            {props.messages.map((msg, index) => {
                return (
                    <div key={index} className={"alert alert-" + props.typeAlert + " text-center floating-alert shadow-sm"}>
                        {msg}
                    </div>
                )
            })}
        </div>

        // <div className="floating-alerts">
        //     <div className={"alert alert-" + props.typeAlert + " text-center floating-alert shadow-sm"}>{props.messages}</div>
        // </div>
    )
}

export default FlashMessage
