/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { css } from '@emotion/react';
import { Button } from './Button';
import { TextField } from './TextField';

const profileStyles = css`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
`;


export default function Profile() {
  const { user, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
    }
  }, [user]);

  if (isLoading || !user) {
    return <div>Loading...</div>;
  }

  const handleSave = () => {
    // TODO: Implement profile update
    setIsEditing(false);
  };

  return (
    <div css={profileStyles}> 
      <h1>Profile Settings</h1>
      
      <div>
        <label>Email</label>
        <p>{user.email}</p>
      </div>

      <div>
        <label>Name</label>
        {isEditing ? (
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <p>{name || 'Not set'}</p>
        )}
      </div>

      <div>
        {isEditing ? (
          <>
            <Button onClick={handleSave}>Save Changes</Button>
            <Button variant="text" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </div>
    </div>
  );
}