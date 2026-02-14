interface HeaderProps {
  readonly title: string;
  readonly subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="bg-primary-600 text-white px-4 py-3 sticky top-0 z-40">
      <div className="max-w-lg mx-auto">
        <h1 className="text-lg font-bold">{title}</h1>
        {subtitle && <p className="text-sm text-primary-100">{subtitle}</p>}
      </div>
    </header>
  );
}
