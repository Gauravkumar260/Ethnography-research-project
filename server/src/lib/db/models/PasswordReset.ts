import mongoose, { Schema, Document } from 'mongoose';

export interface IPasswordReset extends Document {
  userId: mongoose.Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
  usedAt: Date | null;
  ipAddress: string;
}

const PasswordResetSchema: Schema<IPasswordReset> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tokenHash: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  usedAt: { type: Date, default: null },
  ipAddress: { type: String, required: true }
}, { timestamps: { createdAt: true, updatedAt: false } });

PasswordResetSchema.index({ tokenHash: 1 }, { unique: true });
PasswordResetSchema.index({ userId: 1 });
PasswordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index


export default (mongoose.models.PasswordReset as any) || mongoose.model('PasswordReset', PasswordResetSchema);