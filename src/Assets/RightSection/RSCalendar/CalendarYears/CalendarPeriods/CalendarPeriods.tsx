import CalendarPeriodStyle from './CalendarPeriodStyle.module.css';
import CalendarYearsStyle from '../CalendarYearsStyle.module.css';
import { academicYear, period, part } from '../../../../functions/Interfaces';
import { classes } from '../../../../functions/classWrapper';
import DraggablePeriodItem from './DraggablePeriodItem/DraggablePeriodItem';
import { AiFillMinusCircle } from 'react-icons/ai';

function CalendarPeriods(props: any) {
    function removeItem(part: part) {
        props.setOpinnot(
            props.opinnot.map((ac_year: academicYear) => {
                const a = ac_year;
                type ObjectKey = keyof typeof a.period;
                let d_ed = false;
                for (const pkey in a.period) {
                    const pk = pkey as ObjectKey;
                    for (let p = 0; p < a.period[pk].parts.length; p++) {
                        if (a.period[pk].parts[p].id === part.id) {
                            a.period[pk].parts.splice(p, 1);
                            d_ed = true;
                            break;
                        }
                    }
                    if (d_ed) break;
                }
                return a;
            })
        );
    }

    function orderItem(pnum: number) {
        if (pnum === 1 || pnum === 2)
            return props.alotus === 'kevät' ? pnum * 10 : pnum;

        return pnum;
    }

    function displayTOsat(period: period, year: number) {
        if (period.parts.length === 0) return null;

        return period.parts.map((part: part, i: number) => (
            <div key={i} className={classes(CalendarPeriodStyle.periodCard)}>
                <div className={CalendarPeriodStyle.periodCardInfo}>
                    <DraggablePeriodItem
                        removeItem={() => removeItem(part)}
                        setMouseState={props.setMouseState}
                        setDragItem={props.setDragItem}
                        setOffsetPos={props.setOffsetPos}
                        setElem={props.setElem}
                        item={part}
                        setTargetElementName={props.setTargetElementName}
                        setParentElementName={() => {
                            props.setParentElementName(
                                'year' + year + '-period' + period.period
                            );
                        }}
                    />
                </div>
            </div>
        ));
    }

    function displayDropbox(period: any) {
        if (
            period.period !== 5 ||
            (period.period === 5 && props.showSummerPeriod === 'showSummer')
        )
            return (
                <div
                    id={'year' + props.year + '-period' + period.period}
                    className={
                        period.period === 5
                            ? classes(
                                  CalendarPeriodStyle.periodHolder,
                                  CalendarPeriodStyle.summerPeriod,
                                  'dropBox'
                              )
                            : classes(
                                  CalendarPeriodStyle.periodHolder,
                                  'dropBox'
                              )
                    }>
                    <div className={CalendarPeriodStyle.periodCardHeader}>
                        <h3>Periodi {period.period}</h3>
                    </div>
                    {displayTOsat(period, props.year)}
                </div>
            );
    }
    function listPeriods() {
        const periodList = Object.values(props.period);

        if (props.isViewPeriods()) {
            return periodList.map((period: any, i: number) => (
                <div key={i} style={{ order: orderItem(period.period) }}>
                    <div className={CalendarPeriodStyle.periodHeader}>
                        {period.period === 1 ? (
                            <h3>Syksy {props.yearp.split('-')[0]}</h3>
                        ) : null}
                        {period.period === 3 ? (
                            <h3>
                                Kevät{' '}
                                {props.alotus === 'kevät'
                                    ? props.yearp.split('-')[0]
                                    : props.yearp.split('-')[1]}
                            </h3>
                        ) : null}
                        {period.period === 5 &&
                        props.showSummerPeriod === 'showSummer' ? (
                            <h3>Kesä</h3>
                        ) : null}
                    </div>
                    {displayDropbox(period)}
                </div>
            ));
        }

        return periodList.map((period: any, i: number) => (
            <div key={i} style={{ order: orderItem(period.period) }}>
                {period.period === 1 ? (
                    <div className={CalendarPeriodStyle.lukuvuosiHeader}>
                        <h3>Syksy {props.yearp.split('-')[0]}</h3>
                    </div>
                ) : null}
                {period.period === 3 ? (
                    <div className={CalendarPeriodStyle.lukuvuosiHeader}>
                        <h3>
                            Kevät{' '}
                            {props.alotus === 'kevät'
                                ? props.yearp.split('-')[0]
                                : props.yearp.split('-')[1]}
                        </h3>
                    </div>
                ) : null}
                {period.period === 5 &&
                props.showSummerPeriod === 'showSummer' ? (
                    <div className={CalendarPeriodStyle.lukuvuosiHeader}>
                        <h3>Kesä</h3>
                    </div>
                ) : null}
                {displayDropbox(period)}
            </div>
        ));
    }

    function getDegreeYearTotalPoints(periods: object): number {
        let total_points = 0;
        const periodList = Object.values(periods);
        for (const period of periodList) {
            for (const part of period.parts) total_points += part.points;
        }
        return total_points;
    }

    function deleteYear(year: number) {
        const confMessage = `Haluatko varmasti poistaa ${year}. lukuvuoden sisältöineen?`;
        const opinnot_new = props.opinnot.map((a: any) => a);
        function do_it(): void {
            for (let o = 0; o < opinnot_new.length; o++) {
                if (opinnot_new[o].academic_year === year) {
                    opinnot_new.splice(o, 1);

                    for (o; o < opinnot_new.length; o++) {
                        opinnot_new[o].academic_year -= 1;
                        opinnot_new[o].year_number -= 1;
                        const yn = opinnot_new[o].year_number;
                        opinnot_new[o].year_period = `${yn}-${yn + 1}`;
                    }
                    break;
                }
            }
            props.setOpinnot(opinnot_new);
        }

        if (opinnot_new[year - 1]) {
            const P = opinnot_new[year - 1];
            type ObjectKey = keyof typeof P.period;

            let total_to = 0;
            for (const pkey in P.period) {
                const pk = pkey as ObjectKey;
                total_to += P.period[pk].parts.length;
            }

            if (total_to > 0) {
                if (window.confirm(confMessage)) {
                    do_it();
                }
            } else {
                do_it();
            }
        }
    }

    return (
        <div
            className={
                props.isViewPeriods()
                    ? CalendarYearsStyle.degreeYearBoxRow
                    : CalendarYearsStyle.degreeYearBox
            }>
            <div className={CalendarYearsStyle.degreeYearBoxHeader}>
                {props.isViewPeriods() ? (
                    <h3>
                        Opintopisteet {getDegreeYearTotalPoints(props.period)}
                    </h3>
                ) : (
                    <>
                        <h3>
                            {props.year}. Lukuvuosi
                            <br />
                            <span style={{ fontSize: '.8em' }}>
                                {'Opintopisteet ' +
                                    getDegreeYearTotalPoints(props.period)}
                            </span>
                        </h3>
                        <button
                            onClick={() => deleteYear(props.year)}
                            title={'Poista ' + props.year + '. Lukuvuosi'}
                            className={CalendarYearsStyle.removeCurrentYearBtn}>
                            <AiFillMinusCircle />
                        </button>
                    </>
                )}
            </div>
            {listPeriods()}
        </div>
    );
}

export default CalendarPeriods;
