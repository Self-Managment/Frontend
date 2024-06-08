import React from "react";

import { OuterCard } from "../../OuterCard";
import { REPLENISHMENT } from "../../../constants";

export const Operation = ({...props}) => {
    return (
        <div>
        <OuterCard {...props}>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <div style={{ fontWeight: "bold" }}>
                        {
                            props.operation_type === REPLENISHMENT ?
                            "Пополнение"
                            : "Списание"
                        }
                        <span> </span>
                        {
                            props.category || props.bank ?
                            <span style={{padding: "0 2px", border: "solid 1px", borderRadius: "5px", }}>
                                {
                                    props.bank ?
                                    <span style={{ color: props.bank.color, fontSize: "medium", }}>{props.bank.title}</span>
                                    : null
                                }
                                <span> </span>
                                {
                                    props.category ?
                                    <span style={{ color: props.category.color, fontSize: "medium", }}>
                                        {props.category.title}
                                        
                                    </span>
                                    : null
                                }
                            </span>
                            : null
                        }

                        {
                            props.operation_type === REPLENISHMENT ?
                            <p style={{ color: "green" }}>+{props.amount}</p>
                            :
                            <p style={{ color: "red" }}>-{props.amount}</p>
                        }
                    </div>

                    <div style={{ color: "geay", fontWeight: "small", opacity: 0.7 }}>
                        {props.description}
                    </div>
                </div>

                <div>
                    {props.created_at}
                </div>
            </div>
        </OuterCard>
        </div>
    );
};
