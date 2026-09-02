import { useEffect, useRef } from 'react';
import TSCanvasStyle from './TSCanvas.module.css';

export default function TSCanvas({ opinnot, onClose }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const closeOnEscape = (event) => {
            if (event.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', closeOnEscape);
        return () => document.removeEventListener('keydown', closeOnEscape);
    }, [onClose]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!canvas || !context) return;

        const menuHeight = 100;
        const width = window.innerWidth;
        const height = window.innerHeight - menuHeight;
        const headerHeight = 100;
        const bottomHeaderHeight = 100;
        const tableLeftMargin = 100;
        const tableHeight = height - headerHeight - bottomHeaderHeight;
        const tableWidth = width - tableLeftMargin;

        canvas.width = width;
        canvas.height = height;
        canvas.style.backgroundColor = 'whitesmoke';
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.style.position = 'absolute';
        canvas.style.top = `${menuHeight}px`;
        canvas.style.left = '0';
        canvas.style.zIndex = '200';

        function drawBox(x, y, boxWidth, boxHeight, color) {
            context.fillStyle = color;
            context.strokeStyle = 'black';
            context.lineWidth = 1;
            context.beginPath();
            context.fillRect(x, y, boxWidth, boxHeight);
            context.rect(x, y, boxWidth, boxHeight);
            context.stroke();
        }

        function drawLine(x1, y1, x2, y2, color = 'black', lineWidth = 1) {
            context.strokeStyle = color;
            context.lineWidth = lineWidth;
            context.beginPath();
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.stroke();
        }

        function drawText(x, y, value, color = 'black', fontSize = 16) {
            context.font = `${fontSize}px Open Sans`;
            context.fillStyle = color;
            context.fillText(value, x, y);
        }

        const rowHeight = tableHeight / 5;
        const bottomY = headerHeight + tableHeight;
        for (let index = 0; index < 6; index += 1) {
            const y = bottomY - rowHeight * index;
            drawLine(tableLeftMargin - 40, y, width, y);
            drawText(tableLeftMargin - 40, y - 5, String(index * 10), 'black', 22);
        }

        drawLine(tableLeftMargin - 40, 357, width, rowHeight + 228, 'green', 2);

        for (const [yearIndex, academicYear] of opinnot.entries()) {
            const yearWidth = tableWidth / opinnot.length;
            const yearX = yearIndex * yearWidth + tableLeftMargin;
            const periodWidth = yearWidth / 5;
            const periods = Object.values(academicYear.period);

            for (const [periodIndex, period] of periods.entries()) {
                const periodPoints = period.parts.reduce(
                    (total, part) => total + part.points,
                    0
                );
                const periodX = yearX + periodIndex * periodWidth;

                if (periodPoints > 0) {
                    drawBox(
                        periodX + 5,
                        bottomY,
                        periodWidth - 10,
                        -((periodPoints / 50) * tableHeight),
                        '#083464'
                    );
                    drawText(
                        periodX + periodWidth / 2 - 12,
                        bottomY - (periodPoints / 50) * tableHeight + 30,
                        String(periodPoints),
                        'white',
                        22
                    );
                }

                drawText(
                    periodX + 24,
                    bottomY + bottomHeaderHeight / 2,
                    `Jakso ${period.period}`,
                    'black',
                    20
                );
            }

            drawLine(yearIndex * yearWidth + tableLeftMargin, 50, yearIndex * yearWidth + tableLeftMargin, height - 40);
            drawText(yearX + yearWidth / 4 + 10, headerHeight - 25, `Lukuvuosi ${academicYear.year_period}`, 'black', 26);
        }

        drawText(10, 30, 'Opintopisteet', 'black', 13);
    }, [opinnot]);

    return (
        <>
            <canvas id="Tavoite-seuranta" ref={canvasRef} />
            <button
                type="button"
                className={TSCanvasStyle.closeButton}
                onClick={onClose}
                aria-label="Sulje tavoiteseuranta"
                autoFocus>
                <span aria-hidden="true">×</span>
                Sulje
            </button>
        </>
    );
}
