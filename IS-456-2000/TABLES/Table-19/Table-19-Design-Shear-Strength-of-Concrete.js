const designShearStrengthOfConcrete = [
    {
      design_shear_strength_of_concrete: {
        table: {
          "100_As/bd": [
            { value: 0.15, M15: 0.28, M20: 0.28, M25: 0.29, M30: 0.29, M35: 0.29, M40: 0.3 },
            { value: 0.25, M15: 0.35, M20: 0.36, M25: 0.36, M30: 0.37, M35: 0.37, M40: 0.38 },
            { value: 0.5, M15: 0.46, M20: 0.48, M25: 0.49, M30: 0.5, M35: 0.5, M40: 0.51 },
            { value: 0.75, M15: 0.54, M20: 0.56, M25: 0.57, M30: 0.59, M35: 0.59, M40: 0.6 },
            { value: 1, M15: 0.6, M20: 0.62, M25: 0.64, M30: 0.66, M35: 0.67, M40: 0.68 },
            { value: 1.25, M15: 0.64, M20: 0.67, M25: 0.7, M30: 0.71, M35: 0.73, M40: 0.74 },
            { value: 1.5, M15: 0.68, M20: 0.72, M25: 0.74, M30: 0.76, M35: 0.78, M40: 0.79 },
            { value: 1.75, M15: 0.71, M20: 0.75, M25: 0.78, M30: 0.8, M35: 0.82, M40: 0.84 },
            { value: 2, M15: 0.71, M20: 0.79, M25: 0.82, M30: 0.84, M35: 0.86, M40: 0.88 },
            { value: 2.25, M15: 0.71, M20: 0.81, M25: 0.85, M30: 0.88, M35: 0.9, M40: 0.92 },
            { value: 2.5, M15: 0.71, M20: 0.82, M25: 0.88, M30: 0.91, M35: 0.93, M40: 0.95 },
            { value: 2.75, M15: 0.71, M20: 0.82, M25: 0.9, M30: 0.94, M35: 0.96, M40: 0.98 },
            { value: 3, M15: 0.71, M20: 0.82, M25: 0.92, M30: 0.96, M35: 0.99, M40: 1.01 },
          ],
        },
      },
    },
  ];
  
  class ConcreteShearStrengthLookup {
    constructor() {
      this.data = designShearStrengthOfConcrete;
      this.grades = Object.keys(this.data[0].design_shear_strength_of_concrete.table["100_As/bd"][0]).filter(key => key !== "value");
      this.values = this.data[0].design_shear_strength_of_concrete.table["100_As/bd"].map(row => row.value);
  
      this.errorMessages = {
        invalidInput: "Invalid grade of concrete.",
        notANumber: "100AsBdValue is not a number.",
        dataNotFound: "Shear strength data not found.",
        interpolationRowsNotFound: "Interpolation rows not found.",
        gradeTooHigh: "Grade exceeds maximum available (M40).",
        gradeTooLow: "Grade is below minimum available (M15).",
      };
    }
  
    check100AsBd(val) {
      const { values } = this;
      if (val <= values[0]) return { interpolation: false, value: values[0] };
      if (val >= values[values.length - 1]) return { interpolation: false, value: values[values.length - 1] };
      if (values.includes(val)) return { interpolation: false, value: val };
  
      const lower = Math.max(...values.filter(v => v < val));
      const upper = values.find(v => v > val);
      return { interpolation: true, value: { lower, upper } };
    }
  
    checkGrade(grade) {
      const numericGrade = +grade.slice(1);
      const maxGrade = +this.grades[this.grades.length - 1].slice(1);
      const minGrade = +this.grades[0].slice(1);
  
      if (this.grades.includes(grade)) return { grade };
      if (numericGrade > maxGrade) return { grade: null, message: this.errorMessages.gradeTooHigh };
      if (numericGrade < minGrade) return { grade: null, message: this.errorMessages.gradeTooLow };
      return { grade: null };
    }
  
    getShearStrength(grade, input100AsBdValue) {
      const gradeCheck = this.checkGrade(grade);
      const validGrade = gradeCheck.grade;
  
      if (!validGrade) {
        return this._invalidResponse(grade, input100AsBdValue, gradeCheck.message || this.errorMessages.invalidInput);
      }
      if (typeof input100AsBdValue !== "number" || isNaN(input100AsBdValue)) {
        return this._invalidResponse(validGrade, input100AsBdValue, this.errorMessages.notANumber);
      }
  
      const { interpolation, value } = this.check100AsBd(input100AsBdValue);
      const row = (v) => this.data[0].design_shear_strength_of_concrete.table["100_As/bd"].find(r => r.value === v);
  
      if (!interpolation) {
        const foundRow = row(value);
        if (!foundRow) return this._invalidResponse(validGrade, input100AsBdValue, this.errorMessages.dataNotFound);
        return this._successResponse(validGrade, input100AsBdValue, foundRow[validGrade]);
      } else {
        const lowerRow = row(value.lower);
        const upperRow = row(value.upper);
        if (!lowerRow || !upperRow) return this._invalidResponse(validGrade, input100AsBdValue, this.errorMessages.interpolationRowsNotFound);
  
        const shearStrength = lowerRow[validGrade] + ((upperRow[validGrade] - lowerRow[validGrade]) * (input100AsBdValue - value.lower)) / (value.upper - value.lower);
        return this._successResponse(validGrade, input100AsBdValue, shearStrength);
      }
    }
  
    _invalidResponse(grade, input100AsBdValue, message) {
      return {
        grade,
        the100AsBdValue: input100AsBdValue,
        value: null,
        message,
      };
    }
  
    _successResponse(grade, input100AsBdValue, value) {
      return { grade, the100AsBdValue: input100AsBdValue, value };
    }
  }
  
  // Expose the class globally
  if (typeof window !== 'undefined') {
    window.ConcreteShearStrengthLookup = ConcreteShearStrengthLookup;
  }
  