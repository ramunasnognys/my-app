'use client'

import React, { useEffect, useRef, useState } from 'react'
import Char from './Char'

const ASCII_CHARS = '@#%$&/\\*X0^_`~|[]{}()<>+=-_:;.,?!010101010101'

const ASCIIBackground: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [chars, setChars] = useState<React.ReactNode[]>([])

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', updateDimensions)
    updateDimensions()

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    const generateChars = () => {
      const newChars: React.ReactNode[] = []
      const gridSize = 20
      const cols = Math.ceil(dimensions.width / gridSize)
      const rows = Math.ceil(dimensions.height / gridSize)

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (Math.random() > 0.3) {
            const char = ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)]
            const x = col * gridSize
            const y = row * gridSize
            const size = Math.random() * 3 + 14
            const id = `char-${row}-${col}`

            newChars.push(
              <Char
                key={id}
                id={id}
                char={char}
                x={x}
                y={y}
                size={size}
              />
            )
          }
        }
      }

      setChars(newChars)
    }

    generateChars()
  }, [dimensions])

  useEffect(() => {
    let hoveredChars: string[] = []

    const autoHover = () => {
      hoveredChars.forEach(id => {
        const element = document.getElementById(id)
        if (element) {
          element.dispatchEvent(new Event('autohoverclear'))
        }
      })
      hoveredChars = []

      const charElements = document.querySelectorAll('[id^="char-"]')
      const charCount = charElements.length
      const hoverCount = Math.min(20, charCount)

      for (let i = 0; i < hoverCount; i++) {
        const randomIndex = Math.floor(Math.random() * charCount)
        const element = charElements[randomIndex] as HTMLElement
        if (element && !hoveredChars.includes(element.id)) {
          element.dispatchEvent(new Event('autohover'))
          hoveredChars.push(element.id)
        }
      }
    }

    const intervalId = setInterval(autoHover, 800)

    return () => clearInterval(intervalId)
  }, [chars])

  return (
    <div className="fixed inset-0 overflow-hidden bg-black pointer-events-none">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        className="absolute top-0 left-0"
        style={{ minHeight: '100vh', minWidth: '100vw', position: 'fixed', cursor: 'default' }}
      >
        {chars}
      </svg>
    </div>
  )
}

export default ASCIIBackground
