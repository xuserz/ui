import type { Preview } from 'storybook-solidjs-vite'
import '../src/styles/global.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      options: {
        canvas: { name: 'Canvas', value: '#f6f7fb' },
        surface: { name: 'Surface', value: '#ffffff' },
        dark: { name: 'Dark', value: '#16181d' },
      },
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
