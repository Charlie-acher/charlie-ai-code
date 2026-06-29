<template>
  <div class="knowledge-network" aria-hidden="true">
    <canvas ref="canvasRef" class="network-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

type NetworkNode = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  pulse: number
  core: string
  line: string
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const palette = [
  { core: 'rgba(20, 184, 166, 0.92)', line: '20, 184, 166' },
  { core: 'rgba(59, 130, 246, 0.86)', line: '59, 130, 246' },
  { core: 'rgba(245, 158, 11, 0.82)', line: '245, 158, 11' },
  { core: 'rgba(16, 185, 129, 0.82)', line: '16, 185, 129' },
  { core: 'rgba(168, 85, 247, 0.72)', line: '168, 85, 247' },
]

let nodes: NetworkNode[] = []
let animationFrame = 0
let reduceMotion = false

const createNodes = (width: number, height: number) => {
  const count = Math.max(28, Math.min(58, Math.floor(width / 30)))

  nodes = Array.from({ length: count }, (_, index) => {
    const color = palette[index % palette.length]

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.34,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2.2 + 2,
      pulse: Math.random() * Math.PI * 2,
      core: color.core,
      line: color.line,
    }
  })
}

const resizeCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) {
    return null
  }

  const rect = canvas.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = Math.max(1, Math.floor(rect.width * dpr))
  canvas.height = Math.max(1, Math.floor(rect.height * dpr))

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return null
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  createNodes(rect.width, rect.height)

  return { ctx, width: rect.width, height: rect.height }
}

const drawResearchField = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) => {
  const centers = [
    { x: width * 0.22, y: height * 0.28, rx: width * 0.24, ry: height * 0.14 },
    { x: width * 0.72, y: height * 0.42, rx: width * 0.22, ry: height * 0.18 },
    { x: width * 0.54, y: height * 0.78, rx: width * 0.18, ry: height * 0.12 },
  ]

  ctx.save()
  ctx.setLineDash([3, 12])
  ctx.lineWidth = 1.2

  centers.forEach((center, index) => {
    const drift = reduceMotion ? 0 : Math.sin(time * 0.45 + index) * 8
    ctx.beginPath()
    ctx.ellipse(center.x + drift, center.y, center.rx, center.ry + drift * 0.5, 0, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(16, 24, 39, ${0.06 + index * 0.012})`
    ctx.stroke()
  })

  ctx.restore()
}

const draw = () => {
  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')

  if (!canvas || !ctx) {
    return
  }

  const { width, height } = canvas.getBoundingClientRect()
  const time = performance.now() / 1000
  ctx.clearRect(0, 0, width, height)

  drawResearchField(ctx, width, height, time)

  for (const node of nodes) {
    if (!reduceMotion) {
      node.x += node.vx
      node.y += node.vy
      node.pulse += 0.018
    }

    if (node.x < 0 || node.x > width) {
      node.vx *= -1
      node.x = Math.min(width, Math.max(0, node.x))
    }
    if (node.y < 0 || node.y > height) {
      node.vy *= -1
      node.y = Math.min(height, Math.max(0, node.y))
    }
  }

  const limit = Math.min(245, Math.max(160, width / 6.5))
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const source = nodes[i]
      const target = nodes[j]
      const distance = Math.hypot(source.x - target.x, source.y - target.y)

      if (distance < limit) {
        const alpha = 0.32 * (1 - distance / limit)
        const edge = ctx.createLinearGradient(source.x, source.y, target.x, target.y)
        edge.addColorStop(0, `rgba(${source.line}, ${alpha})`)
        edge.addColorStop(1, `rgba(${target.line}, ${alpha * 0.8})`)

        ctx.beginPath()
        ctx.moveTo(source.x, source.y)
        ctx.lineTo(target.x, target.y)
        ctx.strokeStyle = edge
        ctx.lineWidth = 1.35
        ctx.stroke()
      }
    }
  }

  for (const node of nodes) {
    const glow = Math.sin(node.pulse) * 1.1

    ctx.beginPath()
    ctx.arc(node.x, node.y, node.radius + glow + 6, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.34)'
    ctx.fill()

    ctx.beginPath()
    ctx.arc(node.x, node.y, node.radius + glow, 0, Math.PI * 2)
    ctx.fillStyle = node.core
    ctx.fill()
  }

  animationFrame = window.requestAnimationFrame(draw)
}

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  resizeCanvas()
  draw()
  window.addEventListener('resize', resizeCanvas)
})

onBeforeUnmount(() => {
  window.cancelAnimationFrame(animationFrame)
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
.knowledge-network {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background:
    radial-gradient(circle at 16% 18%, rgba(250, 204, 21, 0.2), transparent 26%),
    radial-gradient(circle at 31% 66%, rgba(45, 212, 191, 0.34), transparent 32%),
    radial-gradient(circle at 80% 30%, rgba(244, 114, 182, 0.14), transparent 30%),
    radial-gradient(circle at 82% 78%, rgba(96, 165, 250, 0.34), transparent 34%),
    linear-gradient(180deg, #fffaf0 0%, #e7fbf3 38%, #bee7f4 68%, #d8e7ff 100%);
}

.knowledge-network::after {
  position: absolute;
  inset: 0;
  z-index: 2;
  content: '';
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.42) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.34) 1px, transparent 1px),
    linear-gradient(135deg, rgba(16, 24, 39, 0.035) 1px, transparent 1px);
  background-size:
    56px 56px,
    56px 56px,
    92px 92px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.5), transparent 82%);
  pointer-events: none;
}

.network-canvas {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
}
</style>
