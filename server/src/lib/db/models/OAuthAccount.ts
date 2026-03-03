import mongoose, { Schema, Document } from 'mongoose';

export interface IOAuthAccount extends Document {
  userId: mongoose.Types.ObjectId;
  provider: 'GOOGLE' | 'MICROSOFT' | 'GITHUB';
  providerUserId: string;
  accessToken: string;
  refreshToken: string | null;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const OAuthAccountSchema: Schema<IOAuthAccount> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  provider: { 
    type: String, 
    enum: ['GOOGLE', 'MICROSOFT', 'GITHUB'], 
    required: true 
  },
  providerUserId: { type: String, required: true },
  accessToken: { type: String, required: true }, // Encrypted before save in production
  refreshToken: { type: String, default: null }, // Encrypted before save in production
  expiresAt: { type: Date, default: null }
}, { timestamps: true });

OAuthAccountSchema.index({ provider: 1, providerUserId: 1 }, { unique: true });
OAuthAccountSchema.index({ userId: 1 });


export default (mongoose.models.OAuthAccount as any) || mongoose.model('OAuthAccount', OAuthAccountSchema);