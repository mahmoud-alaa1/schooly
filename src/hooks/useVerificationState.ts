import { EVerificationState } from "@/types/enums";

interface UseVerificationStateProps {
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export const useVerificationState = ({
  isPending,
  isError,
  isSuccess,
}: UseVerificationStateProps): EVerificationState => {
  if (isPending) return EVerificationState.LOADING;
  if (isError) return EVerificationState.ERROR;
  if (isSuccess) return EVerificationState.SUCCESS;
  return EVerificationState.CAPTURING;
};
