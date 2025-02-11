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
  price?: number
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

export type TxListItemGroup = {
  [key: string]: TxListItem[]
}

export interface TxListItem {
  id: number
  txName: string
  txNote: string
  status: number // 1: 결제완료 2: 결제오류 3: 배송중 4: 배송완료 7: 거래취소
  createdAt: string
  products: CartItem[]
  shipment: Shipment
  payment: PayReceipt
}

export interface PayReceipt {
  id: number
  payMethod: string
  paymentKey: string
  orderId: string
  paidAmount: number
  balanceAmount?: number
  receiptUrl?: string
  paidAt: Date
  createdAt: Date
}

export interface Shipment {
  id: number
  courier: Courier
  address: string
  postalCode: string
  recipientName: string
  recipientPhone: string
  trackingNo: string
  status: number
  createdAt: Date
}

export interface Courier {
  id: number
  courierName: string
  apiUrl: string
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
