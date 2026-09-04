import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { visitorCheck } from "./check";

export function useVisitorCheck(): UseQueryResult<void, Error> {
	return useQuery({
		queryKey: ["visitors/check"],
		queryFn: ({ signal }) => {
			visitorCheck({
				path: window.location.pathname,
				referrer: "https://exora.nicodes.ru/",
				signal,
			});
		},

		staleTime: 1000 * 60 * 60, // 1 час данные считаются свежими
		gcTime: 1000 * 60 * 60, // 1 час держим неактивный кэш

		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});
}
