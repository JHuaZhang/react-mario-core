import ReactDOM from 'react-dom/client';
import App from './App';
import { registerDefaultComponents } from '../index';

// 在应用启动时注册默认组件
registerDefaultComponents();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);
