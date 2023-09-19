import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthBody } from './schemas/auth.schema';

@Injectable()
export class AuthRepository {
  constructor(@InjectModel(AuthBody.name) private db: Model<AuthBody>) {}

  userByEmail(email: string) {
    return this.db.findOne({ email }).exec();
  }

  createUser(user: Omit<AuthBody, 'token'>) {
    return this.db.create(user);
  }

  saveToken(user: AuthBody, token: string) {
    return this.db.updateOne(user, { $set: { token: token } });
  }
}
