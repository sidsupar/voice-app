import { useEffect, useState } from "react";

export default function ProgressBar({ step, totalSteps }: {step: number, totalSteps: number}) {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const targetPercent = Math.abs(step / totalSteps) * 100;
        const updatePercent = () => {
            setPercent(prevPercent => {
                if (prevPercent < targetPercent) {
                    return Math.min(prevPercent + 5, targetPercent);
                } else if (prevPercent > targetPercent) {
                    return Math.max(prevPercent - 1, targetPercent);
                }
                return prevPercent;
            });
        };

        const interval = setInterval(updatePercent, 10); // Update every 10ms

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [step, totalSteps]);

    return (
        <div className="w-full">
            <div className="p-1 flex items-center border-2 rounded-md dark:border-sky-600">
                <div
                    style={{ width: `${percent}%` }}
                    className="p-2 m-0 bg-green-500 text-center border-1 rounded-md text-xs transition-width duration-10 ease-in-out"
                >
                </div>
            </div>
            <div className="text-xs">
                {percent.toFixed(2)}%
            </div>
        </div>
    );
}
