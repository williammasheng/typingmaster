import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import TypingArea from './components/TypingArea';
import AuthScreen from './components/AuthScreen';
import { Exercise, ExerciseCategory, User } from './types';
import { MOCK_DB } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'typing'>('dashboard');
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [category, setCategory] = useState<ExerciseCategory>('basic');
  
  // Settings State
  const [isDark, setIsDark] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Apply theme class to HTML element
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);
  const toggleSound = () => setSoundEnabled(prev => !prev);

  // Auth Handlers
  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('dashboard');
    setCurrentExercise(null);
  };

  // "Mock API" fetcher
  const fetchExercise = (cat: ExerciseCategory) => {
    const list = MOCK_DB[cat];
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  };

  const handleSelectCategory = (cat: ExerciseCategory) => {
    setCategory(cat);
    const exercise = fetchExercise(cat);
    setCurrentExercise(exercise);
    setCurrentView('typing');
  };

  const handleRestart = () => {
    // Fetch a new exercise of the same category
    const exercise = fetchExercise(category);
    setCurrentExercise(exercise);
  };

  const handleBack = () => {
    setCurrentView('dashboard');
    setCurrentExercise(null);
  };

  // If user is not logged in, show Auth Screen
  if (!user) {
    return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="antialiased min-h-screen">
      {currentView === 'dashboard' ? (
        <Dashboard 
          user={user}
          onSelectCategory={handleSelectCategory}
          onLogout={handleLogout}
          isDark={isDark}
          toggleTheme={toggleTheme}
          soundEnabled={soundEnabled}
          toggleSound={toggleSound}
        />
      ) : (
        currentExercise && (
          <TypingArea 
            exercise={currentExercise} 
            onBack={handleBack}
            onRestart={handleRestart}
            isDark={isDark}
            toggleTheme={toggleTheme}
            soundEnabled={soundEnabled}
            toggleSound={toggleSound}
          />
        )
      )}
    </div>
  );
};

export default App;