export enum RoomType {
    BEDROOM = 'bedroom',
    BATHROOM = 'bathroom',
    GARAGE = 'garage'
}

export interface IRoom {
    type: RoomType,
    count: number
}

export interface IGeoLocation {
    longitude: number,
    latitude: number
}

export enum ConditionType {
    PERFECT = 'perfect',
    GOOD = 'good',
    BAD = 'bad'
}

export interface IConstructionInfo {
    type: string,
    year: number,
    condition: ConditionType
}

export enum AmenityType {
    WIFI = "wifi",
    PARKING = "parking",
    POOL = "pool",
    GYM = "gym",
    AIR_CONDITIONING = "air_conditioning",
    HEATING = "heating",
    ELEVATOR = "elevator",
    WASHER = "washer",
    DRYER = "dryer",
    PET_FRIENDLY = "pet_friendly",
    WHEELCHAIR_ACCESSIBLE = "wheelchair_accessible",
    SECURITY = "security",
    FIREPLACE = "fireplace",
    BALCONY = "balcony",
    GARDEN = "garden",
    SAUNA = "sauna",
    CONCIERGE = "concierge",
    BARBECUE_AREA = "barbecue_area",
    STORAGE = "storage",
    SMART_HOME = "smart_home"
}

export interface IAddress {
    street: string,
    city: string,
    postalCode: string
}

export interface IProperty {
    geoLocation: IGeoLocation,
    address?: IAddress,
    rooms?: IRoom[],
    constructionInfo?: IConstructionInfo
    amenities?: AmenityType[]
}

export enum ListingType {
    SALE = 'sale',
    RENT = 'rent'
}

export interface IListing {
    propertyData: IProperty,
    type: ListingType,
    price: number
}