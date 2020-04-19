import { render } from 'preact';
import { app } from './app.jsx';
import './style.css';

const link = document.createElement('link');
link.type = 'image/x-icon';
link.rel = 'shortcut icon';
link.href = '/assets/icon.svg';
document.head.appendChild(link);
const meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'width=device-width, initial-scale=1';
document.head.appendChild(meta);

render(app, document.body);
