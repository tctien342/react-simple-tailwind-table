import { IComponent } from '@type';
import { cx } from '@utils/common';
import React from 'react';

import styles from './index.module.scss';

/**
 * Init your props interface first
 */
export interface ITemplateProps {
  /**
   * Color of text
   */
  color?: string;
  title?: string;
}

/**
 * Then build your component
 */
export const Template: IComponent<ITemplateProps> = ({ color, title, children }) => {
  return (
    <h1 className={cx('f2 fw1', styles['text-bold'])} style={{ color }}>
      {title}
    </h1>
  );
};
