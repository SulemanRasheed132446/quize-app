import React from 'react';
import { QuizProvider } from './provider/QuizProvider';
import { Quiz } from './components/Quiz'
function App() {

  return (
    <QuizProvider>
      <Quiz />
    </QuizProvider>
  );
}

export default App;
