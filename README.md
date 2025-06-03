# Игра «Пятнашки»

## Описание
Проект представляет собой классическую головоломку «Пятнашки», реализованную на React (JSX) с разделением логики, компонентов и стилей по лучшим практикам. Пользователь может перемешать фишки, передвигать их по полю 4×4, отслеживать количество ходов и затраченное время, а при решении получать модальное окно с поздравлением.

### Основные возможности
- Генерация корректного (решаемого) начального поля.
- Отображение 15 пронумерованных фишек и одной пустой клетки.
- Логика перемещения фишек: только соседние по вертикали/горизонтали.
- Подсчет и отображение количества ходов и времени.
- Состояния игры: **started**, **paused**, **stopped**.
- Деактивация поля на паузе и после победы.
- Модальное окно при победе с количеством ходов и времени.
- Кнопка «Лидеры» (заглушка — можно подключить таблицу на сервере или `localStorage`).
- Переключатель языка (RU/EN) — при желании легко расширить локализацию.

---

## Структура проекта

```

fifteen-puzzle/
├── README.md
├── package.json
├── vite.config.js
└── src/
├── App.jsx
├── App.css
├── main.jsx
├── index.html
├── index.css
├── components/
│   ├── Board/
│   │   ├── Board.jsx
│   │   └── Board.css
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.css
│   ├── Controls/
│   │   ├── Controls.jsx
│   │   └── Controls.css
│   └── VictoryModal/
│       ├── VictoryModal.jsx
│       └── VictoryModal.css
├── context/
│   └── GameContext.jsx
├── hooks/
│   ├── useGameLogic.js
│   └── useTimer.js
├── utils/
│   ├── shuffleBoard.js
│   └── isSolved.js
└── styles/
├── variables.css
├── fonts.css
└── reset.css

````

- **`App.jsx`** — корневой компонент, управляет состоянием игры, передает пропсы в дочерние компоненты.
- **`App.css`** — глобальные стили и центрирование игрового окна.
- **`main.jsx`** — точка входа (рендеринг `<App />` в `root`).
- **`index.html`** — базовая HTML-разметка с `<div id="root"></div>`.
- **`index.css`** — сброс и глобальные классы (цвет фона, шрифты).
- **`components/Board`** — компонент игрового поля:
  - **`Board.jsx`** — отрисовка сетки 4×4, обработка кликов по фишкам.
  - **`Board.css`** — стили поля и самих плиток (важны скругления, тени, анимации при наведении).
- **`components/Header`** — шапка игры:
  - **`Header.jsx`** — отображает счетчик ходов, время, кнопки «Лидеры» и переключатель языка.
  - **`Header.css`** — стили для шапки, кнопок и статуса.
- **`components/Controls`** — панель управления:
  - **`Controls.jsx`** — кнопки «Старт/Пауза» и «Выход».
  - **`Controls.css`** — стили для кнопок (цвета, hover, скругления).
- **`components/VictoryModal`** — модальное окно при победе:
  - **`VictoryModal.jsx`** — отображает поздравление, ходов и время.
  - **`VictoryModal.css`** — фон затемнения, анимация появления, стили содержимого.
- **`context/GameContext.jsx`** — (при необходимости) контекст для управления настройками игры, передачей языка, таблицы лидеров.
- **`hooks/useGameLogic.js`** — (опционально) hook для логики генерации, перемещения и проверки победы (можно вынести сюда дублирующиеся функции).
- **`hooks/useTimer.js`** — (опционально) hook для управления таймером (запуск/пауза/сброс).
- **`utils/shuffleBoard.js`** — функция `shuffle(arr)`, обеспечивающая корректное перемешивание фишек.
- **`utils/isSolved.js`** — функция `checkVictory(tiles)`, проверяющая, решена ли головоломка.
- **`styles/variables.css`** — CSS-переменные (`:root { --primary: #abc; … }`).
- **`styles/fonts.css`** — подключение Google Fonts или локальных шрифтов (Roboto, Segoe UI и т.д.).
- **`styles/reset.css`** — сброс браузерных стилей (margin, padding, box-sizing и т.п.).

---

## Установка и запуск

1. **Клонировать репозиторий**:
   ```bash
   git clone https://github.com/your-username/fifteen-puzzle.git
   cd fifteen-puzzle
````

2. **Установить зависимости** (используется Vite + React):

   ```bash
   npm install
   ```

3. **Запустить локальный сервер** (Development Mode):

   ```bash
   npm run dev
   ```

   Перейдите в браузер по адресу `http://localhost:5173` (или другой, указанный в консоли) — игра будет доступна.

4. **Собрать проект для production**:

   ```bash
   npm run build
   ```

   Результат окажется в папке `dist/`.

5. **Запустить локальный сервер из собранных файлов** (опционально):

   ```bash
   npm run preview
   ```

   Открывается `http://localhost:4173` по умолчанию.

---

## Использование

* **Старт игры** — нажмите кнопку «Старт»: автоматически сгенерируется поле (решаемое), таймер и счетчик ходов запустятся.
* **Перемещение фишек** — кликните по фишке, если рядом есть свободная клетка. Каждый ход увеличивает счетчик.
* **Пауза/Продолжение** — нажмите «Пауза», чтобы остановить таймер и деактивировать поле; нажмите «Продолжить», чтобы продолжить.
* **Выход** — сбрасывает текущее игровое состояние и поле очищается.
* **Победа** — при сборке фишек в правильном порядке (1→15, 0 в конце) появится модальное окно с поздравлением, количеством ходов и временем.
* **Лидеры** — при клике на «Лидеры» (пока заглушка) может открыться таблица лучших результатов (можно доработать хранение в `localStorage` или на сервере).
* **Переключение языка** — меняет подписи («Ходы», «Время», «Старт», «Пауза» и т. д.) между русским и английским.

---

## Скрипты в `package.json`

```jsonc
{
  "scripts": {
    "dev": "vite",               // Запуск dev-сервера
    "build": "vite build",       // Сборка проекта в продакшн
    "preview": "vite preview"    // Превью итоговой сборки
  },
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^3.x",
    "vite": "^4.x"
  }
}
```

* `npm run dev` — откроет приложение в режиме разработки.
* `npm run build` — соберет минифицированный код в папку `dist/`.
* `npm run preview` — покажет собранную версию на локальном сервере.

---

## Детали реализации

1. **Генерация поля**

   * Используется функция `generateTiles()`, которая создаёт массив `[1, 2, … , 15, 0]` и перетасовывает его до тех пор, пока `isSolvable(arr) === true`.
   * Функция `isSolvable(arr)` считает инверсии и определяет позицию пустой ячейки; только поля с чётным количеством инверсий оказываются решаемыми.

2. **Логика перемещения**

   * При клике на фишку проверяется индекс пустой клетки `emptyIndex = tiles.indexOf(0)` и возможные ходы: `emptyIndex ± 1` или `emptyIndex ± 4`.
   * Дополнительно проверяется, что ход не переходит через границу строки (чтобы слева не перепрыгнуть на следующую строку).

3. **Проверка победы**

   * Каждый раз при перемещении (в `useEffect`) вызывается `checkVictory(tiles)`, которая возвращает `true`, если массив `tiles` равен `[1, 2, … , 15, 0]`.

4. **Таймер и ходы**

   * В `App.jsx` через `useEffect` стартует интервал `setInterval`, когда `gameState === 'started'`.
   * Счетчик ходов `moves` увеличивается при каждом успешном обмене фишек.

5. **Компоненты**

   * **Header**: принимает пропсы `moves`, `time`, `language`, `onShowLeaders`, `onToggleLanguage`.
   * **Board**: принимает `tiles`, `boardState`, `onTileClick` — отрисовывает сетку 4×4 и фишки.
   * **Controls**: принимает `gameState`, `onStart`, `onPause`, `onResume`, `onExit` — отрисовывает кнопки управления.
   * **VictoryModal**: принимает `moves`, `time` и показывается при `visible === true`.

---

## Структура директорий и примеры файлов

### `src/components/Board/Board.jsx`

```jsx
import React from 'react';
import './Board.css';

const Board = ({ tiles = [], onTileClick, boardState }) => {
  return (
    <div className={`board ${boardState === 'inactive' ? 'inactive' : ''}`}>
      {tiles.map((tile, index) => (
        <div
          key={index}
          className={`tile ${tile === 0 ? 'empty' : ''}`}
          onClick={() => boardState === 'active' && tile !== 0 && onTileClick(index)}
        >
          {tile !== 0 && tile}
        </div>
      ))}
    </div>
  );
};

export default Board;
```

### `src/components/Board/Board.css`

```css
.board {
  display: grid;
  grid-template-columns: repeat(4, 80px);
  grid-template-rows: repeat(4, 80px);
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
  pointer-events: auto;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.board.inactive {
  pointer-events: none;
  opacity: 0.5;
}

.tile {
  width: 80px;
  height: 80px;
  background-color: #4a90e2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: bold;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, background-color 0.3s ease;
}

.tile:hover {
  background-color: #357ab8;
  transform: scale(1.05);
}

.tile.empty {
  background-color: transparent;
  cursor: default;
  box-shadow: none;
}
```

*(Аналогично изложи содержимое для `Header`, `Controls`, `VictoryModal`, `GameContext`, `hooks` и `utils`.)*

---

## Советы по доработке

* **Таблица лидеров**
  Добавить хранение результатов в `localStorage` или на удалённом сервере. В `GameContext` можно хранить список лучших 15 результатов.

* **Локализация**
  Вынести строки (`Ходы`, `Время`, `Старт`, `Пауза`, `Выход` и т.д.) в отдельный файл `i18n.js` или `translations.js`. Использовать контекст `LanguageContext` для переключения языка.

* **Анимации**
  Можно подключить библиотеку `Framer Motion` и добавить плавную анимацию перемещения плиток (при смене позиций) или модального окна.

* **Адаптивность**
  Через медиазапросы (`@media`) подогнать размеры плиток и отступы, чтобы на мобильных устройствах поле выглядело корректно.

* **Тестирование**
  Написать unit-тесты с `Jest` и `React Testing Library` для проверки логики перемешивания, проверки победы и поведения кнопок.

---

## Лицензия

Этот проект распространяется под лицензией MIT. Свободно используйте, изменяйте и распространяйте данный код.

```text
MIT License

Copyright (c) 2025 Ваше Имя

Permission is hereby granted, free of charge, to any person obtaining a copy
...
```

---

Спасибо за использование! Если найдёшь баги или захочешь предложить улучшения — открывай issue или делай pull request.
