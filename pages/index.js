import { Landing } from '../components/landing/Landing';
import { useAuth } from '../hooks/useAuth';
import { Dashboard } from '../components/members/Members';
import { apiUrl } from '../utils/services';


export default function Home({ sheetsFromServer }) {
  const { isPending, isAuthenticated } = useAuth();
  return (<>
    {isAuthenticated ? <Dashboard initialSheets={sheetsFromServer} /> : <Landing />}
  </>)

}

Home.getInitialProps = async ({ req }) => {
  const authToken = req ? req.cookies.token : null;
  if (authToken) {
    const response = await fetch(`${apiUrl}api/sheets/`, {
      headers: {
        'Authorization': `Token ${authToken}`
      }
    })
    const data = await response.json();
    return { sheetsFromServer: data }
  } else {
    return { sheetsFromServer: null }
  }


}
