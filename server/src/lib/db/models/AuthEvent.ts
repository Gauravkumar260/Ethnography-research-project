import mongoose, { Schema, Document } from 'mongoose';

export interface IAuthEvent extends Document {
  userId: mongoose.Types.ObjectId | null;
  eventType: 'REGISTER' | 'LOGIN_SUCCESS' | 'LOGIN_FAILED' | 'LOGOUT' |
    'TOKEN_REFRESHED' | 'PASSWORD_CHANGED' | 'PASSWORD_RESET' | 'EMAIL_VERIFIED' |
    'MFA_ENABLED' | 'MFA_DISABLED' | 'MFA_USED' | 'MFA_BACKUP_USED' |
    'SESSION_REVOKED' | 'ACCOUNT_LOCKED' | 'ACCOUNT_UNLOCKED' |
    'OAUTH_LINKED' | 'SUSPICIOUS_ACTIVITY' | 'ROLE_CHANGED' | 'ACCOUNT_DELETED';
  ipAddress: string;
  userAgent: string;
  metadata: Record<string, unknown>;
  success: boolean;
  riskScore: number | null;
  createdAt: Date;
}

const AuthEventSchema: Schema<IAuthEvent> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  eventType: { 
    type: String, 
    enum: [
      'REGISTER', 'LOGIN_SUCCESS', 'LOGIN_FAILED', 'LOGOUT',
      'TOKEN_REFRESHED', 'PASSWORD_CHANGED', 'PASSWORD_RESET', 'EMAIL_VERIFIED',
      'MFA_ENABLED', 'MFA_DISABLED', 'MFA_USED', 'MFA_BACKUP_USED',
      'SESSION_REVOKED', 'ACCOUNT_LOCKED', 'ACCOUNT_UNLOCKED',
      'OAUTH_LINKED', 'SUSPICIOUS_ACTIVITY', 'ROLE_CHANGED', 'ACCOUNT_DELETED'
    ],
    required: true 
  },
  ipAddress: { type: String, required: true },
  userAgent: { type: String, required: true },
  metadata: { type: Schema.Types.Mixed, default: {} },
  success: { type: Boolean, required: true },
  riskScore: { type: Number, default: null }
}, { timestamps: { createdAt: true, updatedAt: false } });

// Immutable constraints
AuthEventSchema.pre('updateOne', function(next) { next(new Error('AuthEvent is immutable')); });
AuthEventSchema.pre('updateMany', function(next) { next(new Error('AuthEvent is immutable')); });
AuthEventSchema.pre('findOneAndUpdate', function(next) { next(new Error('AuthEvent is immutable')); });
AuthEventSchema.pre('deleteOne', function(next) { next(new Error('AuthEvent is immutable')); });
AuthEventSchema.pre('deleteMany', function(next) { next(new Error('AuthEvent is immutable')); });
AuthEventSchema.pre('findOneAndDelete', function(next) { next(new Error('AuthEvent is immutable')); });

AuthEventSchema.index({ userId: 1 });
AuthEventSchema.index({ eventType: 1 });
AuthEventSchema.index({ createdAt: -1 });
AuthEventSchema.index({ userId: 1, createdAt: -1 });


export default (mongoose.models.AuthEvent as any) || mongoose.model('AuthEvent', AuthEventSchema);