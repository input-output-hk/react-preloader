import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './Preloader.css'

class Preloader extends Component {
  constructor (props) {
    super(props)

    this.containerRef = React.createRef()
    this.canvas1Ref = React.createRef()
    this.canvas2Ref = React.createRef()
    this.canvas3Ref = React.createRef()
    this.canvas4Ref = React.createRef()
    this.canvas5Ref = React.createRef()

    this.now = Date.now()
    this.dt = 0
    this.prevNow = Date.now()
    this.dtMod = 0
    this.twoPI = 6.283185307179586

    this.mouse = {
      originX: 0,
      originY: 0,
      x: 0,
      y: 0,
      updatePosition: function (e) {
        this.x = e.clientX - this.originX
        this.y = (e.clientY - this.originY) * -1
      },
      setOrigin: function (e) {
        this.originX = e.offsetLeft + Math.floor(e.offsetWidth / 2)
        this.originY = e.offsetTop + Math.floor(e.offsetHeight / 2)
      }
    }
  }

  updateTransformStyle (x, y) {
    this.inner1.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg)'
    this.inner2.style.transform = 'rotateX(' + x * 1.3 + 'deg) rotateY(' + y * 1.3 + 'deg)'
    this.inner3.style.transform = 'rotateX(' + x * 0.7 + 'deg) rotateY(' + y * 0.7 + 'deg)'
    this.inner4.style.transform = 'rotateX(' + x * 1.3 + 'deg) rotateY(' + y * 1.3 + 'deg)'
    this.inner5.style.transform = 'rotateX(' + x * 0.8 + 'deg) rotateY(' + y * 0.8 + 'deg)'
  }

  updateMouse (event) {
    this.mouse.updatePosition(event)
    this.updateTransformStyle(
      (this.mouse.y / this.inner1.offsetHeight / 2).toFixed(2) * 10.0,
      (this.mouse.x / this.inner1.offsetWidth / 2).toFixed(2) * 10.0
    )
  }

  onMouseMove (event) {
    event.preventDefault()
    this.updateMouse(event)
  }

  onTouchMove (event) {
    event.preventDefault()
    if (typeof event.touches[0] !== 'undefined') {
      this.updateMouse(event.touches[0])
    }
  }

  componentDidMount () {
    this.containerEl = this.containerRef.current

    this.inner1 = this.canvas1Ref.current
    this.inner2 = this.canvas2Ref.current
    this.inner3 = this.canvas3Ref.current
    this.inner4 = this.canvas4Ref.current
    this.inner5 = this.canvas5Ref.current

    this.context1 = this.inner1.getContext('2d')
    this.context2 = this.inner2.getContext('2d')
    this.context3 = this.inner3.getContext('2d')
    this.context4 = this.inner4.getContext('2d')
    this.context5 = this.inner5.getContext('2d')

    this.mouse.setOrigin(this.containerEl)

    window.addEventListener('resize', function () {
      this.mouse.setOrigin(this.containerEl)
    }.bind(this))

    this.drawLogo()
  }

  getDeltaTime () {
    this.now = Date.now()
    this.dt = (this.now - this.prevNow) / 300
    this.dtMod = ((Math.sin(this.dt * 0.3) + 1) * 0.5) + 1
    return this.dt
  }

  getCubicBezierXYatPercent (startPt, controlPt1, controlPt2, endPt, percent) {
    var x = this.CubicN(percent, startPt.x, controlPt1.x, controlPt2.x, endPt.x)
    var y = this.CubicN(percent, startPt.y, controlPt1.y, controlPt2.y, endPt.y)
    return ({
      x: x,
      y: y
    })
  }

  CubicN (pct, a, b, c, d) {
    var t2 = pct * pct
    var t3 = t2 * pct
    return a + (-a * 3 + pct * (3 * a - a * pct)) * pct + (3 * b + pct * (-6 * b + b * 3 * pct)) * pct + (c * 3 - c * 3 * pct) * t2 + d * t3
  }

  getLineXYatPercent (startPt, endPt, percent) {
    var dx = endPt.x - startPt.x
    var dy = endPt.y - startPt.y
    var X = startPt.x + dx * percent
    var Y = startPt.y + dy * percent
    return ({
      x: X,
      y: Y
    })
  }

  initLogo (ctx) {
    ctx.clearRect(0, 0, 300, 300)
    ctx.save()
  }

  drawBezier (ctx, color, coords, right = false) {
    // bezier curve
    ctx.strokeStyle = 'rgb(' + color.r + ',' + color.g + ', ' + color.b + ')'
    ctx.lineWidth = 3
    ctx.miterLimit = '10'
    ctx.shadowBlur = 3 * this.dtMod
    ctx.shadowColor = 'rgb(' + color.r + ',' + color.g + ', ' + color.b + ')'
    ctx.beginPath()
    ctx.moveTo(coords[0].x, coords[0].y)
    ctx.bezierCurveTo(coords[1].x, coords[1].y, coords[2].x, coords[2].y, coords[3].x, coords[3].y)
    ctx.stroke()
    ctx.restore()
    ctx.save()

    // animate circles along curve
    let pathPos
    for (let index = 0; index < 3; index++) {
      ctx.shadowBlur = 3 * this.dtMod
      ctx.shadowColor = 'rgb(' + color.r + ',' + color.g + ', ' + color.b + ')'
      ctx.strokeStyle = 'rgb(' + color.r + ',' + color.g + ', ' + color.b + ')'
      ctx.lineWidth = 2
      ctx.miterLimit = '10'
      ctx.beginPath()
      if (right) {
        pathPos = this.getCubicBezierXYatPercent(coords[0], coords[1], coords[2], coords[3], 1 - (((this.dt + index) * 0.3) % 1))
        ctx.arc(pathPos.x, pathPos.y, (((((this.dt + index) * 0.3) % 1) * 5)), 0, this.twoPI, false)
      } else {
        pathPos = this.getCubicBezierXYatPercent(coords[0], coords[1], coords[2], coords[3], ((this.dt + index) * 0.3) % 1)
        ctx.arc(pathPos.x, pathPos.y, (5 - ((((this.dt + index) * 0.3) % 1) * 5)), 0, this.twoPI, false)
      }
      ctx.closePath()
      ctx.stroke()
      ctx.restore()
      ctx.save()
    }
  }

  drawLine (ctx, color, coords, offset, right = false) {
    ctx.strokeStyle = 'rgb(' + color.r + ',' + color.g + ', ' + color.b + ')'
    ctx.shadowColor = 'rgb(' + color.r + ',' + color.g + ', ' + color.b + ')'
    ctx.lineWidth = 3
    ctx.miterLimit = '10'
    ctx.translate(offset.x, offset.y)
    ctx.beginPath()
    ctx.moveTo(coords[0].x, coords[0].y)
    ctx.lineTo(coords[1].x, coords[1].y)
    ctx.stroke()
    ctx.restore()
    ctx.save()

    let pathPos
    for (let index = 0; index < 1; index++) {
      ctx.strokeStyle = 'rgb(' + color.r + ',' + color.g + ', ' + color.b + ')'
      ctx.shadowColor = 'rgb(' + color.r + ',' + color.g + ', ' + color.b + ')'
      ctx.lineWidth = 2
      ctx.miterLimit = '10'
      ctx.translate(offset.x, offset.y)
      ctx.beginPath()
      if (right) {
        pathPos = this.getLineXYatPercent(coords[0], coords[1], 1 - (((this.dt + index) * 0.3) % 1))
        ctx.arc(pathPos.x, pathPos.y, (((((this.dt + index) * 0.3) % 1) * 5)), 0, this.twoPI, false)
      } else {
        pathPos = this.getLineXYatPercent(coords[0], coords[1], ((this.dt + index) * 0.3) % 1)
        ctx.arc(pathPos.x, pathPos.y, (5 - ((((this.dt + index) * 0.3) % 1) * 5)), 0, this.twoPI, false)
      }
      ctx.closePath()
      ctx.stroke()
      ctx.restore()
      ctx.save()
    }
  }

  drawCircle (ctx, color, coords, fadeOffset = 0) {
    ctx.shadowBlur = 3 * this.dtMod
    ctx.shadowColor = 'rgb(' + color.r + ',' + color.g + ', ' + color.b + ')'
    ctx.strokeStyle = 'rgb(' + color.r + ',' + color.g + ', ' + color.b + ')'
    ctx.lineWidth = 3
    ctx.miterLimit = '10'
    ctx.fillStyle = 'rgba(' + color.r + ',' + color.g + ', ' + color.b + ', ' + ((this.dt + fadeOffset) * 0.3) % 1 + ')'
    ctx.beginPath()
    ctx.arc(coords.x, coords.y, 7.08, 0, this.twoPI, false)
    ctx.fill()
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
    ctx.save()
  }

  logo1 () {
    const ctx = this.context1
    this.initLogo(ctx)

    this.drawBezier(ctx, { r: 237, g: 28, b: 36 },
      [
        { x: 27.87, y: 18.78 },
        { x: 96, y: 17.45 },
        { x: 140.14, y: 65.87 },
        { x: 139.6, y: 103.92 }
      ]
    )

    this.drawBezier(ctx, { r: 237, g: 28, b: 36 },
      [
        { x: 27.87, y: 188.37 },
        { x: 96, y: 189.7 },
        { x: 140.14, y: 141.28 },
        { x: 139.6, y: 103.23 }
      ]
    )

    this.drawCircle(ctx, { r: 237, g: 28, b: 36 }, { x: 20.4, y: 18.75 })
    this.drawCircle(ctx, { r: 237, g: 28, b: 36 }, { x: 20.4, y: 188.75 })

    this.drawBezier(ctx, { r: 255, g: 255, b: 255 },
      [
        { x: 259, y: 18.78 },
        { x: 190.91, y: 17.45 },
        { x: 146.74, y: 65.87 },
        { x: 147.27, y: 103.92 }
      ],
      true
    )

    this.drawBezier(ctx, { r: 255, g: 255, b: 255 },
      [
        { x: 259, y: 188.37 },
        { x: 190.91, y: 189.70000000000002 },
        { x: 146.74, y: 141.28 },
        { x: 147.27, y: 103.23 }
      ],
      true
    )

    this.drawCircle(ctx, { r: 255, g: 255, b: 255 }, { x: 265.4, y: 18.75 }, 1)
    this.drawCircle(ctx, { r: 255, g: 255, b: 255 }, { x: 265.4, y: 188.75 }, 1)
  }

  logo2 () {
    const ctx = this.context2

    this.initLogo(ctx)

    this.drawBezier(ctx, { r: 237, g: 28, b: 36 },
      [
        { x: 42.36, y: 41.91 },
        { x: 84.46000000000001, y: 41.08 },
        { x: 125.28, y: 66.69 },
        { x: 139.23000000000002, y: 102.16 }
      ]
    )

    this.drawBezier(ctx, { r: 237, g: 28, b: 36 },
      [
        { x: 42.36, y: 165.24 },
        { x: 84.46000000000001, y: 166.07000000000002 },
        { x: 125.28, y: 140.46 },
        { x: 139.23000000000002, y: 104.99000000000001 }
      ]
    )

    this.drawCircle(ctx, { r: 237, g: 28, b: 36 }, { x: 34.4, y: 42.75 })
    this.drawCircle(ctx, { r: 237, g: 28, b: 36 }, { x: 34.4, y: 164.75 })

    this.drawBezier(ctx, { r: 255, g: 255, b: 255 },
      [
        { x: 244.48, y: 41.91 },
        { x: 202.37, y: 41.08 },
        { x: 161.54999999999998, y: 66.69 },
        { x: 147.6, y: 102.16 }
      ],
      true
    )

    this.drawBezier(ctx, { r: 255, g: 255, b: 255 },
      [
        { x: 244.48, y: 165.24 },
        { x: 202.37, y: 166.07000000000002 },
        { x: 161.54999999999998, y: 140.46 },
        { x: 147.6, y: 104.99000000000001 }
      ],
      true
    )

    this.drawCircle(ctx, { r: 255, g: 255, b: 255 }, { x: 251.4, y: 42.75 }, 1)
    this.drawCircle(ctx, { r: 255, g: 255, b: 255 }, { x: 251.4, y: 164.75 }, 1)
  }

  logo3 () {
    const ctx = this.context3

    this.initLogo(ctx)

    this.drawBezier(ctx, { r: 237, g: 28, b: 36 },
      [
        { x: 57.36, y: 64.93 },
        { x: 67.6, y: 64.93 },
        { x: 114, y: 71 },
        { x: 139.6, y: 104.74 }
      ]
    )
    this.drawBezier(ctx, { r: 237, g: 28, b: 36 },
      [
        { x: 57.36, y: 142.9 },
        { x: 67.6, y: 142.9 },
        { x: 114, y: 136.76 },
        { x: 139.6, y: 103.1 }
      ]
    )

    this.drawCircle(ctx, { r: 237, g: 28, b: 36 }, { x: 50.4, y: 64.75 })
    this.drawCircle(ctx, { r: 237, g: 28, b: 36 }, { x: 50.4, y: 141.75 })

    this.drawBezier(ctx, { r: 255, g: 255, b: 255 },
      [
        { x: 229.47, y: 64.59 },
        { x: 219.23, y: 64.59 },
        { x: 172.84, y: 70.73 },
        { x: 147.23, y: 104.39 }
      ],
      true
    )

    this.drawBezier(ctx, { r: 255, g: 255, b: 255 },
      [
        { x: 229.47, y: 142.56 },
        { x: 219.23, y: 142.56 },
        { x: 172.84, y: 136.41 },
        { x: 147.23, y: 102.76 }
      ],
      true
    )

    this.drawCircle(ctx, { r: 255, g: 255, b: 255 }, { x: 235.4, y: 64.75 }, 1)
    this.drawCircle(ctx, { r: 255, g: 255, b: 255 }, { x: 235.4, y: 141.75 }, 1)
  }

  logo4 () {
    const ctx = this.context4

    this.initLogo(ctx)

    this.drawBezier(ctx, { r: 237, g: 28, b: 36 },
      [
        { x: 71.92, y: 86.83 },
        { x: 86.77, y: 88.05 },
        { x: 115.38, y: 93.56 },
        { x: 139.92, y: 104.39 }
      ]
    )

    this.drawBezier(ctx, { r: 237, g: 28, b: 36 },
      [
        { x: 71.92, y: 120.32 },
        { x: 86.77, y: 119.1 },
        { x: 115.38, y: 113.59 },
        { x: 139.92, y: 102.76 }
      ]
    )

    this.drawCircle(ctx, { r: 237, g: 28, b: 36 }, { x: 64.4, y: 85.75 })
    this.drawCircle(ctx, { r: 237, g: 28, b: 36 }, { x: 64.4, y: 119.75 })

    this.drawBezier(ctx, { r: 255, g: 255, b: 255 },
      [
        { x: 214.92, y: 86.83 },
        { x: 200.06, y: 88.05 },
        { x: 171.45, y: 93.56 },
        { x: 146.92, y: 104.39 }
      ],
      true
    )

    this.drawBezier(ctx, { r: 255, g: 255, b: 255 },
      [
        { x: 214.92, y: 120.32 },
        { x: 200.06, y: 119.1 },
        { x: 171.45, y: 113.59 },
        { x: 146.92, y: 102.76 }
      ],
      true
    )

    this.drawCircle(ctx, { r: 255, g: 255, b: 255 }, { x: 221.4, y: 85.75 }, 1)
    this.drawCircle(ctx, { r: 255, g: 255, b: 255 }, { x: 221.4, y: 119.75 }, 1)
  }

  logo5 () {
    const ctx = this.context5

    this.initLogo(ctx)

    this.drawLine(ctx, { r: 237, g: 28, b: 36 },
      [
        { x: 16.44, y: 9.06 },
        { x: 62.25, y: 9.4 }
      ],
      { x: 73.82, y: 94.17 }
    )

    this.drawCircle(ctx, { r: 237, g: 28, b: 36 }, { x: 82.4, y: 102.75 })

    this.drawLine(ctx, { r: 255, g: 255, b: 255 },
      [
        { x: 118.75, y: 9.06 },
        { x: 72.94, y: 9.4 }
      ],
      { x: 73.82, y: 94.17 },
      true
    )

    this.drawCircle(ctx, { r: 255, g: 255, b: 255 }, { x: 199.4, y: 102.75 }, 1)
  }

  drawLogo () {
    this.getDeltaTime()
    this.logo1()
    this.logo2()
    this.logo3()
    this.logo4()
    this.logo5()

    window.requestAnimationFrame(function () {
      this.drawLogo()
    }.bind(this))
  }

  render () {

    let parentClassName = styles.parent
    parentClassName += typeof this.props.className !== 'undefined' ? ' ' + this.props.className : ''

    return (
      <div className={parentClassName}>
        <div className={styles.container} ref={this.containerRef} onMouseMove={this.onMouseMove.bind(this)} onTouchMove={this.onTouchMove.bind(this)}>
          <canvas ref={this.canvas1Ref} className={styles.inner} width='300' height='210' />
          <canvas ref={this.canvas2Ref} className={styles.inner} width='300' height='210' />
          <canvas ref={this.canvas3Ref} className={styles.inner} width='300' height='210' />
          <canvas ref={this.canvas4Ref} className={styles.inner} width='300' height='210' />
          <canvas ref={this.canvas5Ref} className={styles.inner} width='300' height='210' />
        </div>
      </div>
    )
  }
}

Preloader.propTypes = {
	className: PropTypes.string
}

export default Preloader
