
export interface year {
    year: string | number,
    year_period: string,
    periods: period[]
}

export interface academicYear {
    academic_year: string | number,
    year_period: string,
    year_number: number,
    period: {
        p1: period,
        p2: period,
        p3: period,
        p4: period,
        p5: period,
    }
}

export interface period {
    period: number | string,
    parts: part[],
}

export interface part {
    id: number,
    name: string,
    points: number,
    required: boolean,
    to_ref: number,
    to_children: any
}

export interface opTotals {
    total: number,
    academic_years: academic_year_points[]
}

export interface academic_year_points {
    year: number
}