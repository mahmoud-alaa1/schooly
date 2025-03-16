import { AiOutlineSend } from "react-icons/ai";
import { Button } from "./ui/button";
import UserAvatar from "./ui/userAvatar";
import { AutosizeTextarea } from "./ui/AutoResizeTextArea";

interface IUserInputProps {
  id?: string;
  label?: string;
  isPending?: boolean;
  value?: string;
  setValue?: (val: string) => void;
  error?: Error | null;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function UserInput({
  id,
  isPending,
  label,
  value,
  error = null,
  setValue,
  onSubmit,
}: IUserInputProps) {
  return (
    <div>
      <div className="bg-primary/10 border border-primary/25  rounded-xl p-3 grid grid-cols-[auto_1fr] gap-3 pb-1 ">
        <UserAvatar avatar={5} size={24} className="flex-grow-0" />
        <form className="flex gap-2" onSubmit={(e) => onSubmit?.(e)}>
          <div className="flex h-fit w-full">
            <label htmlFor={id}>
              <strong className="text-xs hide">{label}</strong>
            </label>
            <AutosizeTextarea
              disabled={isPending}
              id={id}
              minHeight={1}
              value={value}
              placeholder={label}
              className="bg-primary/0 flex-grow  border-none leading-[25px]"
              onChange={(e) => {
                setValue?.(e.target.value);
              }}
            />
          </div>
          <Button
            disabled={isPending || value?.trim() === ""}
            size="nothing"
            type="submit"
            className=" border bg-primary-foreground rounded-full hover:bg-primary-foreground border-neutral-300 shadow-md py-1 px-[10px] h-fit"
          >
            <AiOutlineSend className="text-black text-base" />
          </Button>
        </form>
      </div>
      {error && <p className="text-red-500 ">{error.message}</p>}
    </div>
  );
}
