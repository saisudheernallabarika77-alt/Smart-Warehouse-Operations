# Live AI Integration Verification

## Live provider path

- Request: `POST /api/trpc/ai.ask`
- Context: Shift B WarehouseIQ demo context
- Result: HTTP 200 with `source: live`
- Model: `claude-haiku-4-5`
- Response: Natural-language operational recommendation returned from the server-side LLM proxy.

## Forced provider failure path

- Isolated production server launched with an intentionally unreachable Forge API URL.
- Request: `POST /api/trpc/ai.ask`
- Result: HTTP 500 with the controlled message `Live AI is temporarily unavailable`.
- Client behavior: `AiPredictionWorkspace` catches this error, renders the deterministic WarehouseIQ answer card with `Offline fallback · local project context`, and shows a Sonner error toast.

## Quality checks

- `pnpm test`: 2 files passed, 3 tests passed.
- `pnpm check`: passed with no TypeScript errors.
- `pnpm build`: passed; client and server bundles generated.
- Desktop screenshot: AI Prediction hero, chat area, secure server notice, and quick prompts visible at 1280×720.
- Mobile screenshot: responsive AI Prediction hero and chat header visible at 375×812.
