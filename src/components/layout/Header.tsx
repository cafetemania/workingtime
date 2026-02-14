interface HeaderProps {
  readonly title: string;
  readonly subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="glass sticky top-0 z-40 border-b border-apple-separator">
      <div className="max-w-lg mx-auto px-4 py-2">
        <h1 className="text-[17px] font-semibold text-center text-apple-label">{title}</h1>
        {subtitle && (
          <p className="text-[13px] text-apple-secondaryLabel text-center">{subtitle}</p>
        )}
      </div>
    </header>
  );
}
