import './Card.css';

function Card({ children, className = '', onClick, ...props }) {
  const classNames = ['card', className, onClick && 'card-clickable']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} onClick={onClick} {...props}>
      {children}
    </div>
  );
}

function CardImage({ src, alt, className = '' }) {
  return (
    <div className={`card-image ${className}`}>
      <img src={src} alt={alt} />
    </div>
  );
}

function CardContent({ children, className = '' }) {
  return (
    <div className={`card-content ${className}`}>
      {children}
    </div>
  );
}

function CardTitle({ children, className = '', ...props }) {
  return (
    <h3 className={`card-title ${className}`} {...props}>
      {children}
    </h3>
  );
}

function CardFooter({ children, className = '' }) {
  return (
    <div className={`card-footer ${className}`}>
      {children}
    </div>
  );
}

Card.Image = CardImage;
Card.Content = CardContent;
Card.Title = CardTitle;
Card.Footer = CardFooter;

export default Card;
