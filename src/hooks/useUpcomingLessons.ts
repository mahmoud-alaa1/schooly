import { getLessons } from "@/services/upcomingLessons";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function useUpcomingLessons() {
  const [page, setPage] = useState(1);
  const { mutate, isPending, error, data } = useMutation({
    mutationFn: (page: number) => getLessons({ page }),
  });

  useEffect(() => {
    mutate(page);
  }, [mutate, page]);

  return { isPending, error, setPage, data };
}
