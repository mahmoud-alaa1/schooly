import AgoraClientProvider from "./AgoraClientProvider";
import { LiveVideo } from "./Videos";

export default function AgorLiveVideoWrapper() {
  return (
    <AgoraClientProvider>
      <LiveVideo />
    </AgoraClientProvider>
  );
}
