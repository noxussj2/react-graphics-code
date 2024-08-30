import { writeFileSync } from 'fs'
import { resolve, join } from 'path'
import { createCanvas, loadImage } from 'canvas'

// 生成图像
const image = await loadImage("./demo1.png")

// 创建与原图像一样大小的 canvas
const canvas = createCanvas(image.width, image.height)
const context = canvas.getContext('2d')
context.drawImage(image, 0, 0, image.width, image.height)

// 定义抠图区域的位置和大小
const x = 100
const y = 100
const width = 50
const height = 50

// 创建一个新的 canvas 来存储抠出的图像
const puzzleCanvas = createCanvas(width, height)
const puzzleContext = puzzleCanvas.getContext('2d')
const imageData = context.getImageData(x, y, width, height)
puzzleContext.putImageData(imageData, 0, 0)

// 获取当前工作目录
const baseDir = process.cwd()
const shapePath = join(baseDir, 'app/public/shape.png')
const backgroundPath = join(baseDir, 'app/public/background.png')

// 将图像保存为 buffer
const shape = puzzleCanvas.toBuffer()
const background = canvas.toBuffer()

// 保存图像
writeFileSync(shapePath, shape)
writeFileSync(backgroundPath, background)
