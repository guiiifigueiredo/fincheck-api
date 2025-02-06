import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../constants/constants';

export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
