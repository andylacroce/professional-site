export default function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="section-header font-display">
      {children}
    </h2>
  );
}
