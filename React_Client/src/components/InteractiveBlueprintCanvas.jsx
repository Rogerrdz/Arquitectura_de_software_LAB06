import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlueprint } from '../features/blueprints/blueprintsSlice.js'

export default function InteractiveBlueprintCanvas({
  blueprint,
  width = 520,
  height = 360,
  editable = false,
}) {
  const ref = useRef(null)
  const [points, setPoints] = useState(blueprint?.points || [])
  const [hasChanges, setHasChanges] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (blueprint?.points) {
      setPoints(blueprint.points)
      setHasChanges(false)
    }
  }, [blueprint])

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    
    // Clear and draw background
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#0b1220'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Draw grid
    ctx.strokeStyle = 'rgba(148,163,184,0.15)'
    ctx.lineWidth = 1
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }
    
    // Draw lines
    if (points.length > 1) {
      ctx.strokeStyle = '#93c5fd'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      for (let i = 1; i < points.length; i++) {
        const p = points[i]
        ctx.lineTo(p.x, p.y)
      }
      ctx.stroke()
    }
    
    // Draw points
    ctx.fillStyle = '#fbbf24'
    for (const p of points) {
      ctx.beginPath()
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [points])

  const handleCanvasClick = (e) => {
    if (!editable || !blueprint) return
    
    const canvas = ref.current
    const rect = canvas.getBoundingClientRect()
    const x = Math.round(e.clientX - rect.left)
    const y = Math.round(e.clientY - rect.top)
    
    setPoints((prev) => [...prev, { x, y }])
    setHasChanges(true)
  }

  const handleSave = () => {
    if (!blueprint || !hasChanges) return
    
    dispatch(
      updateBlueprint({
        author: blueprint.author,
        name: blueprint.name,
        points,
      }),
    )
    setHasChanges(false)
  }

  const handleReset = () => {
    setPoints(blueprint?.points || [])
    setHasChanges(false)
  }

  return (
    <div>
      <canvas
        ref={ref}
        width={width}
        height={height}
        onClick={handleCanvasClick}
        style={{
          background: '#0b1220',
          border: editable ? '2px solid #3b82f6' : '1px solid #334155',
          borderRadius: 12,
          width: '100%',
          maxWidth: width,
          cursor: editable ? 'crosshair' : 'default',
        }}
      />
      {editable && blueprint && (
        <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
          <button
            className="btn primary"
            onClick={handleSave}
            disabled={!hasChanges}
            style={{ opacity: hasChanges ? 1 : 0.5 }}
          >
            💾 Guardar ({points.length} puntos)
          </button>
          <button className="btn" onClick={handleReset} disabled={!hasChanges}>
            ↺ Reset
          </button>
        </div>
      )}
    </div>
  )
}
