// app/messages/[userId]/page.tsx
import MessagePage from "../MessagePage";

interface Props {
  params: { userId: string };
}

export default function ChatPage({ params }: Props) {
  return <MessagePage initialUserId={params.userId} />;
}