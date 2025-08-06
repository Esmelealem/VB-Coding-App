/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function TextField({ label, ...props }: TextFieldProps) {
    const inputStyles = css`
        padding: 0.5rem;
        border: 1px solid #ddd;  // Correctly uses '1px' (number one)
        border-radius: 4px;
        width: 100%;
        margin-top: 0.25rem;
    `;

    return (
        <div>
            {label && <label>{label}</label>}  {/* Properly closed */}
            <input css={inputStyles} {...props} />
        </div>
    );
}