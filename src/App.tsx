import './App.css';
import { useState, useEffect, useRef, type ReactNode } from 'react';
import Header from './Assets/Header/Header';
import HistoricalProjectBanner from './HistoricalProjectBanner';
import LeftSection from './Assets/LeftSection/LeftSection';
import RightSection from './Assets/RightSection/RightSection';
import { mouseMove, mouseUp, mouseLeave, resetAllStyles, resetDragItemStyles } from './Assets/functions/dragFunctions';
import { academicYear, part } from './Assets/functions/Interfaces';
import initOpinnot from './Assets/functions/initOpinnot';

function App() {
    const [tutkintoName, setTutkintoName] = useState<string>('');
    const [tutkinnonOsat, setTutkinnonOsat] = useState<part[]>([]);
    const [opinnot, setOpinnot] = useState<academicYear[]>(function () {
        const savedOpinnot = localStorage.getItem('opinnot');
        if (savedOpinnot) {
            try {
                return JSON.parse(savedOpinnot) as academicYear[];
            } catch {
                localStorage.removeItem('opinnot');
            }
        }
        return [];
    });
    const [opintopisteet, setOpintopisteet] = useState<number>(0);
    const [requiredOp, setRequiredOp] = useState<number>(0);
    const [valitutOpinnot, setvalitutOpinnot] = useState<number[]>([]);
    const [menus, setMenus] = useState<ReactNode>();
    const [alotus, setAlotus] = useState<string>('syksy');

    const [mouseState, setMouseState] = useState<boolean>(false);
    const [offsetPos, setOffsetPos] = useState<object>({ x: 0, y: 0 });
    const [elem, setElem] = useState({ w: 0, h: 0, scrollY: 0, id: 0 });
    const initialDragItem = useRef<HTMLElement | null>(null);
    const [dragItem, setDragItem] = useState(initialDragItem);

    const [targetElementName, setTargetElementName] = useState<string>('');
    const [parentElementName, setParentElementName] = useState<string>('');

    const parent = useRef(null);

    useEffect(() => {
        initOpinnot(setOpinnot);
    }, []);

    useEffect(() => {
        document.title = tutkintoName
            ? `Oma Hoks · ${tutkintoName} · opiskelijaprojekti vuodelta 2022`
            : 'Oma Hoks · opiskelijaprojekti vuodelta 2022';
    }, [tutkintoName]);

    useEffect(() => {
        let total_OP = 0;
        const selected: number[] = [];

        for (const ac_year of opinnot) {
            for (const period in ac_year.period) {
                type ObjectKey = keyof typeof ac_year.period;
                const p = period as ObjectKey;
                for (let i = 0; i < ac_year.period[p].parts.length; i++) {
                    total_OP += ac_year.period[p].parts[i].points;
                    selected.push(ac_year.period[p].parts[i].id);
                }
            }
        }
        setOpintopisteet(total_OP);
        setvalitutOpinnot(selected);
        if (opinnot.length > 0) localStorage.setItem('opinnot', JSON.stringify(opinnot));
        if (total_OP === 0) localStorage.removeItem('opinnot');
    }, [opinnot]);

    useEffect(() => {
        resetDragItemStyles(dragItem);
    }, [dragItem, valitutOpinnot]);

    function setElementReference(data: any): void {
        if (!data) {
            setTargetElementName('');
            return;
        }
        setTargetElementName(data.id);
    }

    function setOpintoDataToList(listIdentifier: string): void {
        if (typeof listIdentifier === 'string' && listIdentifier.length > 0 && elem.id > 0 && mouseState) {
            let osadoesmatch = false;
            for (const osa of tutkinnonOsat) {
                if (osa.to_children && osa.to_children.length > 0) {
                    for (const child of osa.to_children) {
                        if (child.id === elem.id) {
                            insertOpinto(child, listIdentifier);
                            osadoesmatch = true;
                            break;
                        }
                    }
                } else {
                    if (osa.id === elem.id) {
                        insertOpinto(osa, listIdentifier);
                        osadoesmatch = true;
                    }
                }
                if (osadoesmatch) break;
            }
        }
    }

    function clearOpinnonOsatFromPreviousPeriods(opinnot: academicYear[], osa: part): void {
        for (const ac_year of opinnot) {
            for (const period in ac_year.period) {
                type ObjectKey = keyof typeof ac_year.period;
                const p = period as ObjectKey;
                for (let i = 0; i < ac_year.period[p].parts.length; i++) {
                    if (ac_year.period[p].parts[i].id === osa.id) {
                        ac_year.period[p].parts.splice(i, 1);
                    }
                }
            }
        }
    }

    function insertOpinto(osa: part, listIdentifier: string) {
        if (osa.id) {
            const pi = listIdentifier.split('-');
            const year = Number(pi[0].slice(4, pi[0].length));
            const period = Number(pi[1].slice(6, pi[1].length));

            if (year && period) {
                const opinnot_new = opinnot.map((a) => a);
                for (const yr of opinnot_new) {
                    if (yr.academic_year === year) {
                        type ObjectKey = keyof typeof yr.period;
                        const perdiodkeyname = `p${period}` as ObjectKey;

                        if (yr.period[perdiodkeyname]) {
                            let isTOsaInList = false;
                            for (const to of yr.period[perdiodkeyname].parts) {
                                if (to.id === osa.id) {
                                    isTOsaInList = true;
                                    break;
                                }
                            }
                            if (!isTOsaInList) {
                                clearOpinnonOsatFromPreviousPeriods(opinnot_new, osa);

                                yr.period[perdiodkeyname].parts.push(osa);
                                setOpinnot(opinnot_new);
                            }
                        }
                        break;
                    }
                }
            }
        }
    }

    return (
        <>
            <HistoricalProjectBanner />
            <Header
                title={tutkintoName}
                currentOp={opintopisteet}
                requiredOp={requiredOp}
                opinnot={opinnot}
                alotus={alotus}
            />
            <div
                id="OffsetParentELEMENT"
                ref={parent}
                onMouseMove={(e: any) => mouseMove(e, mouseState, dragItem, offsetPos, elem, setElementReference)}
                onMouseUp={(e: any) => {
                    mouseUp(e, dragItem, setMouseState, targetElementName, parentElementName);
                    resetAllStyles();
                    setOpintoDataToList(targetElementName);
                }}
                onMouseLeave={(e: any) => mouseLeave(e, setMouseState)}
                className="flex-row">
                <RightSection
                    alotus={alotus}
                    setAlotus={setAlotus}
                    opinnot={opinnot}
                    dragItem={dragItem}
                    mouseState={mouseState}
                    setMouseState={setMouseState}
                    setDragItem={setDragItem}
                    setOffsetPos={setOffsetPos}
                    setElem={setElem}
                    setTutkinnonOsat={setTutkinnonOsat}
                    setTargetElementName={setTargetElementName}
                    setOpinnot={setOpinnot}
                    setParentElementName={setParentElementName}
                />
                <LeftSection
                    menus={menus}
                    setMenus={setMenus}
                    tutkinnonOsat={tutkinnonOsat}
                    valitutOpinnot={valitutOpinnot}
                    setRequiredOp={setRequiredOp}
                    setMouseState={setMouseState}
                    setTutkintoName={setTutkintoName}
                    setDragItem={setDragItem}
                    setOffsetPos={setOffsetPos}
                    setElem={setElem}
                    setTutkinnonOsat={setTutkinnonOsat}
                    setTargetElementName={setTargetElementName}
                />
            </div>
        </>
    );
}

export default App;
