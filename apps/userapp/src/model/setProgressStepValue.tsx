type SetProgressType = React.Dispatch<
                            React.SetStateAction<
                                {
                                    step: number;
                                    totalSteps: number;
                                }
                            >
                       >

export default async function setProgressStep(step:number, totalSteps:number, delay:number , setProgress:SetProgressType){

    setProgress(val => {
        return {
            ...val, 
            step:step,
            totalSteps:totalSteps
        }
    });
    await new Promise((res) => {
        setTimeout(()=>{
            console.log(`waited ${delay/1000} sec at step 1`)
            res(true);
        },delay)
    });

}