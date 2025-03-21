import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MenuLayout from './modules/MenuLayout';
import ToggleStatePage from './modules/ToggleStatePage';
import { ExamplePage2 } from './modules/ExamplePage2';

const App = () => {
  return (
    <Routes>
      <Route element={<MenuLayout />}>
        <Route path="/" element={<ToggleStatePage />} />{' '}
        <Route path="/page2" element={<ExamplePage2 />} />
        <Route path="*" element={<>404 Not Found</>} />
      </Route>
    </Routes>
  );
};

export default App;
// The best way to save the toggle state to the database in React, is using a library like react-query
// It features:
// 1. Automatic caching: reduces redundant network requests.
// 2. Built-in error handling and retries: handles errors and can retry failed requests automatically.
// 3. Simplified asynchronous logic: manages loading, error, and success states seamlessly,

// IMPORTANT NOTE: This is to solve the question 4 from the coding challenge.
// Since we want to save the toggle state of each individual card, we need to do it whenever a toggle is clicked.
// But we cannot create a loading animation or do nothing, because it's a bad user experience and users
// expect immediate interactions, so in this case we apply an optimistic update.
// An optimistic update creates an action and if the action is succesful it does nothing (keep togle)
// but if it fails it rollsback to the previous state
