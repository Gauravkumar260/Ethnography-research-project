import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  passwordHash: string | null;
  emailVerified: boolean;
  emailVerifiedAt: Date | null;
  role: 'STUDENT' | 'SUPERVISOR' | 'EXAMINER' | 'DEPARTMENT_ADMIN' | 'SUPER_ADMIN';
  departmentId: mongoose.Types.ObjectId;
  studentId: string | null;
  fullName: string;
  avatarUrl: string | null;
  isActive: boolean;
  isBanned: boolean;
  bannedReason: string | null;
  failedLoginAttempts: number;
  lockedUntil: Date | null;
  mustChangePwd: boolean;
  lastLoginAt: Date | null;
  lastLoginIp: string | null;
  createdAt: Date;
  updatedAt: Date;
  isLocked(): boolean;
  incrementFailedAttempts(): Promise<void>;
  resetFailedAttempts(): Promise<void>;
  toSafeObject(): Record<string, any>;
}

const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, default: null },
  emailVerified: { type: Boolean, default: false },
  emailVerifiedAt: { type: Date, default: null },
  role: { 
    type: String, 
    enum: ['STUDENT', 'SUPERVISOR', 'EXAMINER', 'DEPARTMENT_ADMIN', 'SUPER_ADMIN'],
    required: true 
  },
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  studentId: { type: String, sparse: true, unique: true, default: null },
  fullName: { type: String, required: true },
  avatarUrl: { type: String, default: null },
  isActive: { type: Boolean, default: true },
  isBanned: { type: Boolean, default: false },
  bannedReason: { type: String, default: null },
  failedLoginAttempts: { type: Number, default: 0 },
  lockedUntil: { type: Date, default: null },
  mustChangePwd: { type: Boolean, default: false },
  lastLoginAt: { type: Date, default: null },
  lastLoginIp: { type: String, default: null }
}, { timestamps: true });

UserSchema.index({ departmentId: 1, role: 1 });

UserSchema.methods.isLocked = function(): boolean {
  return this.lockedUntil ? this.lockedUntil > new Date() : false;
};

UserSchema.methods.incrementFailedAttempts = async function(): Promise<void> {
  this.failedLoginAttempts += 1;
  if (this.failedLoginAttempts >= 5) {
    this.lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
  }
  await this.save();
};

UserSchema.methods.resetFailedAttempts = async function(): Promise<void> {
  this.failedLoginAttempts = 0;
  this.lockedUntil = null;
  await this.save();
};

UserSchema.methods.toSafeObject = function(): Record<string, any> {
  const obj = this.toObject();
  delete obj.passwordHash;
  delete obj.failedLoginAttempts;
  delete obj.lockedUntil;
  return obj;
};


export default (mongoose.models.User as any) || mongoose.model('User', UserSchema);