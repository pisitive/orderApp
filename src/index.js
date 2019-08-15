import dva from 'dva'
//import createHistory from 'history/createBrowserHistory';
import {createBrowserHistory as createHistory } from 'history'
import './index.css'

// 1. Initialize
// const app = dva();
const app = dva({
    history: createHistory(),
})

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');


//本地json要放在public里才能获取到