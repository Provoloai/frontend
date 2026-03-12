import { createFileRoute } from "@tanstack/react-router";
import KnowledgeBase from "@/pages/knowledgeBase/KnowledgeBase";

export const Route = createFileRoute("/_v2layout/knowledge-base")({
  component: KnowledgeBase,
});
