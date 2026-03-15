import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
  userId: mongoose.Types.ObjectId;
  refreshTokenHash: string;
  tokenFamily: string;
  deviceInfo: {
    browser: string;
    os: string;
    deviceType: 'mobile' | 'desktop' | 'tablet';
  };
  ipAddress: string;
  userAgent: string;
  location: { country: string; city: string; region: string } | null;
  isActive: boolean;
  createdAt: Date;
  expiresAt: Date;
  lastUsedAt: Date;
  revokedAt: Date | null;
}

const SessionSchema: Schema<ISession> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  refreshTokenHash: { type: String, required: true, unique: true },
  tokenFamily: { type: String, required: true },
  deviceInfo: {
    browser: { type: String, required: true },
    os: { type: String, required: true },
    deviceType: { type: String, enum: ['mobile', 'desktop', 'tablet'], required: true }
  },
  ipAddress: { type: String, required: true },
  userAgent: { type: String, required: true },
  location: {
    country: { type: String },
    city: { type: String },
    region: { type: String }
  },
  isActive: { type: Boolean, default: true },
  expiresAt: { type: Date, required: true },
  lastUsedAt: { type: Date, default: Date.now },
  revokedAt: { type: Date, default: null }
}, { timestamps: { createdAt: true, updatedAt: false } });

SessionSchema.index({ userId: 1, tokenFamily: 1 });
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL Index


export default (mongoose.models.Session as any) || mongoose.model('Session', SessionSchema);