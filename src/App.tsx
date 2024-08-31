import './App.scss'
import { useState, useEffect, useRef } from 'react'
import iconArrow from './assets/icon-arrow.png'
import iconClose from './assets/icon-close.png'
import iconRefresh from './assets/icon-refresh.png'
import iconLogo from './assets/icon-logo.png'
import { IGetCaptcha, IValidateCaptcha } from './api'

/**
 * 验证成功
 */
function SuccessTip({ second }: any) {
    return (
        <div className="success-tip">
            <span>验证成功！本次验证耗时{second.toFixed(1)}秒</span>
        </div>
    )
}

/**
 * 验证是哎
 */
function FailTip() {
    return (
        <div className="fail-tip">
            <span>验证失败！请重新验证</span>
        </div>
    )
}

/**
 * 请拖动滑块完成拼图
 */
function App() {
    const [shape, setShape] = useState('')
    const [background, setBackground] = useState('')
    const [sliderLeft, setSliderLeft] = useState(0)
    const [sliderTop, setSliderTop] = useState(0)
    const [second, setSecond] = useState(1)
    const [uuid, setUUID] = useState('')
    const [code, setCode] = useState(0)
    const sliderLeftRef = useRef(sliderLeft)

    useEffect(() => {
        const fetchData = async () => {
            const res = await IGetCaptcha()
            setBackground(res.background)
            setShape(res.shape)
            setSliderTop(res.y)
            setUUID(res.uuid)
        }

        fetchData()
    }, [])

    // 图形校验
    const validateCaptcha = async () => {
        const res = await IValidateCaptcha({ uuid, x: sliderLeftRef.current + 20 })
        setCode(res.code)

        if (res.code === 401) {
            setSliderLeft(0)
        }
    }

    // Handle the mouse down event
    const onMouseDown = (e: any) => {
        e.preventDefault()
        const clientX = e.clientX
        const start = performance.now()

        const handleMouseMove = (e: MouseEvent) => {
            // Calculate the distance of the mouse moving
            const distance = e.clientX - clientX

            // Update the slider position
            if (distance >= 0 && distance <= 220) {
                setSliderLeft(distance)
                sliderLeftRef.current = distance
            }
        }

        const handleMouseUp = (e: any) => {
            setSecond((performance.now() - start) / 1000)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
            validateCaptcha()
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
    }

    // Handle the mouse up event

    return (
        <>
            <div className="code-card">
                <h3>请拖动滑块完成拼图</h3>

                <div className="card__image">
                    {code === 200 ? <SuccessTip second={second} /> : ''}
                    {code === 401 ? <FailTip /> : ''}
                    {background ? <img src={background} alt="" /> : ''}
                    {shape ? <img src={shape} alt="" className="image__shape" style={{ top: `${sliderTop}px`, transform: `translateX(${sliderLeft}px)` }} /> : ''}
                </div>

                <div className="card__process">
                    <div className="process__bar"></div>

                    <div className="process__slider" style={{ transform: `translateX(${sliderLeft}px)` }} onMouseDown={onMouseDown}>
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
