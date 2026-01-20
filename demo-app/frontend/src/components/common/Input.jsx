import './Input.css';

function Input({
  type = 'text',
  id,
  name,
  label,
  value,
  placeholder,
  error,
  disabled = false,
  required = false,
  onChange,
  onBlur,
  className = '',
  ...props
}) {
  const inputId = id || name;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}
      <input
        type={type}
        id={inputId}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        className={`form-input ${error ? 'form-input-error' : ''}`}
        {...props}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

export default Input;
