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
