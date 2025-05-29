import { AutosizeTextarea } from "@/components/ui/AutoResizeTextarea";

export default function CommentEdit() {
  return (
    <div>
      <AutosizeTextarea
        style={{
          resize: "none",
        }}
      />
    </div>
  );
}
