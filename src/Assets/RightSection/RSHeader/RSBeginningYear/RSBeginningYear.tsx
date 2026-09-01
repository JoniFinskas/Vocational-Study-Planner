import { useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import RSBeginningYearStyle from './RSBeginningYearStyle.module.css';

export default function RSBeginningYear(props: any) {
    const [beginningYear, setBeginningYear] = useState<number>(function () {
        const d = new Date();
        return d.getFullYear();
    });

    function updateBeginningYear(nextYear: number) {
        setBeginningYear(nextYear);
        props.setOpinnot(
            props.opinnot.map((year: any, index: number) => ({
                ...year,
                year_period: `${nextYear + index}-${nextYear + index + 1}`,
                year_number: nextYear + index,
            }))
        );
    }

    return (
        <div className={RSBeginningYearStyle.YCholder}>
            <input
                value={beginningYear}
                type="number"
                min={1}
                max={9999}
                disabled
            />
            <div className={RSBeginningYearStyle.ABcolumn}>
                <button
                    title="Siirrä aloitusvuotta eteenpäin"
                    onClick={() => {
                        updateBeginningYear(beginningYear + 1);
                    }}
                    className={RSBeginningYearStyle.arrowButton}>
                    <RiArrowUpSLine />
                </button>
                <button
                    title="Siirrä aloitusvuotta taaksepäin"
                    onClick={() => {
                        updateBeginningYear(beginningYear - 1);
                    }}
                    className={RSBeginningYearStyle.arrowButton}>
                    <RiArrowDownSLine />
                </button>
            </div>
        </div>
    );
}
