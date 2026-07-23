import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { SettingsTemplate } from './SettingsTemplate';

const meta = {
  title: 'Templates/Settings page',
  component: SettingsTemplate,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SettingsTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Полный пример композиции из Button, Card и Stack. */
export const Default: Story = {};
