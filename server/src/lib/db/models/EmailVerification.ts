import mongoose, { Schema, Document } from 'mongoose';

export interface IEmailVerification extends Document {
  userId: mongoose.Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
  usedAt: Date | null;
}

const EmailVerificationSchema: Schema<IEmailVerification> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tokenHash: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  usedAt: { type: Date, default: null }
}, { timestamps: { createdAt: true, updatedAt: false } });

EmailVerificationSchema.index({ userId: 1 });
EmailVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index


export default (mongoose.models.EmailVerification as any) || mongoose.model('EmailVerification', EmailVerificationSchema);