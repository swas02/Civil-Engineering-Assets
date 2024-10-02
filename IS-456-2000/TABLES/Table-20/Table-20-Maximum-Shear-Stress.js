class MaximumConcreteShearStrengthLookup {
    constructor() {
        this.maxShearStressData = {
            M15: 2.5,
            M20: 2.8,
            M25: 3.1,
            M30: 3.5,
            M35: 3.7,
            M40: 4.0,
        };
        this.validGrades = Object.keys(this.maxShearStressData);
    }

    getShearStress(grade) {
        if (!this.validGrades.includes(grade)) {
            const numericGrade = parseInt(grade.slice(1), 10);
            if (isNaN(numericGrade) || numericGrade < 15 || numericGrade > 40) {
                return { max_shear_stress_mpa: null, grade, error: "Invalid grade entered." };
            }
            return { max_shear_stress_mpa: null, grade, error: "Grade not found." };
        }
        return { grade, max_shear_stress_mpa: this.maxShearStressData[grade] };
    }
}
