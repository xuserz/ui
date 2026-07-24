import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Stack } from '../../components/Stack';
import styles from './SettingsTemplate.module.css';

/**
 * A composition example, not a primitive. Templates show how components work
 * together and are the right place to document product-level patterns.
 */
export function SettingsTemplate() {
  return (
    <main class={styles.page}>
      <Stack gap={8}>
        <header>
          <h1 class={styles.heading}>Настройки профиля</h1>
          <p class={styles.description}>Пример Template: готовая композиция, которую можно взять за основу экрана.</p>
        </header>

        <Card>
          <Stack gap={6}>
            <Stack gap={2}>
              <label class={styles.label} for="name">Имя</label>
              <input class={styles.input} id="name" value="Алексей" />
            </Stack>
            <Stack gap={2}>
              <label class={styles.label} for="email">Email</label>
              <input class={styles.input} id="email" type="email" value="alex@example.com" />
            </Stack>
            <hr class={styles.divider} />
            <Stack direction="horizontal" gap={3} justify="end">
              <Button mode="secondary">Отмена</Button>
              <Button>Сохранить</Button>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </main>
  );
}
