import { Factory } from 'fishery';
import { UserEntity } from '../../src/user/dto/response/user.entity';

export default Factory.define<UserEntity>(({ sequence, params }) => ({
  id: sequence,
  name: params.name || `name-${sequence}`,
  email: params.email || `email-${sequence}`,
  password: params.password || `password-${sequence}`,
  UserRoles: [],
  updatedAt: new Date(),
  createdAt: new Date(),
}));
