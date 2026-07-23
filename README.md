# Solid UI

Стартовая библиотека UI-компонентов на Solid + TypeScript. Storybook здесь служит каталогом,
документацией и живой песочницей компонентов.

## Команды

```bash
npm run dev              # небольшая локальная страница-подсказка
npm run storybook        # каталог компонентов и Templates, http://localhost:6006
npm run check            # проверка TypeScript
npm run build            # сборка библиотеки в dist/
npm run build-storybook  # статическая документация в storybook-static/
```

## Как создавать компонент

1. Создай `src/components/ComponentName/`.
2. Добавь `ComponentName.tsx`, `ComponentName.module.css`, `ComponentName.stories.tsx`, `index.ts`.
3. Используй только токены (`var(--ui-...)`) вместо произвольных цветов и отступов.
4. Добавь все поддерживаемые варианты в stories. Они становятся частью публичного контракта.
5. Экспортируй компонент из `src/index.ts`.

## Templates

`src/templates` — место для готовых сценариев, составленных из компонентов: форма, настройки,
страница профиля, пустое состояние. Template не заменяет компоненты — он показывает, как их
правильно сочетать. У каждого Template тоже должна быть story в полноэкранном layout.

## Solid: важное правило

Не деструктурируй `props` в параметрах компонента: в Solid это может нарушить реактивность.
Используй `props.name`, `splitProps` и `mergeProps`.
