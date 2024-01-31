import { Schema, model } from "mongoose"
import { ProductTypeEnum } from "~/modules/accounts/domain/enums/productTypeEnum"
import { IUserModelDocument } from "./user-model-document.interface"

export const UserModel = model<IUserModelDocument>("Users", new Schema({
    _id: String,
    name: String,
    email: String,
    phone: String,
    password: String,
    deletedAt: Date,
    updatedAt: Date,
    createdAt: Date,
}))
