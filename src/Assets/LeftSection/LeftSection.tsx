import { useEffect } from 'react';
import LeftSectionStyle from './LeftSectionStyle.module.css';
import DraggableMenu from './DraggableMenu/DraggableMenu';
import DraggableMenuStyle from './DraggableMenu/DraggableMenuStyle.module.css';
import DraggableMenuItemStyle from './DraggableMenu/DraggableMenuItemStyle.module.css';
import { classes } from '../functions/classWrapper';
import {
    yhteisetTutkinnonosatIDs,
    isIDInTheList,
} from '../functions/yhteisetTutkinnonOsat';

function LeftSection({
    menus,
    tutkinnonOsat,
    valitutOpinnot,
    setTutkintoName,
    setMouseState,
    setDragItem,
    setOffsetPos,
    setElem,
    setTutkinnonOsat,
    setTargetElementName,
    setMenus,
    setRequiredOp,
}: any) {
    useEffect(() => {
        const controller = new AbortController();

        fetch('/t/static_3855077.json', { signal: controller.signal })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Unable to load demo data (${response.status})`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.tutkinto) {
                    setRequiredOp(data.tutkinto.total_points);
                    setTutkintoName(data.tutkinto.name);
                }
                if (data.tutkinnon_osat) {
                    const osat = data.tutkinnon_osat.tutkinnon_osat;
                    setTutkinnonOsat(osat);
                }
            })
            .catch((error) => {
                if (error instanceof DOMException && error.name === 'AbortError') {
                    return;
                }
                console.error('Demo data could not be loaded.', error);
            });

        return () => controller.abort();
    }, [setRequiredOp, setTutkintoName, setTutkinnonOsat]);

    useEffect(() => {
        const ammatilliset: object[] = [];
        const ytot: object[] = [];
        for (const osa of tutkinnonOsat) {
            if (isIDInTheList(yhteisetTutkinnonosatIDs, osa.id)) {
                ytot.push(osa);
            } else {
                ammatilliset.push(osa);
            }
        }

        setMenus(
            <>
                <DraggableMenu
                    valitutOpinnot={valitutOpinnot}
                    setMouseState={setMouseState}
                    setDragItem={setDragItem}
                    setOffsetPos={setOffsetPos}
                    setElem={setElem}
                    name="Ammatilliset tutkinnonosat"
                    list={ammatilliset}
                    menuClass={DraggableMenuStyle}
                    itemClass={DraggableMenuItemStyle}
                    setTargetElementName={setTargetElementName}
                />
                <DraggableMenu
                    valitutOpinnot={valitutOpinnot}
                    setMouseState={setMouseState}
                    setDragItem={setDragItem}
                    setOffsetPos={setOffsetPos}
                    setElem={setElem}
                    name="Yhteiset tutkinnonosat"
                    list={ytot}
                    menuClass={DraggableMenuStyle}
                    itemClass={DraggableMenuItemStyle}
                    setTargetElementName={setTargetElementName}
                />
            </>
        );
    }, [
        setDragItem,
        setElem,
        setMenus,
        setMouseState,
        setOffsetPos,
        setTargetElementName,
        tutkinnonOsat,
        valitutOpinnot,
    ]);

    return (
        <div className={LeftSectionStyle.leftSection}>
            <div className={LeftSectionStyle.flexRow}>
                <div
                    className={classes(
                        LeftSectionStyle.required,
                        DraggableMenuItemStyle.pakollinen
                    )}></div>
                <span className={LeftSectionStyle.fw}>pakollinen</span>
                <div
                    className={classes(
                        LeftSectionStyle.required,
                        DraggableMenuItemStyle.valinnainen
                    )}></div>
                <span>valinnainen</span>
            </div>
            <div className={LeftSectionStyle.flexRow}>
                <div
                    className={classes(
                        LeftSectionStyle.sqr,
                        LeftSectionStyle.amm
                    )}></div>
                <span className={LeftSectionStyle.fw}>ammatillinen</span>
                <div
                    className={classes(
                        LeftSectionStyle.sqr,
                        LeftSectionStyle.yto,
                        LeftSectionStyle.marg
                    )}></div>
                <span>yhteinen</span>
            </div>

            <div
                className={classes(
                    LeftSectionStyle.flexRow,
                    LeftSectionStyle.space,
                    LeftSectionStyle.tight
                )}>
                <b>Tutkinnon osa</b>
                <b>op</b>
            </div>
            <div id="opMenuHolder" className={LeftSectionStyle.menusHolder}>
                {menus}
            </div>
        </div>
    );
}

export default LeftSection;
