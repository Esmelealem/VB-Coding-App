/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const avatarStyles = css`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--accent-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

interface UserAvatarProps {
  user: {
    name?: string;
    email: string;
    avatar?: string;
  };
}

export function UserAvatar({ user }: UserAvatarProps) {
  return (
    <div css={avatarStyles}>
      {user.avatar ? (
        <img 
          src={user.avatar} 
          alt="Profile" 
          css={css`
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
          `}
        />
      ) : (
        <span>{user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
}