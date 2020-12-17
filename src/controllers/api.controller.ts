import { Controller, Get, Param } from '@nestjs/common';
import { ApiService } from 'src/services/api.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { ApiNoyeau } from 'src/decorators/apiNoyeau.decorator';

@ApiSecurity('JWT')
@Controller('api')
@ApiTags('API')
export class ApiController {

    constructor(private apiService: ApiService){
        
    }

    @Get()
    public getAll(@User() user,@ApiNoyeau() apiNoyeau): any {
        console.log('ping')
        return new Promise((resolve, reject)=>{
            this.apiService.getAll(user, apiNoyeau).then(
                res=>resolve(res),
                err=>reject(err)
            )
        })
    }

    @Get(':apiCode')
    public getOne(@Param('apiCode') apiCode:string, @ApiNoyeau() apiNoyeau): any {
        console.log('ping2')
        console.log(apiNoyeau)
        if(apiNoyeau){
            return this.apiService.initApiInfo(apiCode);
        }
        throw {err:"test erreur throw"}
        
    }


}
