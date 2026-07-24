import { Button, Card, Stack } from './index';

function App() {
  return (
    <main style={{ margin: '0 auto', padding: 'var(--ui-space-12)', width: 'min(100%, 54rem)' }}>
      <Stack gap={8}>
        <header>
          <p style={{ color: 'var(--ui-color-accent)', 'font-weight': 700, margin: 0 }}>SOLID UI STARTER</p>
          <h1 style={{ 'font-size': '2.5rem', margin: 'var(--ui-space-2) 0' }}>Начните с одного хорошего компонента</h1>
          <p style={{ color: 'var(--ui-color-neutral-500)', margin: 0 }}>Откройте Storybook, чтобы посмотреть все варианты и Templates.</p>
        </header>
        <Card>
          <Stack gap={4}>
            <strong>Команды проекта</strong>
            <code>npm run storybook</code>
            <code>npm run build</code>
            <Stack direction="horizontal" gap={3}>
              <Button>Primary action</Button>
              <Button mode="secondary">Secondary action</Button>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </main>
  );
}

export default App;
