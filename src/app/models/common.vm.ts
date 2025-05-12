export interface IAmenities {
    name: string,
    icon: string
}

export interface IRentPost {
    id: string
    apartmentType: string
    name: string
    sharedProperty: boolean
    location: string
    squareFit: number
    rent: number
    apartmentFurnished: boolean
    amenities: string[]
    title: string
    description: string
    rentNegotiable: boolean
    priceMode: string
    stayType: string
    images: string[]
}

export interface IFavorites {
    id: number,
    userId: number,
    postId: number
}

export interface IComments {
    id: number
    commentId: string
    postId: number
    userId: number
    comment: string
    timestamp: string
}

export interface IUser {
    id?: number,
    name: string,
    email: string,
    password: string,
    role: string
}