# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Node Abstraction System Documentation

## Overview

This system provides a flexible, scalable abstraction layer for creating React Flow nodes with consistent styling and minimal code duplication. The abstraction eliminates the need to copy-paste node implementations and ensures design consistency across all node types.

## Key Benefits

✅ **Zero Code Duplication** - Shared logic centralized in reusable components  
✅ **Consistent Design** - All nodes follow the same design language  
✅ **Easy Maintenance** - Updates to BaseNode affect all nodes  
✅ **Fast Development** - New nodes can be created in minutes  
✅ **Type Safety** - Consistent prop interfaces across nodes  
✅ **Performance** - Optimized with useCallback to prevent re-renders

## Architecture

### Core Components

#### 1. BaseNode (`/components/ui/BaseNode.jsx`)
The foundation component that provides:
- Consistent styling with variants (input, output, process, llm)
- Handle management and positioning
- Icon and title display
- Size variants (small, default, large)
- Hover effects and transitions

#### 2. Form Components (`/components/ui/`)
- **FormField**: Consistent label and error display
- **Input**: Styled text inputs with variants
- **Select**: Dropdown with custom styling
- **Textarea**: Multi-line text input

#### 3. Helper Utilities (`/utils/nodeHelpers.js`)
- Handle creation helpers
- Position management utilities
- Node type constants

### Node Variants
- `input`: Blue theme for input nodes
- `output`: Green theme for output nodes  
- `process`: Purple theme for processing nodes
- `llm`: Orange theme for AI/ML nodes
- `default`: Gray theme for generic nodes

### Size Options
- `small`: 160px wide, compact for simple nodes
- `default`: 192px wide, standard size
- `large`: 224px wide, for complex nodes with many fields

## Demonstrated Node Types

### 1. **Filter Node**
- Multiple output handles (filtered/rejected)
- Conditional UI (case sensitivity toggle)
- Various filter operations (contains, regex, etc.)

### 2. **Transform Node**
- Dynamic UI based on selected operation
- Custom JavaScript code input for advanced transforms
- String manipulation operations

### 3. **Delay Node**
- Time duration with units (ms, seconds, minutes)
- Numeric input validation
- Simple configuration interface

### 4. **Conditional Node**
- Multiple output paths (true/false)
- Data type selection affecting input validation
- Complex branching logic

### 5. **Database Node**
- Multiple connection types
- SQL query input
- Error handling output

## Performance Optimizations

### 1. useCallback Pattern
All event handlers use `useCallback` to prevent unnecessary re-renders:

### 2. Stable Handle Definitions
Handles are defined outside render to prevent React Flow re-connections:

### 3. Conditional Rendering
Only render complex UI elements when needed:

## Styling System

### Tailwind Configuration
Custom colors and utilities defined in `tailwind.config.js`:

```javascript
colors: {
  node: {
    bg: '#1e293b',
    border: '#334155',
    // ... more colors
  }
}
```

### Component Styling
- Consistent spacing with `space-y-2`
- Opacity-based hover effects
- Smooth transitions for all interactive elements
- Focus states for accessibility

## Adding New Node Types

### Step 1: Create Node Component
Follow the pattern shown above in `/nodes/YourNode.jsx`

### Step 2: Register Node Type
Add to `/nodeTypes.js`:

### Step 3: Add to Categories
Update `nodeCategories` in `/nodeTypes.js`:

## Error Prevention

### Common Pitfalls Avoided
1. **Infinite Re-renders**: Fixed with proper useCallback usage
2. **Handle Misalignment**: Consistent positioning with helper functions
3. **Styling Inconsistencies**: Centralized theme system
4. **State Management**: Simplified with local state pattern

### Best Practices
- Always use `useCallback` for event handlers
- Define handles outside of render
- Use semantic HTML for accessibility
- Test with React StrictMode enabled
- Validate props with PropTypes or TypeScript

## Future Enhancements

### Planned Features
- [ ] Node validation system
- [ ] Custom node templates
- [ ] Drag-and-drop node creation
- [ ] Node grouping/clustering
- [ ] Real-time collaboration
- [ ] Undo/redo functionality

### Extensibility Points
- Custom variants can be added to BaseNode
- New form components can extend the UI library
- Node categories can be dynamically loaded
- Themes can be switched at runtime

## Migration Guide

### From Old Nodes
1. Replace styled divs with `<BaseNode>`
2. Move form fields to use UI components
3. Convert handles to use helper functions
4. Add useCallback to event handlers

### Example Migration
```javascript
// Old way
<div style={{width: 200, height: 80, border: '1px solid black'}}>
  <input onChange={(e) => setValue(e.target.value)} />
</div>

// New way
<BaseNode title="Node" variant="process">
  <FormField label="Value">
    <Input onChange={useCallback((e) => setValue(e.target.value), [])} />
  </FormField>
</BaseNode>
```

This abstraction system provides a solid foundation for scalable node-based applications while maintaining performance and design consistency.