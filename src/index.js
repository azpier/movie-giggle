import ReactDOM from 'react-dom';
import './index.css';
import { makeMainRoutes } from './routes';
import 'semantic-ui-css/semantic.min.css';

const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);
