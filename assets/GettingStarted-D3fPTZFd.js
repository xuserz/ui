import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{i as t,t as n}from"./react-BIZwcLtw.js";import{a as r}from"./chunk-W22LQPXL-D9A1WUEc.js";import{c as i,o as a,r as o,s}from"./blocks-C1dA4Y5k.js";var c=e((()=>{n()}));function l(e){let n={code:`code`,h2:`h2`,p:`p`,pre:`pre`,...t(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(a,{title:`Guide/Начало работы`}),`
`,(0,d.jsx)(s,{children:`Как работать с этой библиотекой`}),`
`,(0,d.jsx)(o,{children:(0,d.jsxs)(n.p,{children:[`Storybook — главный каталог компонентов. Для каждого компонента добавляй состояния в
`,(0,d.jsx)(n.code,{children:`*.stories.tsx`}),`: это одновременно визуальная документация, примеры и проверяемые сценарии.`]})}),`
`,(0,d.jsx)(n.h2,{id:`быстрый-старт`,children:`Быстрый старт`}),`
`,(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:`language-bash`,children:`npm run storybook
`})}),`
`,(0,d.jsxs)(n.p,{children:[`Открой адрес из терминала, обычно `,(0,d.jsx)(n.code,{children:`http://localhost:6006`}),`. В Canvas можно менять props через
Controls, а во вкладке Docs — читать описание API и копировать примеры.`]}),`
`,(0,d.jsx)(n.h2,{id:`где-что-лежит`,children:`Где что лежит`}),`
`,(0,d.jsxs)(n.p,{children:[`| Папка | Назначение |
| --- | --- |
| `,(0,d.jsx)(n.code,{children:`src/components`}),` | Переиспользуемые атомарные компоненты. |
| `,(0,d.jsx)(n.code,{children:`src/tokens`}),` | Цвета, отступы, радиусы и другие дизайн-токены. |
| `,(0,d.jsx)(n.code,{children:`src/templates`}),` | Готовые композиции и страницы из компонентов. |
| `,(0,d.jsx)(n.code,{children:`*.stories.tsx`}),` | Все поддерживаемые состояния и сценарии использования. |`]}),`
`,(0,d.jsx)(n.h2,{id:`правило-добавления-компонента`,children:`Правило добавления компонента`}),`
`,(0,d.jsxs)(n.p,{children:[`Создай папку `,(0,d.jsx)(n.code,{children:`src/components/ComponentName`}),` с четырьмя файлами:`]}),`
`,(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:`language-text`,children:`ComponentName.tsx
ComponentName.module.css
ComponentName.stories.tsx
index.ts
`})}),`
`,(0,d.jsx)(n.p,{children:`Перед тем как считать компонент готовым, покажи в story минимум default-состояние, крайние
состояния (disabled/loading/error), все variants и размеры. Если компоненты уже собираются в
реальный экран — создавай Template, а не добавляй продуктовую логику в примитив.`})]})}function u(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,d.jsx)(n,{...e,children:(0,d.jsx)(l,{...e})}):l(e)}var d;e((()=>{d=r(),c(),i()}))();export{u as default};