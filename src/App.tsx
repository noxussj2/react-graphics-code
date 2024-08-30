import './App.scss'
import { useState, useEffect } from 'react'
import iconArrow from './assets/icon-arrow.png'
import iconClose from './assets/icon-close.png'
import iconRefresh from './assets/icon-refresh.png'
import iconLogo from './assets/icon-logo.png'
import { IGetCaptcha } from './api'

function App() {
    const [shape, setShape] = useState('')
    const [background, setBackground] = useState('')
    const [sliderLeft, setSliderLeft] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const res = await IGetCaptcha()
            setBackground(res.background)
            setShape(res.shape)
        }

        fetchData()
    }, [])

    // Handle the mouse down event
    const onMouseDown = (e: any) => {
        e.preventDefault()
        const clientX = e.clientX

        const handleMouseMove = (e: MouseEvent) => {
            // Calculate the distance of the mouse moving
            const distance = e.clientX - clientX

            // Update the slider position
            if (distance >= 0 && distance <= 220) {
                setSliderLeft(distance)
            }
        }

        const handleMouseUp = (e: any) => {
            console.log(e.clientX - clientX)
            setSliderLeft(0)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
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
                    {background ? <img src={background} alt="" /> : ''}

                    {shape ? <img src={shape} alt="" className="image__shape" style={{ transform: `translateX(${sliderLeft}px)` }} /> : ''}
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
