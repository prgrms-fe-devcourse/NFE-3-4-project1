/* eslint-disable import/extensions */
/* eslint-disable no-new */
import Sidebar from './components/Sidebar.js';

export default function App({ $app }) {
  new Sidebar({
    $target: $app,
    onClick: () => {
      console.log('hello');
    },
  });
}
