import './App.scss'
import background from './assets/background.png'
import iconArrow from './assets/icon-arrow.png'
import iconClose from './assets/icon-close.png'
import iconRefresh from './assets/icon-refresh.png'
import iconLogo from './assets/icon-logo.png'

function App() {
    return (
        <>
            <div className="code-card">
                <h3>请拖动滑块完成拼图</h3>

                <div className="card__image">
                    <img src={background} alt="" />
                </div>

                <div className="card__process">
                    <div className="process__bar"></div>

                    <div className="process__slider">
                        <img src={iconArrow} alt="" />
                    </div>
                </div>

                <footer>
                    <img src={iconClose} alt="" />

                    <img src={iconRefresh} alt="" style={{ marginLeft: '15px' }} />

                    <p />

                    <img src={iconLogo} alt="" style={{ width: '89px' }} />
                </footer>
            </div>
        </>
    )
}

export default App
