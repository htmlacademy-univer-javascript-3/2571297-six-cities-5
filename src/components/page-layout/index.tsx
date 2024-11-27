interface PageLayoutProps {
  pageClassName?: string;
  children: React.ReactNode;
}

export const PageLayout = ({ pageClassName = '', children }: PageLayoutProps) => (
  <div className={`page ${pageClassName}`}>{children}</div>
);
