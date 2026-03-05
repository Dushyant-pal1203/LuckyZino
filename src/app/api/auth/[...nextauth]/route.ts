import { handlers } from "auth";
import { withLogging } from '@/lib/logging/withLogging';

export const { GET, POST } = {
  GET: withLogging(handlers.GET),
  POST: withLogging(handlers.POST),
};
