import { RouterAdapter } from './router.interface.js';

let globalRouter: RouterAdapter | null = null;

export const setGlobalRouter = (router: RouterAdapter) => {
  globalRouter = router;
};

export const getRouter = (): RouterAdapter => {
  if (!globalRouter) throw new Error('RouterAdapter not initialized!');
  return globalRouter;
};

