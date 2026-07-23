import { splitProps } from 'solid-js';
import type { JSX } from 'solid-js';
import styles from './Card.module.css';

export type CardProps = JSX.HTMLAttributes<HTMLElement> & {
  padding?: 'none' | 'sm' | 'md' | 'lg';
};

export function Card(props: CardProps) {
  const [local, cardProps] = splitProps(props, ['padding', 'class']);
  const padding = () => `padding${(local.padding ?? 'md').replace(/^./, (letter) => letter.toUpperCase())}`;

  return <section {...cardProps} class={[styles.card, styles[padding()], local.class].filter(Boolean).join(' ')} />;
}
