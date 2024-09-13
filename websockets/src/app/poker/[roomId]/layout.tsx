import { HydrateClient } from "~/trpc/server";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <HydrateClient>{children}</HydrateClient>;
}
