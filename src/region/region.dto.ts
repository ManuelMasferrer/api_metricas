import {
    IsNotEmpty,
    IsString,
    IsUrl
} from 'class-validator';
export class RegionDto {
    readonly id: string;
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
}
