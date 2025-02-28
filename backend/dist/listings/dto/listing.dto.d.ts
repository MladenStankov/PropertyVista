import { ConstructionType } from '../types/construction-type.dto';
import { ListingType } from '../types/listing-type.dto';
import { User } from 'src/users/entity/user.entity';
export declare class ListingDto {
    description?: string;
    constructionType?: ConstructionType;
    constructionYear?: number;
    price: number;
    livingSurface?: number;
    type: ListingType;
    user?: User;
}
