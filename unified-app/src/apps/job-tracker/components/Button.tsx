import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  children,
  ...props
}) => {
  // Note: We use inline styles for strict design system adherence.

  // Note: Since we are using vanilla CSS variables but might need inline styles or a utility class system, 
  // I will use style objects or basic style props for now, consistent with "no Tailwind" unless requested,
  // BUT the prompt said "Use Vanilla CSS for maximum flexibility".
  // However, I used some utility-like class names in index.css.
  // To keep it simple and clean without a massive utility library, I'll use inline styles or specific CSS modules.
  // Actually, for a "System", CSS Modules or strictly scoped CSS is better. 
  // Let's stick to inline styles for dynamic values or just basic classes defined in index.css.
  // Wait, I put some utility classes in index.css.
  // But for specific component styling, I should probably use a CSS file or style object.
  // The user didn't forbid Tailwind, but the "web_application_development" context says "Avoid using TailwindCSS unless the USER explicitly requests it".
  // So I should stick to Vanilla CSS.

  // I will re-write this to use a CSS module or just a plain CSS file for the component.
  // But for simplicity in this tool call, I'll use a style object mapping to CSS variables.

  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-body)',
        fontWeight: 500,
        transition: 'all var(--transition-fast)',
        cursor: isLoading || props.disabled ? 'not-allowed' : 'pointer',
        opacity: isLoading || props.disabled ? 0.7 : 1,

        // Variant Styles (default to primary)
        backgroundColor: variant === 'primary' ? 'var(--accent-primary)' : 'transparent',
        color: variant === 'primary' ? '#fff' : 'var(--accent-primary)',
        border: variant === 'secondary' ? '1px solid var(--accent-primary)' : '1px solid transparent',

        // Size Styles
        padding: size === 'sm' ? '4px 8px' : size === 'lg' ? '16px 24px' : '8px 16px',
        fontSize: size === 'sm' ? '0.875rem' : size === 'lg' ? '1.125rem' : '1rem',
        borderRadius: 'var(--radius-md)',
      }}
    >
      {isLoading ? (
        <span className="mr-2">Loading...</span>
      ) : null}
      {children}
    </button>
  );
};
