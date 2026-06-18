import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  id?:string
}

export default function Container({ id, children, className = "", fullWidth = false }: ContainerProps) {
  if (fullWidth) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <div className={`max-w-7xl mx-auto px-6 ${className}`}>
      {children}
    </div>
  );
}
