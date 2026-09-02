import { useState } from 'react';
import RSHeader from './RSHeader/RSHeader';
import CalendarRight from './RSCalendar/CalendarRight';
import RSCalendarStyle from './RSCalendarStyle.module.css';
import TSCanvas from './TSCanvas/TSCanvas';

function RightSection(props: any) {
    const [periodType, setPeriodType] = useState('Lukuvuodet');
    const [showSummerPeriod, setShowSummerPeriod] = useState<string>('hideSummer');

    const [ShowTavoiteNakyma, setShowTavoiteNakyma] = useState<boolean>(false);

    function ToggleTavoiteNakyma(value: boolean): void {
        const show = value ?? !ShowTavoiteNakyma;
        setShowTavoiteNakyma(show);
    }
    return (
        <div className={RSCalendarStyle.holder}>
            <RSHeader
                opinnot={props.opinnot}
                setOpinnot={props.setOpinnot}
                alotus={props.alotus}
                setAlotus={props.setAlotus}
                periodType={periodType}
                setPeriodType={setPeriodType}
                setRequiredOp={props.setRequiredOp}
                requiredOp={props.requiredOp}
                opintopisteet={props.opintopisteet}
                showSummerPeriod={showSummerPeriod}
                setShowSummerPeriod={setShowSummerPeriod}
                setShowTavoiteNakyma={ToggleTavoiteNakyma}
            />
            <CalendarRight
                periodType={periodType}
                showSummerPeriod={showSummerPeriod}
                alotus={props.alotus}
                opinnot={props.opinnot}
                setOpinnot={props.setOpinnot}
                setMouseState={props.setMouseState}
                setDragItem={props.setDragItem}
                setOffsetPos={props.setOffsetPos}
                setElem={props.setElem}
                setTutkinnonOsat={props.setTutkinnonOsat}
                setTargetElementName={props.setTargetElementName}
                setParentElementName={props.setParentElementName}
            />
            {ShowTavoiteNakyma ? (
                <TSCanvas
                    opinnot={props.opinnot}
                    onClose={() => setShowTavoiteNakyma(false)}
                />
            ) : null}
        </div>
    );
}
export default RightSection;
