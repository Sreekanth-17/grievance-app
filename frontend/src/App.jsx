import { useState } from 'react';
import LoginPage from './LoginPage';
import GrievanceForm from './GrievanceForm';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return loggedIn ? (
    <GrievanceForm onLogout={handleLogout} />
  ) : (
    <LoginPage onLogin={() => setLoggedIn(true)} />
  );
}

export default App;
