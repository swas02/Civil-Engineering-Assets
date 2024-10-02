# Maximum Concrete Shear Strength Lookup Documentation

## Overview

The `MaximumConcreteShearStrengthLookup` is a JavaScript class designed to retrieve the maximum shear strength of concrete for various grades (M15 to M40). It utilizes predefined shear strength data and provides error handling for invalid inputs.

## CDN Usage

To use the `MaximumConcreteShearStrengthLookup` as a CDN, include the script in your HTML file:

```html
<script src="https://swas02.github.io/Civil-Engineering-Assets/IS-456-2000/TABLES/Table-20/Table-20-Maximum-Shear-Stress.js"></script>
```

## Class Definition

### MaximumConcreteShearStrengthLookup

#### Constructor

- **`constructor()`**: Initializes the shear strength data and valid grades.

```javascript
const lookup = new MaximumConcreteShearStrengthLookup();
```

## Methods

### getShearStress

- **`getShearStress(grade)`**: Returns the maximum shear strength for the specified concrete grade.

#### Parameters

- `grade` (String): The grade of concrete (e.g., "M15", "M20", "M25", "M30", "M35", "M40").

#### Returns

- An object containing:
  - `grade` (String): The requested grade.
  - `max_shear_stress_mpa` (Number|null): The maximum shear strength in MPa or null in case of an error.
  - `error` (String|null): An error message if applicable.

#### Example

```javascript
const result = lookup.getShearStress("M25");
console.log(result);
// Output: { grade: 'M25', max_shear_stress_mpa: 3.1, error: null }
```

## Response Structure

The response from the `getShearStress` method has the following structure:

```json
{
  "grade": "M25",
  "max_shear_stress_mpa": 3.1, // or null in case of an error
  "error": null // or error message if applicable
}
```

## Success Cases

Here are some example success cases:

1. **Test Grade**: `M15`
   - **Result**:
   ```json
   {
     "grade": "M15",
     "max_shear_stress_mpa": 2.5,
     "error": null
   }
   ```

2. **Test Grade**: `M30`
   - **Result**:
   ```json
   {
     "grade": "M30",
     "max_shear_stress_mpa": 3.5,
     "error": null
   }
   ```

## Error Cases

1. **Invalid Grade Below Minimum**
   - **Test Grade**: `M10`
   - **Result**:
   ```json
   {
     "grade": "M10",
     "max_shear_stress_mpa": null,
     "error": "Invalid grade entered."
   }
   ```

2. **Invalid Grade Above Maximum**
   - **Test Grade**: `M45`
   - **Result**:
   ```json
   {
     "grade": "M45",
     "max_shear_stress_mpa": null,
     "error": "Grade not found."
   }
   ```

3. **Invalid Grade Not in Available List**
   - **Test Grade**: `M00`
   - **Result**:
   ```json
   {
     "grade": "M00",
     "max_shear_stress_mpa": null,
     "error": "Invalid grade entered."
   }
   ```

## Example of Error Handling

You can test the error cases using the following code snippet:

```javascript
const lookup = new MaximumConcreteShearStrengthLookup();

// Test invalid grade below minimum
console.log(lookup.getShearStress("M10"));

// Test invalid grade above maximum
console.log(lookup.getShearStress("M45"));

// Test invalid grade not in available list
console.log(lookup.getShearStress("M00"));
```

## Conclusion

The `MaximumConcreteShearStrengthLookup` class provides a simple way to retrieve the maximum shear strength of concrete for various grades. Ensure that you handle potential errors gracefully in your implementation as outlined in the error cases.

This documentation should assist you in effectively integrating and utilizing the `MaximumConcreteShearStrengthLookup` class in your projects!
