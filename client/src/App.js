import React from 'react';
import { Footer, Header } from './components/Wrappers';
import { BrowserRouter as Router } from 'react-router-dom';
import { AllRoutes } from './routes/AllRoutes';

function App() {
  return (
    <div className="App">
      <Router>
        <Header className="mb-4" />
        <main className="flex-grow ">
          <AllRoutes />
        </main>
        <Footer className="mt-4" />
      </Router>
    </div>
  );
}

export default App;
