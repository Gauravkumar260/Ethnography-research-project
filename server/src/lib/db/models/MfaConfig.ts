import mongoose, { Schema, Document } from 'mongoose';

export interface IMfaConfig extends Document {
  userId: mongoose.Types.ObjectId;
  method: 'TOTP' | 'SMS';
  secret: string;
  isEnabled: boolean;
  enabledAt: Date | null;
  phoneNumber: string | null;
  backupCodes: Array<{
    codeHash: string;
    isUsed: boolean;
    usedAt: Date | null;
  }>;
  lastUsedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const MfaConfigSchema: Schema<IMfaConfig> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  method: { type: String, enum: ['TOTP', 'SMS'], required: true },
  secret: { type: String, required: true }, // Encrypted AES-256-GCM
  isEnabled: { type: Boolean, default: false },
  enabledAt: { type: Date, default: null },
  phoneNumber: { type: String, default: null },
  backupCodes: [{
    codeHash: { type: String, required: true },
    isUsed: { type: Boolean, default: false },
    usedAt: { type: Date, default: null }
  }],
  lastUsedAt: { type: Date, default: null }
}, { timestamps: true });

MfaConfigSchema.index({ userId: 1 }, { unique: true });


export default (mongoose.models.MfaConfig as any) || mongoose.model('MfaConfig', MfaConfigSchema);