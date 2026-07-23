import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Stack } from './Stack';

const itemStyle = {
  background: 'var(--ui-color-neutral-100)',
  border: '1px solid var(--ui-color-neutral-200)',
  'border-radius': 'var(--ui-radius-sm)',
  padding: 'var(--ui-space-3)',
};

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  args: {
    gap: 4,
    children: <><div style={itemStyle}>Первый</div><div style={itemStyle}>Второй</div><div style={itemStyle}>Третий</div></>,
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {};
export const Horizontal: Story = { args: { direction: 'horizontal', align: 'center' } };
export const Distributed: Story = { args: { direction: 'horizontal', justify: 'between', style: { width: '32rem' } } };
