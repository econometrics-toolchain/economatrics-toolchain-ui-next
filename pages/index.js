import { Landing } from '../components/landing/Landing';
import { useAuth } from '../hooks/useAuth';
import { Dashboard } from '../components/members/Members';


export default function Home() {
  const { isPending, isAuthenticated } = useAuth();

  return (<>
    {isAuthenticated ? <Dashboard /> : <Landing />}
  </>)

}
