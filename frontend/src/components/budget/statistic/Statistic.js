import React from "react";

import { MyButton } from "../../buttons/MyButton";

import OperationDiagram from "./operationDiagram";


const Statistic = ({
    showOperationStatistic, handleShowOperationStatistic, operationData
 }) => {
    console.log(operationData.REPLENISHMENT)
	return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ padding: '5px' }}>
                    <MyButton
                        style={{width: '100%'}} className='mt-3' type='button' 
                        variant={showOperationStatistic ? 'primary' : 'secondary'} 
                        shadowColor={showOperationStatistic ? 'blue' : 'gray'} 
                        onClick={handleShowOperationStatistic}
                    >
                        Операции
                    </MyButton>
                </div>
            </div>
        
            <div>
                {
                    showOperationStatistic ?
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{ width: "300px", height: "300px" }}>
                                <div class="text-center">
                                    <h2>Пополнения</h2>
                                    <h5>
                                        {
                                        operationData.REPLENISHMENT ?
                                        `Всего ${operationData.REPLENISHMENT.values.reduce((acc, num) => acc + num, 0)} р.`
                                        : null
                                        }
                                    </h5>
                                </div>
                                {
                                    operationData.REPLENISHMENT && Object.keys(operationData.REPLENISHMENT).length !== 0 ?
                                    <OperationDiagram 
                                        data={operationData.REPLENISHMENT.values}
                                        labels={operationData.REPLENISHMENT.labels}
                                        colors={operationData.REPLENISHMENT.colors}
                                    />
                                    : null

                                }
                            </div>
                            <div style={{ width: "300px", height: "300px" }}>
                                <div class="text-center">
                                    <h2>Списания</h2>
                                    <h5>
                                        {
                                        operationData.FORGIVENESS ?
                                        `Всего ${operationData.FORGIVENESS.values.reduce((acc, num) => acc + num, 0)} р.`
                                        : null
                                        }
                                    </h5>
                                </div>
                                {
                                    operationData.FORGIVENESS && Object.keys(operationData.FORGIVENESS).length !== 0 ?
                                    <OperationDiagram 
                                        data={operationData.FORGIVENESS.values}
                                        labels={operationData.FORGIVENESS.labels}
                                        colors={operationData.FORGIVENESS.colors}
                                    />
                                    : null

                                }
                            </div>
                        </div>
                    </div>
                    : null
                }
            </div>
        </div>
	);
};

export default Statistic;