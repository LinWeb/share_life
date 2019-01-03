import dva from 'dva';
import './index.css';
import 'antd-mobile/dist/antd-mobile.css';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva({
    initialState: {
    }
});

// 2. Plugins
// app.use();
// app.use(createLoading({ namespace: 'Loading' }));

// 3. Model
app.model(require('./models/user').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
