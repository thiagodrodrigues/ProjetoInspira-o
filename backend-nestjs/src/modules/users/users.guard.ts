import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PatientsUserGuard } from '../patients/patients.guard';
import { PhysiotherapistsUserGuard } from '../physiotherapists/physiotherapists.guard';

@Injectable()
export class UsersGuard implements CanActivate {
  constructor(
    private patientsUserGuard: PatientsUserGuard,
    private physiotherapistsUserGuard: PhysiotherapistsUserGuard,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.validateRequest(context);
  }

  async validateRequest(context: ExecutionContext): Promise<boolean> {
    try {
      const patientValid = await this.patientsUserGuard.canActivate(context);
      if (patientValid) {
        return true;
      }
    } catch (error) {}

    try {
      const physiotherapistValid = await this.physiotherapistsUserGuard.canActivate(context);
      if (physiotherapistValid) {
        return true;
      }
    } catch (error) {}

    throw new UnauthorizedException('Acesso não autorizado');
  }
}
