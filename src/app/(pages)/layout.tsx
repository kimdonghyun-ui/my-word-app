import Header from "@/components/layout/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <Header showBackButton />
      <div className="flex-1 pt-16">{children}</div>
    </div>
  );
}
