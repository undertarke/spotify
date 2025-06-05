import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PlayListService } from './play-list.service';
import {
  AddSongsToPlaylistDto,
  CreatePlayListDto,
} from './dto/create-play-list.dto';
import { UpdatePlayListDto } from './dto/update-play-list.dto';
import { ApiBody, ApiHeader, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CybersoftTokenGuard } from 'src/strategy/tokenCyberSoft.strategy';
import { ApiParam } from '@nestjs/swagger';

class TypeAddNewPlaylist {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  imagePath: string;
  @ApiProperty()
  playlistName: string;
  @ApiProperty()
  description: string;
}

class TypeAddSongToPlayList {
  @ApiProperty()
  playlistId: number;
  @ApiProperty()
  songId: number;
}

@ApiHeader({
  name: 'tokenCyberSoft',
  description: 'Nhập token cybersoft',
  required: true,
})
@UseGuards(CybersoftTokenGuard)
class TypeEditPlayList {
  @ApiProperty()
  playlistName: string;
  @ApiProperty()
  description: string;
}

@ApiTags('PLAYLIST')
@Controller('api')
export class PlayListController {
  constructor(private readonly playListService: PlayListService) { }

  //Add new playlist
  @ApiBody({
    type: TypeAddNewPlaylist,
  })
  @Post('/create-playlist')
  createPlaylist(@Body() createPlayListDto: CreatePlayListDto) {
    return this.playListService.createPlaylist(createPlayListDto);
  }

  // Get all playlist
  @Get('/get-all-playlist')
  findAll() {
    return this.playListService.findAll();
  }

  // Get all playlistSong
  @Get('/get-all-playlistSong')
  getAllPlaylistSong() {
    return this.playListService.getAllPlaylistSong();
  }

  // Get playlist of user
  @Get('/get-playlist-of-user')
  getPlaylistOfUser(@Query('id', ParseIntPipe) id: number) {
    return this.playListService.getPlaylistOfUser(id);
  }

  // Get song in playlist
  @Get('/get-song-in-playlist/:playlistId')
  getSongInPlaylist(@Query('playlistId', ParseIntPipe) id: number) {
    return this.playListService.getSongInPlaylist(id);
  }

  @Get('get-playlist-by-id/:playlistId')
  getPlaylistById(@Query('playlistId', ParseIntPipe) playlistId: number) {
    return this.playListService.getPlaylistById(playlistId)
  }

  // Add song to playlist
  @ApiBody({
    type: TypeAddSongToPlayList,
  })
  @Post('add-song-to-playlist')
  async addSongToPlaylist(@Body() addSongToPlaylist: AddSongsToPlaylistDto) {
    return this.playListService.addSongToPlaylist(addSongToPlaylist);
  }

  // Edit Playlist
  @ApiBody({
    type: TypeEditPlayList,
  })
  @Put('edit-playlist/:id')
  editPlaylist(
    @Param('id') id: string,
    @Body() UpdatePlayListDto: UpdatePlayListDto,
  ) {
    return this.playListService.editPlaylist(+id, UpdatePlayListDto);
  }

  // Delete Playlist
  @Delete('remove-playlist/:id')
  remove(@Param('id') id: string) {
    return this.playListService.remove(+id);
  }

  // Endpoint lấy chi tiết playlist
  @ApiParam({
    name: 'id',
    description: 'ID của playlist cần lấy thông tin chi tiết',
  })
  @Get('/get-playlist-detail/:id')
  async getPlaylistDetail(@Param('id', ParseIntPipe) id: number) {
    return this.playListService.getPlaylistDetail(id);
  }
}
