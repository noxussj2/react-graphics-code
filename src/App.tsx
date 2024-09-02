import './App.scss'
import { useState, useEffect, useRef } from 'react'
import iconArrow from './assets/icon-arrow.png'
import iconClose from './assets/icon-close.png'
import iconRefresh from './assets/icon-refresh.png'
import iconLogo from './assets/icon-logo.png'
import logo from './assets/logo.png'
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
function Puzzle({ onClose, showModel, modelClass }: any) {
    const [shape, setShape] = useState('')
    const [background, setBackground] = useState('')
    const [sliderLeft, setSliderLeft] = useState(0)
    const [sliderTop, setSliderTop] = useState(0)
    const [second, setSecond] = useState(1)
    const [uuid, setUUID] = useState('')
    const [code, setCode] = useState(0)
    const sliderLeftRef = useRef(sliderLeft)
    const [animationKey, setAnimationKey] = useState(10000)
    const [animationKey2, setAnimationKey2] = useState(20000)
    const [animationKey3, setAnimationKey3] = useState(30000)
    const [outClassName, setOutClassName] = useState('')

    const fetchData = async () => {
        const res = await IGetCaptcha()
        setBackground(res.background)
        setShape(res.shape)
        setSliderTop(res.y)
        setUUID(res.uuid)
    }

    useEffect(() => {
        fetchData()
    }, [])

    // 刷新验证码
    const onRefresh = () => {
        setOutClassName('animate__fadeOutLeft')

        setTimeout(() => {
            setOutClassName('')
            setAnimationKey(animationKey + 1)
            setAnimationKey2(animationKey2 + 1)
            setAnimationKey3(animationKey3 + 1)
            fetchData()
        }, 800)
    }

    // 图形校验
    const validateCaptcha = async () => {
        const res = await IValidateCaptcha({ uuid, x: sliderLeftRef.current + 20 })
        setCode(res.code)

        if (res.code === 401) {
            setSliderLeft(0)
        }

        if (res.code === 200) {
            setTimeout(() => {
                onClose()
            }, 2000)
        }
    }

    // Handle the mouse down event
    const onMouseDown = (e: any) => {
        e.preventDefault()
        const clientX = e.clientX
        const start = new Date().getTime()
        console.log(start)

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
            console.log(new Date().getTime())
            setSecond((new Date().getTime() - start) / 1000)
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
            <div className={`code-card ${modelClass}`} onClick={(e) => e.stopPropagation()}>
                {showModel && (
                    <h3 className={`animate__animated animate__fadeIn ${outClassName}`} key={animationKey}>
                        请拖动滑块完成拼图
                    </h3>
                )}

                {showModel && (
                    <div className={`card__image animate__slideInZoom ${outClassName}`} key={animationKey2}>
                        {code === 200 ? <SuccessTip second={second} /> : ''}
                        {code === 401 ? <FailTip /> : ''}
                        {background ? <img src={background} alt="" /> : ''}
                        {shape ? <img src={shape} alt="" className="image__shape" style={{ top: `${sliderTop}px`, transform: `translateX(${sliderLeft}px)` }} /> : ''}
                    </div>
                )}

                {showModel && (
                    <div className={`card__process animate__slideInZoom ${outClassName}`} key={animationKey3}>
                        <div className="process__bar"></div>

                        <div className="process__slider" style={{ transform: `translateX(${sliderLeft}px)` }} onMouseDown={onMouseDown}>
                            <img src={iconArrow} alt="" />
                        </div>
                    </div>
                )}

                {showModel && (
                    <footer>
                        <img src={iconClose} alt="" onClick={() => onClose()} />

                        <img src={iconRefresh} alt="" style={{ marginLeft: '15px' }} onClick={() => onRefresh()} />

                        <p />

                        <img src={iconLogo} alt="" style={{ width: '89px' }} />
                    </footer>
                )}
            </div>
        </>
    )
}

/**
 * 点击按钮开始验证
 */
function ValidateButton() {
    const [show, setShow] = useState(false)
    const [showModel, setShowModel] = useState(false)
    const [modelClass, setModelClass] = useState('')

    const openModal = () => {
        setShow(true)
        setModelClass('puzzleIn')

        setTimeout(() => {
            setShowModel(true)
        }, 300)
    }

    const closeModal = () => {
        setShowModel(false)
        setModelClass('puzzleOut')

        setTimeout(() => {
            setShow(false)
        }, 300)
    }

    return (
        <>
            <div className="validate-button--wrap">
                <div className="validate-button" onClick={openModal}>
                    <figure />

                    <span>点击按钮开始验证</span>

                    <img src={logo} alt="" />
                </div>

                {show && (
                    <>
                        <div className="puzzle-popup" onClick={closeModal} />
                        <Puzzle onClose={closeModal} showModel={showModel} modelClass={modelClass} />
                    </>
                )}
            </div>
        </>
    )
}

export default ValidateButton
