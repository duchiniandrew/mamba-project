import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/createCampaign.dto';
import { UpdateCampaignDto } from './dto/updateCampaign.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @ApiOperation({ summary: 'Create a campaign' })
  @ApiResponse({ status: 200, description: 'Return the campaign created.' })
  create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignService.create(createCampaignDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all campaigns' })
  @ApiResponse({ status: 200, description: 'List of all campaigns.' })
  findAll() {
    return this.campaignService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one campaign' })
  @ApiResponse({ status: 200, description: 'Get a single a campaign.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.campaignService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a campaign' })
  @ApiResponse({ status: 200, description: 'Update a single campaign.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() UpdateCampaignDto: UpdateCampaignDto) {
    return this.campaignService.update(id, UpdateCampaignDto);
  }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a campaign' })
    @ApiResponse({ status: 200, description: 'Delete a single campaign.' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.campaignService.remove(id);
    }
}
