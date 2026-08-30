import { PropsWithChildren } from "react";
import { Providers } from "./providers";

export function App({ children }: PropsWithChildren) {
	return <Providers>{children}</Providers>;
}
