import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("ai.ask", () => {
  it("rejects an empty question before contacting the provider", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    await expect(
      caller.ai.ask({
        question: "",
        shift: "B",
        context: "WarehouseIQ demo context",
        history: [],
      }),
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("accepts a public project-aware request shape", () => {
    const caller = appRouter.createCaller(createPublicContext());
    expect(caller.ai.ask).toBeTypeOf("function");
  });
});
