export default function Card({ children, className = '' }) {
  return (
    <div className={`border rounded-lg shadow-md hover:shadow-lg transition overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
