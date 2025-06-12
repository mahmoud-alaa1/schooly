import AgoraClientProvider from "./AgoraClientProvider";
import { LiveVideo } from "./LiveVide";

export default function AgorLiveVideoWrapper() {
  return (
    <AgoraClientProvider>
      <LiveVideo />
    </AgoraClientProvider>
  );
}
