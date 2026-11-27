import { animate, createAnimatable, createSpring, createTimeline } from 'animejs'
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import * as THREE from 'three'
import type { GearItem } from '@/store/useBookingStore'
import { useThemeStore } from '@/store/useThemeStore'

interface CampingGear3DCanvasProps {
  kit: GearItem
  priorityHero?: boolean
}

interface Palette3D {
  canvasBg: number
  platform: number
  gridLine: number
  shellPrimary: number
  shellSecondary: number
  accent: number
  inkEdge: number
  lanternGlow: number
}

function getPaletteForTheme(theme: 'light' | 'dark'): Palette3D {
  if (theme === 'dark') {
    return {
      canvasBg: 0x211e18,
      platform: 0x28241c,
      gridLine: 0x6b6350,
      shellPrimary: 0xede4cf,
      shellSecondary: 0x3a3429,
      accent: 0xff4d94,
      inkEdge: 0x0e0d0a,
      lanternGlow: 0x00ffcc,
    }
  }
  return {
    canvasBg: 0xede4cf,
    platform: 0xe8e0c0,
    gridLine: 0x7a7058,
    shellPrimary: 0x2a2620,
    shellSecondary: 0xd8ceb0,
    accent: 0xff006e,
    inkEdge: 0x141210,
    lanternGlow: 0x00b894,
  }
}

function addCrispEdges(mesh: THREE.Mesh, color: number): void {
  const edges = new THREE.EdgesGeometry(mesh.geometry, 24)
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.45 }),
  )
  mesh.add(line)
}

function buildKitModel(kitId: string, palette: Palette3D): THREE.Group {
  const group = new THREE.Group()

  const primaryMat = new THREE.MeshStandardMaterial({
    color: palette.shellPrimary,
    roughness: 0.65,
    metalness: 0.08,
  })
  const secondaryMat = new THREE.MeshStandardMaterial({
    color: palette.shellSecondary,
    roughness: 0.72,
    metalness: 0.05,
  })
  const accentMat = new THREE.MeshStandardMaterial({
    color: palette.accent,
    roughness: 0.48,
    metalness: 0.12,
  })
  const lanternMat = new THREE.MeshStandardMaterial({
    color: palette.lanternGlow,
    emissive: palette.lanternGlow,
    emissiveIntensity: 0.65,
    roughness: 0.35,
  })

  // Base topographic plinth
  const basePlate = new THREE.Mesh(new THREE.CylinderGeometry(1.95, 2.05, 0.14, 32), secondaryMat)
  basePlate.position.y = -0.07
  basePlate.receiveShadow = true
  addCrispEdges(basePlate, palette.inkEdge)
  group.add(basePlate)

  if (kitId === 'weekend-light-kit') {
    // Low-profile geodesic dome tent
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(1.12, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.52),
      primaryMat,
    )
    dome.scale.set(1.15, 0.88, 0.95)
    addCrispEdges(dome, palette.inkEdge)
    group.add(dome)

    // Crossed arch ridge poles
    const arch1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.06, 0.032, 8, 32, Math.PI),
      accentMat,
    )
    arch1.rotation.y = Math.PI * 0.25
    arch1.scale.set(1.12, 0.92, 1)
    group.add(arch1)

    const arch2 = arch1.clone()
    arch2.rotation.y = -Math.PI * 0.25
    group.add(arch2)

    // Compact camp stove + fuel canister
    const canister = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.26, 16), accentMat)
    canister.position.set(1.35, 0.13, 0.55)
    addCrispEdges(canister, palette.inkEdge)
    group.add(canister)

    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.18, 0.22, 16), secondaryMat)
    pot.position.set(1.35, 0.38, 0.55)
    addCrispEdges(pot, palette.inkEdge)
    group.add(pot)
  } else if (kitId === 'alpine-basecamp-bundle') {
    // 4-season pitched A-frame tent with front vestibule
    const tentBody = new THREE.Mesh(new THREE.ConeGeometry(1.28, 1.45, 4), primaryMat)
    tentBody.position.set(-0.15, 0.72, 0)
    tentBody.rotation.y = Math.PI * 0.25
    tentBody.scale.set(1.1, 1, 1.35)
    addCrispEdges(tentBody, palette.inkEdge)
    group.add(tentBody)

    const vestibule = new THREE.Mesh(new THREE.ConeGeometry(0.68, 0.95, 3), accentMat)
    vestibule.position.set(0.82, 0.47, 0.22)
    vestibule.rotation.y = Math.PI * 0.5
    addCrispEdges(vestibule, palette.inkEdge)
    group.add(vestibule)

    // Dual insulated sleeping pad rolls
    const pad1 = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.72, 16), secondaryMat)
    pad1.rotation.z = Math.PI * 0.5
    pad1.position.set(-0.95, 0.15, 1.05)
    addCrispEdges(pad1, palette.inkEdge)
    group.add(pad1)

    const pad2 = pad1.clone()
    pad2.position.set(-0.95, 0.15, 0.72)
    group.add(pad2)
  } else if (kitId === 'stargazer-comfort-set') {
    // Canvas bell tent
    const wall = new THREE.Mesh(new THREE.CylinderGeometry(1.22, 1.26, 0.45, 16), secondaryMat)
    wall.position.y = 0.225
    addCrispEdges(wall, palette.inkEdge)
    group.add(wall)

    const roof = new THREE.Mesh(new THREE.ConeGeometry(1.28, 1.25, 16), primaryMat)
    roof.position.y = 1.06
    addCrispEdges(roof, palette.inkEdge)
    group.add(roof)

    const peakPole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.85, 10), accentMat)
    peakPole.position.y = 0.92
    group.add(peakPole)

    // Ambient lantern + camp table
    const tableTop = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.06, 0.5), accentMat)
    tableTop.position.set(1.28, 0.42, 0.45)
    addCrispEdges(tableTop, palette.inkEdge)
    group.add(tableTop)

    const lantern = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.24, 12), lanternMat)
    lantern.position.set(1.28, 0.57, 0.45)
    group.add(lantern)
  } else if (kitId === 'family-ridge-pack') {
    // Spacious family cabin tent
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.85, 1.45), secondaryMat)
    cabin.position.y = 0.425
    addCrispEdges(cabin, palette.inkEdge)
    group.add(cabin)

    const roof = new THREE.Mesh(new THREE.ConeGeometry(1.45, 0.72, 4), primaryMat)
    roof.position.y = 1.21
    roof.rotation.y = Math.PI * 0.25
    roof.scale.set(1.12, 1, 0.88)
    addCrispEdges(roof, palette.inkEdge)
    group.add(roof)

    const crate = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.3, 0.35), accentMat)
    crate.position.set(1.22, 0.15, 0.82)
    addCrispEdges(crate, palette.inkEdge)
    group.add(crate)
  } else {
    // Overland cookout kit: tunnel shelter + prep kitchen + cooler
    const tunnel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.75, 0.75, 1.75, 12, 1, false, 0, Math.PI),
      primaryMat,
    )
    tunnel.rotation.z = Math.PI * 0.5
    tunnel.rotation.y = Math.PI * 0.5
    tunnel.position.set(-0.35, 0.02, -0.2)
    addCrispEdges(tunnel, palette.inkEdge)
    group.add(tunnel)

    const prepStation = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.55, 0.52), secondaryMat)
    prepStation.position.set(0.85, 0.28, 0.65)
    addCrispEdges(prepStation, palette.inkEdge)
    group.add(prepStation)

    const cooler = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.38, 0.4), accentMat)
    cooler.position.set(-0.95, 0.19, 0.88)
    addCrispEdges(cooler, palette.inkEdge)
    group.add(cooler)
  }

  return group
}

function disposeGroup(group: THREE.Group): void {
  group.traverse((node) => {
    if (node instanceof THREE.Mesh || node instanceof THREE.LineSegments) {
      node.geometry.dispose()
      if (Array.isArray(node.material)) {
        node.material.forEach((m) => m.dispose())
      } else {
        node.material.dispose()
      }
    }
  })
}

export function CampingGear3DCanvas({ kit, priorityHero = false }: CampingGear3DCanvasProps) {
  const theme = useThemeStore((state) => state.theme)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [webglAvailable, setWebglAvailable] = useState(true)
  const [dragActive, setDragActive] = useState(false)

  const motionStateRef = useRef({
    yaw: -0.62,
    pitch: 0.32,
    zoom: 4.9,
  })
  const animatableRef = useRef<ReturnType<typeof createAnimatable> | null>(null)
  const dragPointerRef = useRef<{ x: number; y: number } | null>(null)
  const modelGroupRef = useRef<THREE.Group | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const gridRef = useRef<THREE.GridHelper | null>(null)

  // Initialize WebGL renderer, camera, lights, and Anime.js animatable controller
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return undefined

    let renderer: THREE.WebGLRenderer
    try {
      const ctx = canvas.getContext('webgl2') || canvas.getContext('webgl')
      if (!ctx) {
        setWebglAvailable(false)
        return undefined
      }
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' })
    } catch {
      setWebglAvailable(false)
      return undefined
    }

    const palette = getPaletteForTheme(theme)
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(palette.canvasBg)
    sceneRef.current = scene

    const width = container.clientWidth || 640
    const height = container.clientHeight || 480
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(width, height, false)

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.72)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.15)
    keyLight.position.set(4.5, 6.5, 4.2)
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0xff8a5b, 0.45)
    rimLight.position.set(-4.2, 3.0, -3.5)
    scene.add(rimLight)

    const grid = new THREE.GridHelper(6, 12, palette.gridLine, palette.gridLine)
    grid.position.y = -0.15
    scene.add(grid)
    gridRef.current = grid

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    animatableRef.current = createAnimatable(motionStateRef.current, {
      yaw: 0,
      pitch: 0,
      zoom: 0,
      duration: reducedMotion ? 0 : 420,
      ease: createSpring({ stiffness: 170, damping: 22 }),
    })

    const resizeObserver = new ResizeObserver(() => {
      const nextW = container.clientWidth || 640
      const nextH = container.clientHeight || 480
      camera.aspect = nextW / nextH
      camera.updateProjectionMatrix()
      renderer.setSize(nextW, nextH, false)
    })
    resizeObserver.observe(container)

    let frameId = 0
    const renderFrame = () => {
      const { yaw, pitch, zoom } = motionStateRef.current
      const radius = zoom
      camera.position.x = Math.sin(yaw) * Math.cos(pitch) * radius
      camera.position.y = Math.sin(pitch) * radius + 0.55
      camera.position.z = Math.cos(yaw) * Math.cos(pitch) * radius
      camera.lookAt(0, 0.45, 0)

      renderer.render(scene, camera)
      frameId = window.requestAnimationFrame(renderFrame)
    }
    frameId = window.requestAnimationFrame(renderFrame)

    return () => {
      window.cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      animatableRef.current?.revert()
      animatableRef.current = null
      if (modelGroupRef.current) {
        scene.remove(modelGroupRef.current)
        disposeGroup(modelGroupRef.current)
        modelGroupRef.current = null
      }
      renderer.dispose()
    }
  }, [])

  // Sync theme colors onto active WebGL scene
  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return
    const palette = getPaletteForTheme(theme)
    scene.background = new THREE.Color(palette.canvasBg)
    if (gridRef.current) {
      scene.remove(gridRef.current)
      gridRef.current.geometry.dispose()
      const nextGrid = new THREE.GridHelper(6, 12, palette.gridLine, palette.gridLine)
      nextGrid.position.y = -0.15
      scene.add(nextGrid)
      gridRef.current = nextGrid
    }
  }, [theme])

  // Rebuild 3D kit geometry and choreograph entrance via Anime.js timeline on kit/theme change
  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    if (modelGroupRef.current) {
      scene.remove(modelGroupRef.current)
      disposeGroup(modelGroupRef.current)
    }

    const palette = getPaletteForTheme(theme)
    const nextGroup = buildKitModel(kit.id, palette)
    scene.add(nextGroup)
    modelGroupRef.current = nextGroup

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    nextGroup.position.y = 0.65
    nextGroup.scale.set(0.84, 0.84, 0.84)
    nextGroup.rotation.y = -Math.PI * 0.4

    const tl = createTimeline({ defaults: { ease: 'steps(8)' } })
    tl.add(nextGroup.position, {
      y: 0,
      duration: 480,
    })
      .add(
        nextGroup.scale,
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 480,
        },
        '<',
      )
      .add(
        nextGroup.rotation,
        {
          y: 0,
          duration: 560,
        },
        '<',
      )

    return () => {
      tl.pause()
    }
  }, [kit.id, theme])

  const nudgeYaw = (delta: number) => {
    const nextYaw = motionStateRef.current.yaw + delta
    if (animatableRef.current) {
      animatableRef.current.yaw(nextYaw)
    } else {
      motionStateRef.current.yaw = nextYaw
    }
  }

  const resetCamera = () => {
    if (animatableRef.current) {
      animatableRef.current.yaw(-0.62)
      animatableRef.current.pitch(0.32)
      animatableRef.current.zoom(4.9)
    } else {
      motionStateRef.current = { yaw: -0.62, pitch: 0.32, zoom: 4.9 }
    }
    if (modelGroupRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animate(modelGroupRef.current.rotation, {
        y: [modelGroupRef.current.rotation.y, 0],
        duration: 460,
        ease: 'outExpo',
      })
    }
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    dragPointerRef.current = { x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragActive(true)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!dragPointerRef.current) return
    const dx = event.clientX - dragPointerRef.current.x
    const dy = event.clientY - dragPointerRef.current.y
    dragPointerRef.current = { x: event.clientX, y: event.clientY }

    const nextYaw = motionStateRef.current.yaw - dx * 0.01
    const nextPitch = Math.min(Math.max(motionStateRef.current.pitch + dy * 0.008, 0.08), 0.95)
    if (animatableRef.current) {
      animatableRef.current.yaw(nextYaw)
      animatableRef.current.pitch(nextPitch)
    } else {
      motionStateRef.current.yaw = nextYaw
      motionStateRef.current.pitch = nextPitch
    }
  }

  const handlePointerUp = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    dragPointerRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    setDragActive(false)
  }

  return (
    <div className="webgl-stage-wrap">
      <div className="webgl-stage-frame" ref={containerRef}>
        {webglAvailable ? (
          <canvas
            aria-label={`Interactive 3D WebGL model of ${kit.name}`}
            className={`webgl-stage-canvas${dragActive ? ' is-dragging' : ''}`}
            height={900}
            onPointerCancel={handlePointerUp}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            ref={canvasRef}
            role="img"
            width={1200}
          />
        ) : (
          <img
            alt={kit.imageAlt}
            className="hero-image"
            fetchPriority={priorityHero ? 'high' : undefined}
            height={900}
            src={kit.image}
            width={1200}
          />
        )}
        <span className="hero-floating-tag">${kit.pricePerDay}/day</span>
      </div>

      <div className="webgl-controls-row" role="group" aria-label="3D model camera controls">
        <button
          aria-label="Rotate 3D model left"
          className="webgl-control-btn"
          onClick={() => nudgeYaw(-0.65)}
          type="button"
        >
          Rotate Left
        </button>
        <button
          aria-label="Rotate 3D model right"
          className="webgl-control-btn"
          onClick={() => nudgeYaw(0.65)}
          type="button"
        >
          Rotate Right
        </button>
        <button
          aria-label="Reset 3D model view"
          className="webgl-control-btn"
          onClick={resetCamera}
          type="button"
        >
          Reset View
        </button>
      </div>
    </div>
  )
}

export default CampingGear3DCanvas
