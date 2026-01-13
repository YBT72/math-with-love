# AI AGENT INSTRUCTIONS FOR PROFESSIONAL WEB DEVELOPMENT

## CORE PRINCIPLES

### MANDATORY INTERACTION RULES

**NEVER implement code without prior task discussion**
**ALWAYS ask clarifying questions when requirements are unclear**
**MANDATORY complete verification of syntax, logic, and structure before demonstration**
**FORBIDDEN to show results without full verification of all aspects**
**FOR ANY DOUBTS - discuss solution options, DO NOT make decisions independently**

### WORK METHODOLOGY

#### Phase 1: Task Analysis
1. **Thoroughly study the task and ask ALL clarifying questions**
2. **Always analyze potential consequences of changes affecting other project functionality**
3. **Obtain comprehensive answers to each question**
4. **Document all assumptions and constraints**

#### Phase 2: Implementation Planning
1. **Design system architecture before coding**
2. **Plan component interactions and data flow**
3. **Identify potential integration points**
4. **Define testing strategy**

#### Phase 3: Code Development
1. **Follow established coding standards**
2. **Implement with comprehensive error handling**
3. **Add detailed English-language comments**
4. **Ensure modularity and maintainability**

#### Phase 4: Quality Assurance
1. **Thoroughly verify code for errors, logic, syntax**
2. **Test all execution paths mentally**
3. **Validate all events and handlers**
4. **Check function logic and interactions**
5. **Only show results after complete verification**

## PROJECT STRUCTURE STANDARDS

### Directory Organization
```
project-root/
├── src/
│   ├── components/          # Reusable UI components
│   ├── modules/            # Business logic modules
│   ├── utils/              # Utility functions
│   ├── assets/             # Static resources
│   ├── styles/             # CSS/styling files
│   └── tests/              # Test files
├── docs/                   # Documentation
├── config/                 # Configuration files
├── dist/                   # Build output
└── README.md              # Project documentation
```

### File Naming Conventions
- **Components**: PascalCase (e.g., `VectorLaboratory.js`)
- **Modules**: camelCase (e.g., `mathCalculations.js`)
- **Utilities**: camelCase (e.g., `coordinateTransform.js`)
- **Styles**: kebab-case (e.g., `vector-display.css`)
- **Tests**: `[filename].test.js`

## CODE QUALITY STANDARDS

### JavaScript Standards
```javascript
// REQUIRED: Comprehensive documentation
/**
 * Transforms mathematical coordinates to Three.js coordinate system
 * @param {Object} mathCoords - Mathematical coordinate object {x, y, z}
 * @param {number} mathCoords.x - X coordinate in math system
 * @param {number} mathCoords.y - Y coordinate in math system  
 * @param {number} mathCoords.z - Z coordinate in math system
 * @returns {Object} Three.js coordinate object
 */
function mathToThree(mathCoords) {
    // Input validation
    if (!mathCoords || typeof mathCoords !== 'object') {
        throw new Error('Invalid coordinate object provided');
    }
    
    // Coordinate transformation logic
    return {
        x: mathCoords.x,
        y: mathCoords.z,  // Math Y becomes Three Z
        z: -mathCoords.y  // Math Z becomes Three -Y
    };
}
```

### Error Handling Requirements
```javascript
// MANDATORY: Comprehensive error handling
try {
    const result = processComplexCalculation(data);
    validateResult(result);
    return result;
} catch (error) {
    console.error('Processing failed:', error.message);
    // Graceful degradation or user notification
    handleError(error);
    return null;
}
```

### Validation Standards
```javascript
// REQUIRED: Input validation for all functions
function validateInput(value, type, constraints = {}) {
    if (value === null || value === undefined) {
        throw new Error(`${type} cannot be null or undefined`);
    }
    
    // Type-specific validation
    switch (type) {
        case 'number':
            if (typeof value !== 'number' || isNaN(value)) {
                throw new Error(`Expected number, got ${typeof value}`);
            }
            if (constraints.min !== undefined && value < constraints.min) {
                throw new Error(`Value ${value} below minimum ${constraints.min}`);
            }
            if (constraints.max !== undefined && value > constraints.max) {
                throw new Error(`Value ${value} above maximum ${constraints.max}`);
            }
            break;
        // Additional type validations...
    }
    
    return true;
}
```

## THREE.JS VISUALIZATION PRINCIPLES

### Strict Coordinate System Rules
```javascript
// MATHEMATICAL SYSTEM: All data and calculations
const mathSystem = {
    coordinates: { x, y, z },           // Mathematical coordinate system
    calculations: mathOperations,        // All computations in math space
    formulas: mathFormulas,             // All mathematical formulas
    display: mathDisplaySystem          // Coordinate display in math terms
};

// THREE.JS SYSTEM: Only for visualization
const threeSystem = {
    visualization: threeJsObjects,      // Only visual representation
    raycasting: threeRaycastResults,    // Only interaction detection
    rendering: threeRenderer            // Only graphics rendering
};

// TRANSFORMATION FUNCTIONS: Required for conversion
function mathToThree(mathCoords) {
    // Convert from mathematical to Three.js coordinate system
}

function threeToMath(threeCoords) {
    // Convert from Three.js to mathematical coordinate system
}
```

### Data Flow Architecture
```javascript
// CORRECT FLOW: Math → Transform → Three.js
const mathResult = calculateInMathSpace(inputData);
const threeCoords = mathToThree(mathResult);
const visualObject = createThreeJsObject(threeCoords);

// CORRECT FLOW: Three.js Interaction → Transform → Math
const threeIntersection = raycaster.intersectObjects(objects);
const mathCoords = threeToMath(threeIntersection.point);
const processedResult = processInMathSpace(mathCoords);
```

## COMMUNICATION STANDARDS

### Question Framework
When requirements are unclear, ask:

1. **Functional Requirements**:
   - What specific functionality is needed?
   - What are the expected inputs and outputs?
   - What are the performance requirements?

2. **Technical Constraints**:
   - What technologies must be used?
   - Are there compatibility requirements?
   - What are the browser support needs?

3. **Integration Points**:
   - How does this integrate with existing code?
   - What dependencies are acceptable?
   - What APIs or external services are involved?

4. **User Experience**:
   - What is the expected user workflow?
   - What are the accessibility requirements?
   - What are the responsive design needs?

### Solution Presentation Format
```markdown
## Proposed Solution

### Approach
[Detailed explanation of the chosen approach]

### Architecture
[System design and component interactions]

### Implementation Plan
1. [Step-by-step implementation phases]
2. [Dependencies and prerequisites]
3. [Testing and verification strategy]

### Potential Risks
- [Risk 1: Description and mitigation]
- [Risk 2: Description and mitigation]

### Questions for Confirmation
1. [Specific question about approach]
2. [Verification of understanding]
```

## TESTING AND VERIFICATION CHECKLIST

### Pre-Implementation Checklist
- [ ] All requirements clearly understood
- [ ] All edge cases identified
- [ ] Integration points documented
- [ ] Error handling strategy defined
- [ ] Testing approach planned

### Pre-Demonstration Checklist
- [ ] Syntax validation completed
- [ ] Logic flow verified
- [ ] Error handling tested
- [ ] Integration points verified
- [ ] Performance implications assessed
- [ ] Documentation completed
- [ ] All comments in English

### Code Review Points
1. **Functionality**: Does the code solve the stated problem?
2. **Reliability**: Are all error conditions handled?
3. **Maintainability**: Is the code easy to understand and modify?
4. **Performance**: Are there any performance bottlenecks?
5. **Security**: Are there any security vulnerabilities?
6. **Standards**: Does the code follow established patterns?

## FORBIDDEN PRACTICES

### Never Do
- ❌ Show non-working code
- ❌ Make assumptions without clarification
- ❌ Skip verification phase
- ❌ Implement functions without detailed requirements understanding
- ❌ Mix coordinate systems in calculations
- ❌ Use Three.js coordinates for mathematical operations
- ❌ Write comments in languages other than English

### Always Do
- ✅ Ask clarifying questions first
- ✅ Verify all code before presentation
- ✅ Separate mathematical and visual coordinate systems
- ✅ Provide comprehensive error handling
- ✅ Document all assumptions and decisions
- ✅ Test edge cases and error conditions

## DOCUMENTATION REQUIREMENTS

### Function Documentation Template
```javascript
/**
 * [Brief description of function purpose]
 * 
 * @description [Detailed description of what the function does]
 * @param {type} paramName - [Parameter description]
 * @param {type} [optionalParam] - [Optional parameter description]
 * @returns {type} [Description of return value]
 * @throws {Error} [Description of when errors are thrown]
 * @example
 * // [Usage example]
 * const result = functionName(param1, param2);
 */
```

### Module Documentation Template
```javascript
/**
 * @fileoverview [Module purpose and functionality]
 * @author AI Agent
 * @version 1.0.0
 * @requires [List of dependencies]
 */
```

## PROJECT MANAGEMENT

### Git Workflow
1. **Feature Branches**: Create separate branches for each feature
2. **Commit Messages**: Use conventional commit format
3. **Code Reviews**: All code must be reviewed before merging
4. **Testing**: All features must have tests

### Version Control Standards
```bash
# Commit message format
type(scope): description

# Examples
feat(vector): add cross product calculation
fix(ui): correct coordinate display formatting
docs(readme): update installation instructions
```

This instruction set ensures professional-quality web development with strict adherence to quality standards, proper separation of concerns, and comprehensive verification processes.
