import { period, academicYear } from './Interfaces';
import { yhteisetTutkinnonosatIDs, isIDInTheList } from './yhteisetTutkinnonOsat'

const saveToPDF = (opinnot: academicYear[], alotus: string) => {
    const PRINTELEMENT = document.createElement('div')
    PRINTELEMENT.setAttribute('id', 'print-element-container')
    document.body.appendChild(PRINTELEMENT)

    const title = document.createElement('h1')
    title.innerText = 'Liiketoiminnan Perustutkinto';
    PRINTELEMENT.appendChild(title)

    const req = document.createElement('p'),
        b = document.createElement('span'),
        t = document.createElement('span');
    b.setAttribute('class', 'circle req')
    t.innerText = 'pakollinen'
    req.appendChild(b)
    req.appendChild(t)
    PRINTELEMENT.appendChild(req)

    const reqnot = document.createElement('p'),
        b1 = document.createElement('span'),
        t1 = document.createElement('span');
    b1.setAttribute('class', 'circle req-not')
    t1.innerText = 'valinnainen'
    reqnot.appendChild(b1)
    reqnot.appendChild(t1)
    PRINTELEMENT.appendChild(reqnot)

    const amm = document.createElement('p'),
        a1 = document.createElement('span'),
        a2 = document.createElement('span');
    a1.setAttribute('class', 'sqr amm')
    a2.innerText = 'ammatillinen'
    amm.appendChild(a1)
    amm.appendChild(a2)
    PRINTELEMENT.appendChild(amm)

    const yto = document.createElement('p'),
        y1 = document.createElement('span'),
        y2 = document.createElement('span');
    y1.setAttribute('class', 'sqr yto')
    y2.innerText = 'yhteinen'
    yto.appendChild(y1)
    yto.appendChild(y2)
    PRINTELEMENT.appendChild(yto)

    let ov_op_total = 0

    const table_holder = document.createElement('div')
    table_holder.setAttribute('class', 'print-page-breaker')
    PRINTELEMENT.appendChild(table_holder)

    const table = document.createElement('table')
    table_holder.appendChild(table)

    const ops = opinnot.sort((a: any, b: any) => a.academic_year - b.academic_year)

    if(ops.length > 0)
        for(const ov of ops) {

            const thead = document.createElement('thead')
            table.appendChild(thead)

            const trow = document.createElement('tr')
            thead.appendChild(trow)

            const ov_title = document.createElement('td')
            ov_title.setAttribute('class', 'bold')
            ov_title.innerText = 'Opintovuosi '+ov.academic_year;
            trow.appendChild(ov_title)

            trow.appendChild(document.createElement('td'))
            trow.appendChild(document.createElement('td'))

            const pts_title = document.createElement('td')
            pts_title.setAttribute('class', 'bold pts')
            trow.appendChild(pts_title)

            const periods: period[] = Object.values(ov.period)
            let total_pts = 0

            const tbody = document.createElement('tbody')
            table.appendChild(tbody)

            const pers = periods.sort((a:any, b: any) => {
                if(alotus === 'kevät') {
                    if(a.period === 3 || a.period === 4 || a.period === 5) {
                        if( b.period === 3 || b.period === 4)
                            return 1
                        return b.period - a.period
                    }
                    return a.period - b.period
                }
                else
                    return a.period - b.period
            })
            if(pers.length > 0)
                for (const p of pers) {

                    const hide = p.parts.length === 0;
                    const index = [1,3,5].indexOf(Number(p.period))
                    if(index !== -1) {
                        const kausi = document.createElement('tr')
                        tbody.appendChild(kausi)

                        const kausiTxt = document.createElement('td')
                        kausi.appendChild(kausiTxt)

                        if(index === 0)
                            kausiTxt.innerText = 'Syksy '+ov.year_number;
                        else if(index === 1)
                            kausiTxt.innerText = alotus === 'kevät' ? `Kevät ${ov.year_number}` : `Kevät ${ov.year_number+1}`;
                        else
                            kausiTxt.innerText = alotus === 'kevät' ? `Kesä ${ov.year_number}` : `Kesä ${ov.year_number+1}`;

                        if(hide)
                            kausi.style.display = 'none';
                    }


                    const prow = document.createElement('tr')
                    tbody.appendChild(prow)

                    prow.appendChild(document.createElement('td'))
                    const ptd = document.createElement('td')
                    ptd.innerText = 'Periodi '+p.period;
                    prow.appendChild(ptd)

                    if(hide)
                        prow.style.display = 'none'


                    for(const part of p.parts) {
                        const to_row = document.createElement('tr')
                        tbody.appendChild(to_row)

                        to_row.appendChild(document.createElement('td'))
                        const indicators = document.createElement('td')

                        const req = document.createElement('span')
                        if(part.required) {
                            req.setAttribute('class', 'circle ml1 req')
                        }
                        else {
                            req.setAttribute('class', 'circle ml1 req-not')
                        }
                        indicators.appendChild(req)

                        const yto = document.createElement('span')
                        if(isIDInTheList(yhteisetTutkinnonosatIDs, part.id)) {
                            yto.setAttribute('class', 'sqr yto mb1')
                        }
                        else {
                            yto.setAttribute('class', 'sqr amm mb1')
                        }
                        indicators.appendChild(yto)

                        to_row.appendChild(indicators)

                        const tname = document.createElement('td')
                        tname.innerText = part.name;
                        to_row.appendChild(tname)

                        const tpts = document.createElement('td')
                        tpts.setAttribute('class', 'pts')

                        tpts.innerText = ''+part.points;
                        to_row.appendChild(tpts)

                        total_pts += part.points
                    }
                }
            pts_title.innerText = ''+total_pts;
            ov_op_total += total_pts
        }


    const tbody = document.createElement('thead')
    table.appendChild(tbody)

    const ttrow = document.createElement('tr')
    tbody.appendChild(ttrow)

    const ttext = document.createElement('td')
    ttext.setAttribute('class', 'bold')
    ttrow.appendChild(ttext)

    ttrow.appendChild(document.createElement('td'))
    ttrow.appendChild(document.createElement('td'))

    const ttl_pts = document.createElement('td')
    ttl_pts.setAttribute('class', 'bold pts')
    ttrow.appendChild(ttl_pts)

    ttext.innerText = 'Opintopisteet yhteensä:';

    ttl_pts.innerText = ''+ov_op_total;

    try {
        window.print();
    } finally {
        PRINTELEMENT.remove()
    }

};

const saveToCSV = async (opinnot: academicYear[]) => {
    // Excel requires a UTF-8 byte-order mark to preserve Finnish characters.
    let csvdata = '\uFEFFOma Hoks;\r\n'

    let totalpoints = 0
    for(const ov of opinnot) {
        type PeriodKey = keyof typeof ov.period;
        csvdata += `\nVuosi ${ov.year_number};\r\n\r\n`

        for(const key in ov.period) {
            const k = key as PeriodKey;

            if (ov.period[k].parts.length > 0) {
                csvdata += `Periodi ${ov.period[k].period};\r\n`

                for(const part of ov.period[k].parts) {
                    totalpoints += part.points
                    csvdata += ['', `"${part.name}"`, `"${part.points.toString()}"`].join(';') + ';\r\n'
                }
            }

        }

    }
    csvdata += `\r\n;Opintopisteet yhteensä; ${Math.round(totalpoints)};`

    const blob = new Blob([csvdata], {type: 'text/csv;charset=utf-8;'})

    const time = new Date()
    const timestring = `${time.getDate()}-${(time.getMonth()+1)}-${time.getFullYear()}`

    const downloadbtn = document.createElement('a')
    downloadbtn.setAttribute('download', `omahoks_${timestring}`)
    downloadbtn.style.display = 'none'
    downloadbtn.href = URL.createObjectURL(blob)
    document.body.appendChild(downloadbtn)
    downloadbtn.click()
    downloadbtn.remove()


};

export {saveToPDF, saveToCSV}
