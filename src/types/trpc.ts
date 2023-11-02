import type { RouterOutputs } from "~/trpc/shared";

export type Room = RouterOutputs["room"]["getRoom"];

export type User = RouterOutputs["user"]["getUser"];
