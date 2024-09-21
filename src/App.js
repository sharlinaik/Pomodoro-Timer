// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes
  const [workDuration, setWorkDuration] = useState(1500); // 25 minutes
  const [breakDuration, setBreakDuration] = useState(300); // 5 minutes

  useEffect(() => {
    let timer = null;

    if (isActive) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            if (isBreak) {
              setIsBreak(false);
              return workDuration; // Reset to work duration
            } else {
              setIsBreak(true);
              return breakDuration; // Reset to break duration
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, isBreak, workDuration, breakDuration]);

  const formatTime = (seconds) => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${minutes}:${secs}`;
  };

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(workDuration);
    setIsBreak(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pomodoro Timer</h1>
      <div style={styles.timer}>
        <h2>{isBreak ? 'Break Time' : 'Work Time'}</h2>
        <p style={styles.time}>{formatTime(timeLeft)}</p>
      </div>
      <div style={styles.controls}>
        {!isActive ? (
          <button onClick={handleStart} style={styles.button}>
            Start
          </button>
        ) : (
          <button onClick={handlePause} style={styles.button}>
            Pause
          </button>
        )}
        <button onClick={handleReset} style={styles.button}>
          Reset
        </button>
      </div>
      <div style={styles.settings}>
        <h3>Settings</h3>
        <label>
          Work Duration (minutes):
          <input
            type="number"
            min="1"
            value={workDuration / 60}
            onChange={(e) => {
              const newValue = Math.max(1, e.target.value) * 60;
              setWorkDuration(newValue);
              if (!isActive) setTimeLeft(newValue);
            }}
            style={styles.input}
          />
        </label>
        <label>
          Break Duration (minutes):
          <input
            type="number"
            min="1"
            value={breakDuration / 60}
            onChange={(e) => {
              const newValue = Math.max(1, e.target.value) * 60;
              setBreakDuration(newValue);
            }}
            style={styles.input}
          />
        </label>
      </div>
    </div>
  );
};

// Basic styles for the components
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  timer: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  time: {
    fontSize: '3rem',
    color: '#333',
  },
  controls: {
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    margin: '0 10px',
    fontSize: '1rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  settings: {
    marginTop: '20px',
    textAlign: 'left',
  },
  input: {
    marginLeft: '10px',
    width: '50px',
  },
};

export default PomodoroTimer;


