import { Controller, Param, Get } from '@nestjs/common';
import { AppService } from 'src/services/app.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { ApiNoyeau } from 'src/decorators/apiNoyeau.decorator';

@ApiSecurity('JWT')
@Controller('app')
@ApiTags('APP')
export class AppController {


    constructor(private appService: AppService) {

    }
    @Get()
    public getAll(@User() user, @ApiNoyeau() apiNoyeau): any {
        return this.appService.getAll(user, apiNoyeau)
    }

    @Get(':appCode')
    public getOne(@Param('appCode') appCode: string): any {
        return this.appService.initAppInfo(appCode)
    }

}
