import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './project.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/v1/projects')
export class ProjectsController {
  constructor(private readonly projects: ProjectsService) {}

  // PUBLIC: published projects. ?landing=true => only ones marked "show on landing"; ?limit=6
  @Get()
  findPublic(@Query('landing') landing?: string, @Query('limit') limit?: string) {
    return this.projects.findPublic({
      landing: landing === 'true',
      limit: limit ? Math.max(1, parseInt(limit, 10) || 0) : undefined,
    });
  }

  // ADMIN: all projects including drafts (must stay above ':idOrSlug')
  @UseGuards(JwtAuthGuard)
  @Get('admin/all')
  findAllAdmin() {
    return this.projects.findAll();
  }

  // PUBLIC: single published project by slug or id
  @Get(':idOrSlug')
  findOne(@Param('idOrSlug') idOrSlug: string) {
    return this.projects.findOne(idOrSlug);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: Partial<Project>) {
    return this.projects.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<Project>) {
    return this.projects.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.projects.remove(id);
    return { success: true };
  }
}
