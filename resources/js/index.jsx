import '../css/app.css';
import React from 'react';
import App from './App';

import { createRoot } from 'react-dom/client';

if (document.getElementById('app')) {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
}
