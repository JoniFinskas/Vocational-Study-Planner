import { useState } from 'react';
import CalendarPeriods from './CalendarPeriods/CalendarPeriods';
import CalendarYearsStyle from './CalendarYearsStyle.module.css';
import { academicYear } from '../../../functions/Interfaces';
import { AiFillPlusCircle } from 'react-icons/ai';

function CalendarYears(props: any) {
    const [selectedOv, setSelectedOv] = useState<number>(1);

    function isViewPeriods(): boolean {
        return props.periodType.toLowerCase() === 'periodit';
    }

    const visibleOpinnot = isViewPeriods()
        ? props.opinnot.filter(
              (ov: academicYear) => ov.academic_year === selectedOv
          )
        : props.opinnot;

    const opintoView = visibleOpinnot.map((ov: academicYear) => (
        <CalendarPeriods
            key={ov.academic_year}
            period={ov.period}
            year={ov.academic_year}
            yearp={ov.year_period}
            setMouseState={props.setMouseState}
            setDragItem={props.setDragItem}
            setOffsetPos={props.setOffsetPos}
            setElem={props.setElem}
            setTutkinnonOsat={props.setTutkinnonOsat}
            setTargetElementName={props.setTargetElementName}
            setOpinnot={props.setOpinnot}
            opinnot={props.opinnot}
            alotus={props.alotus}
            showSummerPeriod={props.showSummerPeriod}
            isViewPeriods={isViewPeriods}
            setParentElementName={props.setParentElementName}
        />
    ));

    function displayOvMenu() {
        return (
            <div className={CalendarYearsStyle.ovMenuHolder}>
                <div className={CalendarYearsStyle.ovMenu}>
                    {selectedOv === 0 ? (
                        <p className={CalendarYearsStyle.infoTxt}>
                            valitse lukuvuosi:
                        </p>
                    ) : null}
                    {props.opinnot.map((ov: any, i: any) => (
                        <button
                            style={{
                                textDecoration:
                                    ov.academic_year === selectedOv
                                        ? 'underline'
                                        : '',
                            }}
                            key={i}
                            className={CalendarYearsStyle.ovButton}
                            onClick={() => setSelectedOv(ov.academic_year)}>
                            {ov.academic_year}. Lukuvuosi
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    function addNewYear(): void {
        const opinnot_new = props.opinnot.map((a: any) => a);
        const periods_obj: any = {};
        for (let p = 1; p < 6; p++) {
            periods_obj[`p${p}`] = {
                period: p,
                parts: [],
            };
        }
        if (opinnot_new.length > 0) {
            opinnot_new.push({
                academic_year: opinnot_new.length + 1,
                year_period: `${
                    opinnot_new[0].year_number + opinnot_new.length
                }-${opinnot_new[0].year_number + opinnot_new.length + 1}`,
                period: periods_obj,
                year_number: opinnot_new[0].year_number + opinnot_new.length,
            });
        }
        else {
            const d = new Date();
            const currentYear = d.getFullYear();
            opinnot_new.push({
                academic_year: opinnot_new.length + 1,
                year_period: `${currentYear}-${currentYear + 1}`,
                period: periods_obj,
                year_number: currentYear,
            });
        }
        props.setOpinnot(opinnot_new);
    }

    return (
        <div
            className={
                isViewPeriods()
                    ? CalendarYearsStyle.opintoVuodetContainerColumn
                    : CalendarYearsStyle.opintoVuodetContainer
            }>
            {isViewPeriods() ? displayOvMenu() : null}
            <>{opintoView}</>

            {isViewPeriods() ? null : (
                <div className={CalendarYearsStyle.addNewYearBtnBox}>
                    <button
                        onClick={addNewYear}
                        title="Lisää lukuvuosi"
                        className={CalendarYearsStyle.addNewYearBtn}>
                        <AiFillPlusCircle />
                    </button>
                </div>
            )}
        </div>
    );
}

export default CalendarYears;
