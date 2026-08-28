import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@org/data';
import { router } from '../router/index.js';
import '../styles.css';

export function App() {
  return (
    <QueryClientProvider client={queryClient as any}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
