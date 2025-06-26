import Header from "@/app/components/header";
import Chat from "@/app/components/chat/chat";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>
        {children}
        <Chat />
      </main>
    </>
  );
}
