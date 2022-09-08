import { ISvgComponent } from '@type';
import React from 'react';

export const __TemplateIcon: ISvgComponent = ({
  color = 'green',
  opacity = 1,
  width = '100%',
  height = '100%',
  className = '',
}) => {
  return (
    <svg
      height={height}
      className={className}
      viewBox="0 0 24 24"
      opacity={opacity}
      width={width}
      xmlns="http://www.w3.org/2000/svg"></svg>
  );
};
