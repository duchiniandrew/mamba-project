import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/createCampaign.dto';
import { UpdateCampaignDto } from './dto/updateCampaign.dto';
import { BadRequestCommonError, RequestError } from '../types';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CampaignEntity } from './entity/campaign.entity';

@Controller('campaign')
@ApiTags('Campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) { }

  @Post()
  @ApiProperty({
    type: CreateCampaignDto,
    description: 'This is a required property',
  })
  @ApiOperation({ summary: 'Create a campaign' })
  @ApiResponse({
    status: 200,
    type: CampaignEntity,
    description: 'Return the campaign created.',
  })
  @ApiBadRequestResponse({
    status: 400,
    type: BadRequestCommonError,
    description: "Bad request body wasn't valid.",
    example: {
      statusCode: 400,
      message: ['name should not be empty', 'name must be a string'],
      error: 'Bad Request',
    },
  })
  create(@Body() createCampaignDto: CreateCampaignDto): Promise<CampaignEntity> {
    return this.campaignService.create(createCampaignDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all campaigns' })
  @ApiResponse({
    status: 200,
    type: CampaignEntity,
    description: 'Return all campaigns.',
    isArray: true,
  })
  @ApiResponse({ status: 200, description: 'List of all campaigns.' })
  findAll(): Promise<CampaignEntity[]> {
    return this.campaignService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Campaign ID',
    schema: { oneOf: [{ type: 'number' }, { type: 'integer' }] },
  })
  @ApiOperation({ summary: 'Get one campaign' })
  @ApiNotFoundResponse({
    status: 404,
    description: 'No campaigns found.',
    type: RequestError,
    example: {
      statusCode: 404,
      message: 'Campaign not found.',
      error: 'Not Found',
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Get a single a campaign.',
    type: CampaignEntity,
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CampaignEntity | RequestError> {
    const campaign = await this.campaignService.findOne(id);
    if (!campaign) return new RequestError('Campaign not found.', 404);
    return campaign;
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Campaign ID',
    schema: { oneOf: [{ type: 'number' }, { type: 'integer' }] },
  })
  @ApiOperation({ summary: 'Update a campaign' })
  @ApiResponse({
    status: 200,
    type: CampaignEntity,
    description: 'Return the updated campaign.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'No campaigns found.',
    type: RequestError,
    example: {
      statusCode: 404,
      message: 'Campaign not found.',
      error: 'Not Found',
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    type: BadRequestCommonError,
    description: "Bad request body wasn't valid.",
    example: {
      statusCode: 400,
      message: ['name must be a string'],
      error: 'Bad Request',
    },
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateCampaignDto: UpdateCampaignDto,
  ): Promise<CampaignEntity | RequestError> {
    return this.campaignService.update(id, UpdateCampaignDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Campaign ID',
    schema: { oneOf: [{ type: 'number' }, { type: 'integer' }] },
  })
  @ApiOperation({ summary: 'Delete a campaign' })
  @ApiResponse({
    status: 200,
    type: CampaignEntity,
    description: 'Return the deleted campaign.',
  })
  @ApiBadRequestResponse({
    status: 400,
    type: BadRequestCommonError,
    description: "Bad request body wasn't valid.",
    example: {
      statusCode: 400,
      message: ['name must be a string'],
      error: 'Bad Request',
    },
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'No campaigns found.',
    type: RequestError,
    example: {
      statusCode: 404,
      message: 'Campaign not found.',
      error: 'Not Found',
    },
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<CampaignEntity | RequestError> {
    const campaign = await this.campaignService.remove(id);
    if (!campaign) return new RequestError('Campaign not found.', 404);
    return campaign;
  }
}
