# Shear Strength Calculator Documentation

## Overview

The `ShearStrengthCalculator` is a JavaScript class designed to compute the design shear strength of concrete based on input parameters. It uses predefined shear strength data for various grades of concrete (M15 to M40) and supports interpolation between values.

## CDN Usage

To use the `ShearStrengthCalculator` as a CDN, include the script in your HTML file:

```html
<script src="https://swas02.github.io/Civil-Engineering-Assets/IS-456-2000/TABLES/Table-19/Table-19-Design-Shear-Strength-of-Concrete.js"></script>
```

## How to Use

### 1. Create an Instance

Create an instance of the `ShearStrengthCalculator` class:

```javascript
const calculator = new ShearStrengthCalculator();
```

### 2. Calculate Shear Strength

Use the `getShearStrength` method to calculate the shear strength. This method requires two parameters:
- `grade`: The grade of concrete (e.g., "M15", "M20", "M25", "M30", "M35", "M40").
- `input100AsBdValue`: A numeric value representing the ratio \( \frac{100A_s}{bd} \).

#### Example

```javascript
const result = calculator.getShearStrength("M25", 1.0);
console.log(result);
```

### 3. Response Structure

The response from the `getShearStrength` method will have the following structure:

```json
{
  "grade": "M25",
  "the100AsBdValue": 1.0,
  "value": 0.64, // or null in case of an error
  "message": null // or error message if applicable
}
```

### Success Cases

Here are some example success cases:

- **Test Grade**: `M15`, **100As/bd Value**: `1`
  - **Result**:
    ```json
    {
      "grade": "M15",
      "the100AsBdValue": 1,
      "value": 0.6
    }
    ```

- **Test Grade**: `M20`, **100As/bd Value**: `2.5`
  - **Result**:
    ```json
    {
      "grade": "M20",
      "the100AsBdValue": 2.5,
      "value": 0.82
    }
    ```

### Error Cases

1. **Invalid Grade Below Minimum**
   - **Test Grade**: `M10`
   - **100As/bd Value**: `1`
   - **Result**:
     ```json
     {
       "grade": "M10",
       "the100AsBdValue": 1,
       "value": null,
       "message": "Grade is below minimum available (M15)."
     }
     ```

2. **Non-numeric 100As/bd Value**
   - **Test Grade**: `M20`
   - **100As/bd Value**: `'abc'`
   - **Result**:
     ```json
     {
       "grade": "M20",
       "the100AsBdValue": "abc",
       "value": null,
       "message": "100AsBdValue is not a number."
     }
     ```

3. **100As/bd Value Below Minimum**
   - **Test Grade**: `M15`
   - **100As/bd Value**: `0.1`
   - **Result**:
     ```json
     {
       "grade": "M15",
       "the100AsBdValue": 0.1,
       "value": 0.28
     }
     ```

4. **Invalid Grade Above Maximum**
   - **Test Grade**: `M50`
   - **100As/bd Value**: `1`
   - **Result**:
     ```json
     {
       "grade": "M50",
       "the100AsBdValue": 1,
       "value": null,
       "message": "Grade exceeds maximum available (M40)."
     }
     ```

5. **Invalid Grade Not in Available List**
   - **Test Grade**: `M00`
   - **100As/bd Value**: `1`
   - **Result**:
     ```json
     {
       "grade": "M00",
       "the100AsBdValue": 1,
       "value": null,
       "message": "Grade is below minimum available (M15)."
     }
     ```

### Example of Error Handling

You can test the error cases using the following code snippet:

```javascript
const calculator = new ShearStrengthCalculator();

// Test invalid grade below minimum
console.log(calculator.getShearStrength("M10", 1));

// Test non-numeric 100As/bd value
console.log(calculator.getShearStrength("M20", 'abc'));

// Test 100As/bd value below minimum
console.log(calculator.getShearStrength("M15", 0.1));

// Test invalid grade above maximum
console.log(calculator.getShearStrength("M50", 1));

// Test invalid grade not in available list
console.log(calculator.getShearStrength("M00", 1));
```

### Conclusion

The `ShearStrengthCalculator` class provides a straightforward method for determining the shear strength of concrete based on specific input values and grades. Ensure that you handle potential errors gracefully in your implementation, as outlined in the error cases.

This comprehensive documentation should help you effectively integrate and utilize the `ShearStrengthCalculator` in your projects!