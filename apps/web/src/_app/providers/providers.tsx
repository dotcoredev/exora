import { PropsWithChildren } from "react";
import { TSQueryProvider } from "./ts-query/ts-query.provider";

export function Providers({ children }: PropsWithChildren) {
	return <TSQueryProvider>{children}</TSQueryProvider>;
}
