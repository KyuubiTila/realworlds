import React from 'react';
import { Footer, Header } from './components/Wrappers';
import { BrowserRouter as Router } from 'react-router-dom';
import { AllRoutes } from './routes/AllRoutes';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Header className="mb-4" />
          <main className="flex-grow ">
            <AllRoutes />
          </main>
          <Footer className="mt-4" />
        </Router>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </div>
  );
}

export default App;
