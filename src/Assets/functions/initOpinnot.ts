export default function initOpinnot(setOpinnot: any) {
    let opinnot: any[] = [];

    const savedOpinnot = localStorage.getItem('opinnot');
    if (savedOpinnot) {
        try {
            opinnot = JSON.parse(savedOpinnot) as any[];
            setOpinnot(opinnot);
            return;
        } catch {
            localStorage.removeItem('opinnot');
        }
    }
    const d = new Date();
    const currentYear = d.getFullYear();

    for (let i = 1; i < 4; i++) {
        const year_period_string = `${currentYear + (i - 1)}-${currentYear + i}`;
        const periods_obj: any = {};

        for (let p = 1; p < 6; p++) {
            periods_obj[`p${p}`] = {
                period: p,
                parts: [],
            };
        }

        opinnot.push({
            academic_year: i,
            year_period: year_period_string,
            period: periods_obj,
            year_number: currentYear + (i - 1)
        })
    }

    setOpinnot(opinnot);
}
