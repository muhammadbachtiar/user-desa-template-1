import './services/styles/App.css'
import Routers from './services/routes'
import 'react-loading-skeleton/dist/skeleton.css'
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {
  const queryClient = new QueryClient();
  return (
    <>
     <QueryClientProvider client={queryClient}>
        <Routers />
     </QueryClientProvider>
    </>
  )
}

export default App
