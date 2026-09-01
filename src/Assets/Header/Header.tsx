import { useState } from 'react';
import { GrDocumentPdf, GrDocumentCsv } from 'react-icons/gr';
import OmaHoksLogo from '../../OmaHoksLogo/OmaHoksLogo_256x120.png';
import Logo from './Logo.module.css';
import HeaderStyle from './HeaderStyle.module.css';
import DropdownMenu from './DropdownMenu/DropdownMenu';
import { saveToPDF, saveToCSV } from '../functions/writeToFileFunctions';
import { BsInfoSquare } from 'react-icons/bs';

function Header({ title, currentOp, requiredOp, opinnot, alotus }: any) {
    const [topMenuItems] = useState([
        { text: 'PDF', data: 'PDF', icon: <GrDocumentPdf /> },
        { text: 'CSV', data: 'CSV', icon: <GrDocumentCsv /> },
    ]);

    const saveFile = (saveoption: string): void => {
        if (saveoption === 'PDF') {
            saveToPDF(opinnot, alotus);
        } else {
            saveToCSV(opinnot);
        }
    };

    return (
        <header className={HeaderStyle.header}>
            <img className={Logo.Logo} src={OmaHoksLogo} alt="Logo" />

            <h2 className={HeaderStyle.title}>{title}</h2>
            <div className={HeaderStyle.divider}></div>
            <h3 className={HeaderStyle.title}>
                <span className={HeaderStyle.iBlock}>Opintopisteet: </span>
                <span className={HeaderStyle.iBlock}>{currentOp + ' / ' + requiredOp}</span>
            </h3>

            <button
                title="Käyttöohje"
                className={HeaderStyle.InfoButton}
                onClick={() => window.open('./Kaytto-ohje-tekijat.html', '_blank')}>
                <span className={HeaderStyle.InfoButton}>Käyttöohje</span>
                <BsInfoSquare />
            </button>

            <DropdownMenu
                name="Tallenna"
                list={topMenuItems}
                menuClass={HeaderStyle.menu}
                toggleClass={HeaderStyle.toggle}
                slideClass={HeaderStyle.slideBox}
                func={saveFile}
            />

        </header>
    );
}

export default Header;
