import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// React Toastify
import 'react-toastify/dist/ReactToastify.css';
import {WithRedux} from "./layouts/HOCs/WithRedux.tsx";
import WithToastContainer from "./layouts/HOCs/WithToastContainer.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <WithToastContainer>
            <WithRedux>
                <App/>
            </WithRedux>
        </WithToastContainer>
    </StrictMode>,
)
