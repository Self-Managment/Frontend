import React from "react";
import { Operation } from "../../../components/budget/operation/Operation";

const OperationHistory = ({ operationHistory }) => {
    console.log(operationHistory)
	return (
        <div className="container">
            <div style={{ textAlign: 'center', }}>
                <h2>История</h2>
                <hr/>
            </div>
            {Object.keys(operationHistory).map(key => {
                let operations = operationHistory[key]
                return (
                    <div style={{marginBottom: "25px"}}>
                        <h3>{key}</h3>

                        {operations.map((column, index) => (
                            <div
                                key={index}
                                style={{ flex: '0 0 200px', marginRight: '20px', }}
                            >
                                <Operation
                                    amount={column.amount}
                                    created_at={column.date_str}
                                    operation_type={column.operation_type}
                                    category={column.category}
                                    bank={column.bank}
                                    description={column.description}
                                />
                            </div>
                        ))}
                    </div>
                )
            })}
            {/* <div>
                {operationHistory.map((column, index) => (
                    <div
                        key={index}
                        style={{ flex: '0 0 200px', marginRight: '20px', }}
                    >
                        <Operation
                            amount={column.amount}
                            created_at={column.date_str}
                            operation_type={column.operation_type}
                            category={column.category}
                            bank={column.bank}
                            description={column.description}
                        />
                    </div>
                ))}
            </div> */}
        </div>
	);
};

export default OperationHistory;