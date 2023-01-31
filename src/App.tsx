import React, { useState } from 'react'
import './App.css'

interface Dot {
  posX: number
  posY: number
}


function App() {
  const [dotList, setDotList] = useState<Dot[]>([])
  const [undo, setUndo] = useState<Dot[]>([])

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const newDot: Dot = {
      posX: event.clientX, posY: event.clientY
    }

    console.log(newDot);
    setDotList((prev) => [...prev, newDot])
  }


  const handleUndo = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    const dotListLastItem = dotList[dotList.length - 1]

    if (dotListLastItem) {
      const newDotList = dotList.filter((dot) => {
        return dot !== dotListLastItem
      })

      setUndo((prev) => [...prev, dotListLastItem])
      setDotList(newDotList)
    }

  }

  const handleRedo = () => {
    const lastRemovedItem = undo[undo.length - 1]

    if (lastRemovedItem) {
      const newUndo = undo.filter((dot) => {
        return dot !== lastRemovedItem
      })

      setDotList((prev) => [...prev, lastRemovedItem])
      setUndo(newUndo)
    }
  }

  return (
    <div className="App" onClick={handleClick}>
      <div className="Buttons">
        <button type='button' onClick={handleUndo}>Desfazer</button>
        <button type='button' onClick={handleRedo}>Refazer</button>
      </div>

      {
        dotList?.map((dot, index) => {
          return <span key={index} className="dot" style={{ top: dot.posY, left: dot.posX }} />
        })
      }
    </div>
  )
}

export default App
