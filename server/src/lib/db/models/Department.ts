import mongoose, { Schema, Document } from 'mongoose';

export interface IDepartment extends Document {
  name: string;
  code: string;
  institutionDomain: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DepartmentSchema: Schema<IDepartment> = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true, uppercase: true },
  institutionDomain: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

DepartmentSchema.index({ institutionDomain: 1 });


export default (mongoose.models.Department as any) || mongoose.model('Department', DepartmentSchema);