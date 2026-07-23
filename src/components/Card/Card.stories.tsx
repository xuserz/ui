import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Card } from './Card';

const meta = {
  title: 'Layout/Card',
  component: Card,
  args: {
    padding: 'md',
    children: <div style={{ width: '18rem' }}>Карточка объединяет связанный контент в отдельную поверхность.</div>,
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Compact: Story = { args: { padding: 'sm' } };
export const Spacious: Story = { args: { padding: 'lg' } };
