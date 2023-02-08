import dynamic from 'next/dynamic'
import React, { useRef, useEffect } from 'react'

const CanvasComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  return <canvas ref={canvasRef} />
}

export default dynamic(() => Promise.resolve(CanvasComponent), { ssr: false })
