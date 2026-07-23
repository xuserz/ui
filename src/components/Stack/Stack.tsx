import { splitProps } from 'solid-js';
import type { JSX } from 'solid-js';
import styles from './Stack.module.css';

export type StackProps = JSX.HTMLAttributes<HTMLDivElement> & {
  direction?: 'vertical' | 'horizontal';
  gap?: 1 | 2 | 3 | 4 | 6 | 8;
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'between' | 'end';
};

export function Stack(props: StackProps) {
  const [local, stackProps] = splitProps(props, ['direction', 'gap', 'align', 'justify', 'class']);
  const className = () => [
    styles.stack,
    styles[local.direction ?? 'vertical'],
    styles[`gap${local.gap ?? 4}`],
    styles[`align${(local.align ?? 'start').replace(/^./, (letter) => letter.toUpperCase())}`],
    styles[`justify${(local.justify ?? 'start').replace(/^./, (letter) => letter.toUpperCase())}`],
    local.class,
  ].filter(Boolean).join(' ');

  return <div {...stackProps} class={className()} />;
}
