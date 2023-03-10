import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Render,
} from '@nestjs/common';
import e from 'express';
import { DataSource, EntityNotFoundError } from 'typeorm';
import Alkalmazott from './alkalmazott.entity';
import { AppService } from './app.service';
import NewAlkalmazottDto from './newAlkalmazott.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Get('/alkalmazott/bersav')
  async searchBersav(@Query('min') min: number, @Query('max') max: number) {
    const alkalmazottRepo = this.dataSource.getRepository(Alkalmazott);
    return await alkalmazottRepo
      .createQueryBuilder()
      .where('haviBer BETWEEN :min AND :max', { min: min, max: max })
      //.where('haviBer > :min', { min: min })
      //.andWhere('haviBer < :max', { max: max })
      .getMany();
  }

  @Post('/alkalmazott')
  async newAlkalmazott(@Body() alkalmazott: NewAlkalmazottDto) {
    const alkalmazottRepo = this.dataSource.getRepository(Alkalmazott);
    if (!alkalmazott.kezdoDatum) {
      alkalmazott.kezdoDatum = (new Date()).toISOString();
    }
    if (!alkalmazott.beosztottak_szama) {
      alkalmazott.beosztottak_szama = 0;
    }
    let a = await alkalmazottRepo.save(alkalmazott);
    return a;
  }

  @Get('alkalmazott/search')
  async searchAlkalmazott(@Query('email') email: string) {
    const alkalmazottRepo = this.dataSource.getRepository(Alkalmazott);
    return await alkalmazottRepo
      .createQueryBuilder()
      .where('hivatalosEmail LIKE :email', { email: '%' + email + '%' })
      .addOrderBy('kezdoDatum', 'DESC')
      .getMany();
    //return await alkalmazottRepo.findOneByOrFail({ hivatalosEmail: email });
  }

  @Get('/alkalmazott/:id')
  async getAlkalmazott(@Param('id') id: number) {
    try {
      const alkalmazottRepo = this.dataSource.getRepository(Alkalmazott);
      return await alkalmazottRepo.findOneByOrFail({ id: id });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException('Az alkalmazott nem l??tezik');
      } else {
        throw e;
      }
    }
  }
}
