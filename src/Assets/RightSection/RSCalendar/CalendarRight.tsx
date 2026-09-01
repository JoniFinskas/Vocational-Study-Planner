import CalendarYears from './CalendarYears/CalendarYears';
import RSCalendarStyle from '../RSCalendarStyle.module.css';

function RSCalendar(props: any) {
    return (
        <div id="RS-Calendar-Section" className={RSCalendarStyle.section}>
            <CalendarYears
                alotus={props.alotus}
                opinnot={props.opinnot}
                setOpinnot={props.setOpinnot}
                setMouseState={props.setMouseState}
                setDragItem={props.setDragItem}
                setOffsetPos={props.setOffsetPos}
                setElem={props.setElem}
                setTutkinnonOsat={props.setTutkinnonOsat}
                setTargetElementName={props.setTargetElementName}
                showSummerPeriod={props.showSummerPeriod}
                periodType={props.periodType}
                setParentElementName={props.setParentElementName}
            />
        </div>
    );
}

export default RSCalendar;
