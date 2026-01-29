import { route, layout } from "@react-router/dev/routes";
import type { RouteConfig, RouteConfigEntry } from "@react-router/dev/routes";

export const extendedRoutes: RouteConfigEntry[] = [
  // ========================================================================
  // AGENT HUB ROUTES
  // ========================================================================

  // Agent Registry
  route("agents", "routes/agents/page.tsx"),

  // Agent Check-in
  route("check-in", "routes/check-in/page.tsx"),

  // Agent Dashboard
  route("agent-dashboard", "routes/agent-dashboard/page.tsx"),

  // ========================================================================
  // REDIRECTS
  // ========================================================================
  {
    path: "/:workspaceSlug/:projectId/settings",
    file: "routes/redirects/core/project-settings",
  },
];
