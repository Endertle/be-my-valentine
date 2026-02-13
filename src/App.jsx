import { useState, useRef, useCallback, useMemo } from 'react'
import styles from './App.module.css'

function App() {
  const [answer, setAnswer] = useState(null)
  const [noPosition, setNoPosition] = useState({ left: '50%', top: '100px', transform: 'translateX(-50%)' })
  const containerRef = useRef(null)
  const noButtonRef = useRef(null)

  const hearts = useMemo(() => 
    [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`
    })), 
  [])

  const moveNoButton = useCallback(() => {
    if (!containerRef.current || !noButtonRef.current) return
    const container = containerRef.current.getBoundingClientRect()
    const button = noButtonRef.current.getBoundingClientRect()
    
    const maxX = container.width - button.width - 20
    const maxY = container.height - button.height - 20
    
    const newX = Math.random() * Math.max(0, maxX) + 10
    const newY = Math.random() * Math.max(0, maxY) + 10
    setNoPosition({ left: `${newX}px`, top: `${newY}px`, transform: 'none' })
  }, [])

  const handleNoHover = () => {
    moveNoButton()
  }

  const handleNoClick = () => {
    moveNoButton()
  }

  const handleYes = () => {
    setAnswer(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.hearts}>
        {hearts.map((heart) => (
          <div key={heart.id} className={styles.heart} style={{
            left: heart.left,
            animationDelay: heart.animationDelay,
            animationDuration: heart.animationDuration
          }}></div>
        ))}
      </div>

      <div className={styles.content} ref={containerRef}>
        {!answer ? (
          <>
            <h1 className={styles.question}>Will you be my Valentine?</h1>
            <div className={styles.buttons}>
              <button className={styles.yesBtn} onClick={handleYes}>
                Yes 💕
              </button>
              <button
                ref={noButtonRef}
                className={styles.noBtn}
                style={noPosition}
                onMouseEnter={handleNoHover}
                onClick={handleNoClick}
              >
                No 💔
              </button>
            </div>
          </>
        ) : (
          <div className={styles.celebration}>
            <div className={styles.bigHeart}>❤️</div>
            <h1 className={styles.celebrationText}>YAY! I love you so much! 💕</h1>
            <p className={styles.message}>
              Since you said yes, let's celebrate at <strong>SM Santa Rosa</strong>!
            </p>
            <div className={styles.plans}>
              <h2>🎉 Our Valentine's Date Plan:</h2>
              <p className={styles.intro}>We'll be going to <strong>SM Santa Rosa Game Park</strong>!</p>
              <ul className={styles.activities}>
                <li>🎯 <strong>Arcade Games</strong> - Let's play together!</li>
                <li>🎤 <strong>KTV</strong> - Sing our hearts out! 🎶</li>
                <li>🎳 <strong>Bowling</strong> - Let's see who wins! 🏆</li>
                <li>🕹️ <strong>Billiards</strong> - Another fun game</li>
                <li>🎯 <strong>Archery</strong> - Let's test our aim!</li>
              </ul>
              <p className={styles.highlight}>
                Can't wait to try <strong>KTV</strong> and <strong>Bowling</strong> with you! 💕
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
