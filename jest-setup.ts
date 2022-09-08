// Import styles
import './src/styles/index.scss';
// Import lbi
import '@testing-library/jest-dom';

(HTMLCanvasElement as any).prototype.getContext = () => {
  // Add mock function for canvas elements
  console.log('getContext() Triggered.');
};
