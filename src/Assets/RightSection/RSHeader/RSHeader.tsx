import { useState } from 'react';
import RSHeaderStyle from './RSHeaderStyle.module.css';
import { BiShow, BiHide } from 'react-icons/bi';
import { MdOutlineCalendarViewMonth, MdOutlineCalendarViewWeek } from 'react-icons/md';
import DropdownMenu from '../../Header/DropdownMenu/DropdownMenu';
import RSBeginningYear from './RSBeginningYear/RSBeginningYear';

import { AiOutlineBarChart } from 'react-icons/ai';

function RSHeader(props: any) {
    const [aloitusvalikko] = useState([
        { text: 'kevät', data: 'kevät', icon: null },
        { text: 'syksy', data: 'syksy', icon: null },
    ]);

    return (
        <div className={RSHeaderStyle.yla}>
            <div className={RSHeaderStyle.ylaHolder}>
                {/* LEFT SECTION */}
                <div className={RSHeaderStyle.left}>
                    <div className={RSHeaderStyle.titleHolder}>
                        <h3>Aloituskausi</h3>

                        <DropdownMenu
                            name={props.alotus}
                            list={aloitusvalikko}
                            menuClass={RSHeaderStyle.menu}
                            toggleClass={RSHeaderStyle.toggle}
                            slideClass={RSHeaderStyle.slideBox}
                            func={props.setAlotus}
                        />

                        <RSBeginningYear opinnot={props.opinnot} setOpinnot={props.setOpinnot} />

                        <h3>{props.periodType}</h3>

                        <div className={RSHeaderStyle.periodButtonList}>
                            <button
                                title="Lukuvuodet"
                                className={RSHeaderStyle.tglBtn}
                                onClick={() => {
                                    props.setPeriodType('Lukuvuodet');
                                    props.setShowTavoiteNakyma(false);
                                }}>
                                <span className={RSHeaderStyle.tglBtnTitle}>Lukuvuodet</span>
                                {<MdOutlineCalendarViewMonth />}
                            </button>

                            <button
                                title="Periodit"
                                className={RSHeaderStyle.tglBtn}
                                onClick={() => {
                                    props.setPeriodType('Periodit');
                                    props.setShowTavoiteNakyma(false);
                                }}>
                                <span className={RSHeaderStyle.tglBtnTitle}>Periodit</span>
                                {<MdOutlineCalendarViewWeek />}
                            </button>
                            <button
                                title="Näytä kesäperiodit"
                                className={RSHeaderStyle.tglBtn}
                                onClick={() => {
                                    const nextValue =
                                        props.showSummerPeriod === 'hideSummer'
                                            ? 'showSummer'
                                            : 'hideSummer';
                                    props.setShowSummerPeriod(nextValue);
                                }}>
                                <span className={RSHeaderStyle.tglBtnTitle}>Näytä kesäperiodi</span>
                                {props.showSummerPeriod === 'showSummer' ? <BiShow /> : <BiHide />}
                            </button>

                            <button
                                title="Näytä tavoiteseruranta"
                                className={RSHeaderStyle.tglBtn}
                                onClick={() => props.setShowTavoiteNakyma(null)}>
                                <span className={RSHeaderStyle.tglBtnTitle}>Tavoiteseuranta</span>
                                <AiOutlineBarChart />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RSHeader;
