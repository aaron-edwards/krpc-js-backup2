import { TestService } from './TestService';
import { KRPC } from './KRPC';

export { TestService } from './TestService';
export { KRPC } from './KRPC';

export type Services = {
  TestService: TestService.TestService;
  KRPC: KRPC.KRPC;
};
