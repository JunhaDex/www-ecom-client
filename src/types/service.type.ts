export interface LoginInput {
  userId: string
  password: string
}

export interface User {
  id: number
  userId: string
  branchName: string
  branchManager: string
  branchContact: string
  status: number
  updatedAt: Date
  userGroup?: UserGroup
}

export interface UserGroup {
  id: number
  groupName: string
  description: string
}

export interface Dashboard {
  count: number
  cost: number
  in_transit: number
}

export interface Product {
  id: number
  productName: string
  description: string
  imageUrls: string[]
  productPrice: number
}

export interface CartItem {
  id: number
  count: number
  product: Product
}

export interface Notice {
  id: number
  title: string
  content: string
  createdAt: Date | string
}

export interface CartInput {
  productId: number
  count: number
}

export interface CreateTxInput {
  products: {
    item: Product
    quantity: number
  }[]
  payment: {
    orderId: string
    paidAmount: number
    paidAt: Date
  }
  txName: string
  txNote: string
}

export interface ConfirmTxInput {
  orderId: string
  paymentKey: string
  amount: number
}

export interface UserAddress {
  orderId: string
  address: string
  postalCode: string
  recipientName: string
  recipientPhone: string
}
