import Header from "../components/header";
import Chat from "../components/chat/chat";

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
