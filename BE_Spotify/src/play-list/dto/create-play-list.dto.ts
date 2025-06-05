import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreatePlayListDto {
  @IsNumber()
  userId: number;
  @IsString()
  imagePath: string;
  @IsString()
  playlistName: string;
  @IsString()
  description: string;
}

export class AddSongsToPlaylistDto {
  @IsNotEmpty()
  @IsInt()
  playlistId: number;

  @IsNotEmpty()
  @IsInt()
  songId: number;
}
